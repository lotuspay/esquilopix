<?php
session_start();
include_once "../config.php";
include_once('../'.DASH.'/services/database.php');
include_once('../'.DASH.'/services/funcao.php');
global $mysqli;

/**
 * Webhook Lotuspay
 */
function webhook() {
    global $mysqli;

    // Apenas POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Método não permitido']);
        exit;
    }

    // Validação do token secreto
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Token ausente']);
        exit;
    }

    $authHeader = $headers['Authorization'];
    $token = str_replace('Bearer ', '', $authHeader);

    // Buscar token secreto da tabela Lotuspay
    $stmt = $mysqli->prepare("SELECT token_secreto FROM Lotuspay LIMIT 1");
    $stmt->execute();
    $stmt->bind_result($tokenSecretoBanco);
    $stmt->fetch();
    $stmt->close();

    if ($token !== $tokenSecretoBanco) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Token inválido']);
        exit;
    }

    // Receber JSON
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    if (!isset($data['id_transacao']) || !isset($data['status'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Dados incompletos']);
        exit;
    }

    $idTransaction = PHP_SEGURO($data['id_transacao']);
    $statusTransaction = PHP_SEGURO($data['status']);
    $externalReference = isset($data['external_reference']) ? PHP_SEGURO($data['external_reference']) : null;

    // Processar apenas se status for "Aprovado"
   if (strtolower($statusTransaction) === 'aprovado') {

    // Atualizar transação no sistema
    $stmt = $mysqli->prepare("UPDATE transacoes SET status = 'pago' WHERE transacao_id = ?");
    $stmt->bind_param("s", $idTransaction);
    $stmt->execute();
    $stmt->close();

    // Buscar usuário e valor da transação
    $stmt = $mysqli->prepare("SELECT usuario, valor FROM transacoes WHERE transacao_id = ?");
    $stmt->bind_param("s", $idTransaction);
    $stmt->execute();
    $result = $stmt->get_result();
    $transacao = $result->fetch_assoc();
    $stmt->close();

    if ($transacao) {
        $userId = $transacao['usuario'];
        $valor = (float)$transacao['valor'];

        // **ADICIONAR SALDO NA CONTA DO USUÁRIO COMUM**
        $stmt = $mysqli->prepare("UPDATE usuarios SET saldo = saldo + ? WHERE id = ?");
        $stmt->bind_param("di", $valor, $userId);
        $stmt->execute();
        $stmt->close();

        // Resetar lucro limite se depósito acima do mínimo
        $stmt = $mysqli->prepare("SELECT deposito_minimo_reset_lucro FROM valores_config WHERE id = 1");
        $stmt->execute();
        $stmt->bind_result($depositoMinimoReset);
        $stmt->fetch();
        $stmt->close();
        $depositoMinimoReset = $depositoMinimoReset ?? 10.00;

        if ($valor >= $depositoMinimoReset) {
            $stmt = $mysqli->prepare("UPDATE usuarios SET lucro_limite_atingido = 0 WHERE id = ?");
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $stmt->close();
        }

        // Processar CPA/RevShare
        processarAfiliados($idTransaction);
    }
}

    // Retornar 200 OK
    http_response_code(200);
    echo json_encode(['status' => 'success']);
}


function processarAfiliados($transacao_id)
{
    global $mysqli;

    try {
        // Buscar dados da transação
        $stmt = $mysqli->prepare("SELECT usuario, valor FROM transacoes WHERE transacao_id = ?");
        $stmt->bind_param("s", $transacao_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $transacao = $result->fetch_assoc();
        $stmt->close();

        if (!$transacao) {
            error_log("Transação não encontrada: " . $transacao_id);
            return;
        }

        $userId = $transacao['usuario'];
        $valor = (float) $transacao['valor'];

        // Verificar se depósito em dobro está ativado
        $valor_para_comissao = $valor;
        $config_deposito = $mysqli->query("SELECT deposito_dobro FROM valores_config WHERE id=1");
        if ($config_deposito && mysqli_num_rows($config_deposito) > 0) {
            $config_dobro = mysqli_fetch_assoc($config_deposito);
            if ($config_dobro['deposito_dobro'] == 1) {
                $valor_para_comissao = $valor * 2; // Usa valor duplicado para comissões
            }
        }

        // Buscar configurações de afiliados
        $config = getAfiliadosConfig($userId);

        // Processar CPA com valor ajustado
        $resultadoCPA = processarCPA($userId, $valor_para_comissao);
        if ($resultadoCPA['success']) {
            error_log("CPA processado com sucesso: " . json_encode($resultadoCPA));
        } else {
            error_log("Erro ao processar CPA: " . $resultadoCPA['message']);
        }

    } catch (Exception $e) {
        error_log("Erro ao processar afiliados: " . $e->getMessage());
    }
}

/**
 * Função para processar CPA (Cost Per Acquisition)
 * @param int $userId ID do usuário que fez o depósito
 * @param float $valor Valor do depósito
 * @return array Resultado do processamento
 */
function processarCPA($userId, $valor)
{
    global $mysqli;

    try {
        // Verificar se o usuário tem um afiliado (código de convite)
        $stmt = $mysqli->prepare("SELECT invitation_code FROM usuarios WHERE id = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $stmt->close();

        if (!$user || !$user['invitation_code']) {
            return ['success' => false, 'message' => 'Usuário não tem afiliado'];
        }

        // Buscar o afiliado pelo código de convite
        $stmt = $mysqli->prepare("SELECT id FROM usuarios WHERE codigo_convite = ?");
        $stmt->bind_param("s", $user['invitation_code']);
        $stmt->execute();
        $result = $stmt->get_result();
        $afiliado = $result->fetch_assoc();
        $stmt->close();

        if (!$afiliado || !isset($afiliado['id'])) {
            return ['success' => false, 'message' => 'Afiliado não encontrado'];
        }

        $afiliadoId = $afiliado['id'];

        // Buscar configurações do AFILIADO (não do usuário que fez o depósito)
        $config = getAfiliadosConfig($afiliadoId);

        // Log para debug
        error_log("Configurações do afiliado ID $afiliadoId: " . json_encode($config));

        // Verificar se o depósito atende ao valor mínimo
        if ($valor < $config['minDepForCpa']) {
            return ['success' => false, 'message' => 'Depósito abaixo do valor mínimo para CPA'];
        }

        // Verificar chance de CPA
        $chance = mt_rand(1, 100);
        if ($chance > $config['chanceCpa']) {
            return ['success' => false, 'message' => 'CPA não aplicado (chance)'];
        }

        // Calcular valor do CPA (nível 1)
        $valorCPA = ($valor * $config['cpaLvl1']) / 100;

        // Log para debug
        error_log("Valor do depósito: $valor, CPA Nível 1: {$config['cpaLvl1']}%, Valor CPA calculado: $valorCPA");

        // Verificar se o afiliado já existe na tabela afiliados
        $stmt = $mysqli->prepare("SELECT id FROM afiliados WHERE user_id = ?");
        $stmt->bind_param("i", $afiliadoId);
        $stmt->execute();
        $result = $stmt->get_result();
        $afiliadoExiste = $result->fetch_assoc();
        $stmt->close();

                        if ($afiliadoExiste) {
            // Atualizar saldo principal do usuário
            $stmt = $mysqli->prepare("UPDATE usuarios SET saldo = saldo + ? WHERE id = ?");
            $stmt->bind_param("di", $valorCPA, $afiliadoId);
            $stmt->execute();
            $stmt->close();
            
            // Atualizar estatísticas do afiliado - verificar se as colunas existem
            try {
                $stmt = $mysqli->prepare("UPDATE afiliados SET available = available + ?, earned = earned + ?, depositors = depositors + 1, deposited = deposited + ? WHERE user_id = ?");
                $stmt->bind_param("dddi", $valorCPA, $valorCPA, $valor, $afiliadoId);
                $success = $stmt->execute();
                $stmt->close();
            } catch (Exception $e) {
                // Se der erro, tentar sem as colunas depositors e deposited
                $stmt = $mysqli->prepare("UPDATE afiliados SET available = available + ?, earned = earned + ? WHERE user_id = ?");
                $stmt->bind_param("ddi", $valorCPA, $valorCPA, $afiliadoId);
                $success = $stmt->execute();
                $stmt->close();
            }
        } else {
            // Atualizar saldo principal do usuário
            $stmt = $mysqli->prepare("UPDATE usuarios SET saldo = saldo + ? WHERE id = ?");
            $stmt->bind_param("di", $valorCPA, $afiliadoId);
            $stmt->execute();
            $stmt->close();
            
            // Criar novo registro na tabela afiliados
            try {
                $stmt = $mysqli->prepare("INSERT INTO afiliados (user_id, code, available, earned, depositors, deposited) VALUES (?, ?, ?, ?, 1, ?)");
                $codigoAfiliado = $user['invitation_code']; // Usar o código de convite do afiliado
                $stmt->bind_param("isddd", $afiliadoId, $codigoAfiliado, $valorCPA, $valorCPA, $valor);
                $success = $stmt->execute();
                $stmt->close();
            } catch (Exception $e) {
                // Se der erro, tentar sem as colunas depositors e deposited
                $stmt = $mysqli->prepare("INSERT INTO afiliados (user_id, code, available, earned) VALUES (?, ?, ?, ?)");
                $codigoAfiliado = $user['invitation_code'];
                $stmt->bind_param("isdd", $afiliadoId, $codigoAfiliado, $valorCPA, $valorCPA);
                $success = $stmt->execute();
                $stmt->close();
            }
        }

        if (!$success) {
            return ['success' => false, 'message' => 'Erro ao atualizar dados do afiliado'];
        }

        // Registrar a transação de CPA
        $stmt = $mysqli->prepare("INSERT INTO transacoes_afiliados (afiliado_id, user_id, tipo, valor, descricao, status) VALUES (?, ?, 'cpa', ?, ?, 'aprovado')");
        $descricao = "CPA Nível 1 - Depósito de R$ " . number_format($valor, 2, ',', '.');
        $stmt->bind_param("iids", $afiliadoId, $userId, $valorCPA, $descricao);
        $stmt->execute();
        $stmt->close();

        // Buscar afiliados de níveis superiores (nível 2 e 3)
        processarCPANiveis($afiliadoId, $userId, $valor, $config);

        return [
            'success' => true,
            'message' => 'CPA processado com sucesso',
            'valor' => $valorCPA,
            'afiliado_id' => $afiliadoId
        ];

    } catch (Exception $e) {
        error_log("Erro ao processar CPA: " . $e->getMessage());
        return ['success' => false, 'message' => 'Erro interno ao processar CPA'];
    }
}

/**
 * Função para processar CPA de níveis superiores (nível 2 e 3)
 * @param int $afiliadoId ID do afiliado atual
 * @param int $userId ID do usuário que fez o depósito
 * @param float $valor Valor do depósito
 * @param array $config Configurações de afiliados
 */
function processarCPANiveis($afiliadoId, $userId, $valor, $config)
{
    global $mysqli;

    // Nível 2
    if ($config['cpaLvl2'] > 0) {
        $stmt = $mysqli->prepare("SELECT invitation_code FROM usuarios WHERE id = ?");
        $stmt->bind_param("i", $afiliadoId);
        $stmt->execute();
        $result = $stmt->get_result();
        $afiliadoNivel2 = $result->fetch_assoc();
        $stmt->close();

        if ($afiliadoNivel2 && $afiliadoNivel2['invitation_code']) {
            $stmt = $mysqli->prepare("SELECT id FROM usuarios WHERE codigo_convite = ?");
            $stmt->bind_param("s", $afiliadoNivel2['invitation_code']);
            $stmt->execute();
            $result = $stmt->get_result();
            $afiliado2 = $result->fetch_assoc();
            $stmt->close();

            if ($afiliado2 && isset($afiliado2['id']) && !empty($afiliado2['id'])) {
                $afiliado2Id = $afiliado2['id'];
                $valorCPA2 = ($valor * $config['cpaLvl2']) / 100;

                // Verificar se o afiliado nível 2 já existe na tabela afiliados
                $stmt = $mysqli->prepare("SELECT id FROM afiliados WHERE user_id = ?");
                $stmt->bind_param("i", $afiliado2Id);
                $stmt->execute();
                $result = $stmt->get_result();
                $afiliado2Existe = $result->fetch_assoc();
                $stmt->close();

                // Atualizar saldo principal do usuário nível 2
                $stmt = $mysqli->prepare("UPDATE usuarios SET saldo = saldo + ? WHERE id = ?");
                $stmt->bind_param("di", $valorCPA2, $afiliado2Id);
                $stmt->execute();
                $stmt->close();
                
                if ($afiliado2Existe) {
                    // Atualizar estatísticas do afiliado
                    $stmt = $mysqli->prepare("UPDATE afiliados SET available = available + ?, earned = earned + ? WHERE user_id = ?");
                    $stmt->bind_param("ddi", $valorCPA2, $valorCPA2, $afiliado2Id);
                    $stmt->execute();
                    $stmt->close();
                } else {
                    // Criar novo registro na tabela afiliados
                    $stmt = $mysqli->prepare("INSERT INTO afiliados (user_id, code, available, earned) VALUES (?, ?, ?, ?)");
                    $codigoAfiliado2 = $afiliadoNivel2['invitation_code'];
                    $stmt->bind_param("isdd", $afiliado2Id, $codigoAfiliado2, $valorCPA2, $valorCPA2);
                    $stmt->execute();
                    $stmt->close();
                }

                $stmt = $mysqli->prepare("INSERT INTO transacoes_afiliados (afiliado_id, user_id, tipo, valor, descricao, status) VALUES (?, ?, 'cpa', ?, ?, 'aprovado')");
                $descricao = "CPA Nível 2 - Depósito de R$ " . number_format($valor, 2, ',', '.');
                $stmt->bind_param("iids", $afiliado2Id, $userId, $valorCPA2, $descricao);
                $stmt->execute();
                $stmt->close();

                // Nível 3
                if ($config['cpaLvl3'] > 0) {
                    $stmt = $mysqli->prepare("SELECT invitation_code FROM usuarios WHERE id = ?");
                    $stmt->bind_param("i", $afiliado2Id);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    $afiliadoNivel3 = $result->fetch_assoc();
                    $stmt->close();

                    if ($afiliadoNivel3 && $afiliadoNivel3['invitation_code']) {
                        $stmt = $mysqli->prepare("SELECT id FROM usuarios WHERE codigo_convite = ?");
                        $stmt->bind_param("s", $afiliadoNivel3['invitation_code']);
                        $stmt->execute();
                        $result = $stmt->get_result();
                        $afiliado3 = $result->fetch_assoc();
                        $stmt->close();

                        if ($afiliado3 && isset($afiliado3['id']) && !empty($afiliado3['id'])) {
                            $afiliado3Id = $afiliado3['id'];
                            $valorCPA3 = ($valor * $config['cpaLvl3']) / 100;

                            // Verificar se o afiliado nível 3 já existe na tabela afiliados
                            $stmt = $mysqli->prepare("SELECT id FROM afiliados WHERE user_id = ?");
                            $stmt->bind_param("i", $afiliado3Id);
                            $stmt->execute();
                            $result = $stmt->get_result();
                            $afiliado3Existe = $result->fetch_assoc();
                            $stmt->close();

                            // Atualizar saldo principal do usuário nível 3
                            $stmt = $mysqli->prepare("UPDATE usuarios SET saldo = saldo + ? WHERE id = ?");
                            $stmt->bind_param("di", $valorCPA3, $afiliado3Id);
                            $stmt->execute();
                            $stmt->close();
                            
                            if ($afiliado3Existe) {
                                // Atualizar estatísticas do afiliado
                                $stmt = $mysqli->prepare("UPDATE afiliados SET available = available + ?, earned = earned + ? WHERE user_id = ?");
                                $stmt->bind_param("ddi", $valorCPA3, $valorCPA3, $afiliado3Id);
                                $stmt->execute();
                                $stmt->close();
                            } else {
                                // Criar novo registro na tabela afiliados
                                $stmt = $mysqli->prepare("INSERT INTO afiliados (user_id, code, available, earned) VALUES (?, ?, ?, ?)");
                                $codigoAfiliado3 = $afiliadoNivel3['invitation_code'];
                                $stmt->bind_param("isdd", $afiliado3Id, $codigoAfiliado3, $valorCPA3, $valorCPA3);
                                $stmt->execute();
                                $stmt->close();
                            }

                            $stmt = $mysqli->prepare("INSERT INTO transacoes_afiliados (afiliado_id, user_id, tipo, valor, descricao, status) VALUES (?, ?, 'cpa', ?, ?, 'aprovado')");
                            $descricao = "CPA Nível 3 - Depósito de R$ " . number_format($valor, 2, ',', '.');
                            $stmt->bind_param("iids", $afiliado3Id, $userId, $valorCPA3, $descricao);
                            $stmt->execute();
                            $stmt->close();
                        }
                    }
                }
            }
        }
    }
}

/**
 * Função para buscar configurações de afiliados
 * @param int|null $userId ID do usuário (opcional)
 * @return array Configurações
 */
function getAfiliadosConfig($userId = null)
{
    global $mysqli;

    // Configurações padrão
    $defaultConfig = [
        'cpaLvl1' => 10.00,
        'cpaLvl2' => 0.00,
        'cpaLvl3' => 0.00,
        'chanceCpa' => 100.00,
        'revShareFalso' => 0.00,
        'revShareLvl1' => 15.00,
        'revShareLvl2' => 0.00,
        'revShareLvl3' => 0.00,
        'minDepForCpa' => 10.00,
        'minResgate' => 500.00
    ];

    // Buscar configurações globais primeiro
    $stmt = $mysqli->prepare("SELECT * FROM afiliados_config WHERE id = 1");
    $stmt->execute();
    $result = $stmt->get_result();
    $globalConfig = $result->fetch_assoc();
    $stmt->close();

    // Se não existir configuração global, usar padrão
    if (!$globalConfig) {
        $globalConfig = $defaultConfig;
    } else {
        // Garantir que todas as chaves existam
        foreach ($defaultConfig as $key => $defaultValue) {
            if (!isset($globalConfig[$key]) || $globalConfig[$key] === null) {
                $globalConfig[$key] = $defaultValue;
            }
        }
    }

    // Se um userId foi fornecido, verificar se tem configurações personalizadas
    if ($userId) {
        $stmt = $mysqli->prepare("SELECT cpaLvl1, cpaLvl2, cpaLvl3, chanceCpa, revShareFalso, revShareLvl1, revShareLvl2, revShareLvl3, minDepForCpa, minResgate FROM usuarios WHERE id = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $userConfig = $result->fetch_assoc();
        $stmt->close();

        if ($userConfig) {
            // Mesclar configurações: valores personalizados do usuário têm prioridade sobre os globais
            $config = [];
            foreach ($globalConfig as $key => $globalValue) {
                // Se o usuário tem valor personalizado (não null), usar ele, senão usar o global
                $config[$key] = (isset($userConfig[$key]) && $userConfig[$key] !== null) ? $userConfig[$key] : $globalValue;
            }
            return $config;
        }
    }

    // Retornar configurações globais se não houver userId ou configurações personalizadas
    return $globalConfig;
}


// Executar webhook
webhook();