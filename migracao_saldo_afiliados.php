<?php
/**
 * Script de migração para transferir saldos existentes de afiliados para a carteira principal
 * Este script deve ser executado uma única vez após a atualização do sistema
 */

// Configurações de conexão com o banco de dados
require_once 'config.php'; // Ajuste o caminho conforme necessário

// Iniciar conexão
$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Verificar conexão
if ($mysqli->connect_error) {
    die("Erro de conexão: " . $mysqli->connect_error);
}

echo "Iniciando migração de saldos de afiliados...\n";

// Buscar afiliados com saldo disponível
$stmt = $mysqli->prepare("SELECT user_id, available FROM afiliados WHERE available > 0");
$stmt->execute();
$result = $stmt->get_result();

$total_migrado = 0;
$usuarios_afetados = 0;

while ($row = $result->fetch_assoc()) {
    $userId = $row['user_id'];
    $available = $row['available'];
    
    // Iniciar transação
    $mysqli->begin_transaction();
    
    try {
        // Adicionar saldo à carteira principal
        $stmt2 = $mysqli->prepare("UPDATE usuarios SET saldo = saldo + ? WHERE id = ?");
        $stmt2->bind_param("di", $available, $userId);
        $stmt2->execute();
        
        if ($stmt2->affected_rows > 0) {
            // Registrar na tabela de transações
            $descricao = "Migração de saldo de afiliado para carteira principal";
            $stmt3 = $mysqli->prepare("INSERT INTO transacoes (usuario, valor, tipo, data_registro, status, descricao) VALUES (?, ?, 'migracao_afiliado', NOW(), 'aprovado', ?)");
            $stmt3->bind_param("ids", $userId, $available, $descricao);
            $stmt3->execute();
            
            // Zerar saldo de afiliado
            $stmt4 = $mysqli->prepare("UPDATE afiliados SET available = 0 WHERE user_id = ?");
            $stmt4->bind_param("i", $userId);
            $stmt4->execute();
            
            // Confirmar transação
            $mysqli->commit();
            
            echo "Migrado R$ " . number_format($available, 2, ',', '.') . " para o usuário ID $userId\n";
            $total_migrado += $available;
            $usuarios_afetados++;
        } else {
            // Usuário não encontrado, reverter
            $mysqli->rollback();
            echo "ERRO: Usuário ID $userId não encontrado\n";
        }
    } catch (Exception $e) {
        // Reverter em caso de erro
        $mysqli->rollback();
        echo "ERRO ao migrar saldo do afiliado $userId: " . $e->getMessage() . "\n";
    }
}

echo "\n=== RESUMO DA MIGRAÇÃO ===\n";
echo "Usuários afetados: $usuarios_afetados\n";
echo "Total migrado: R$ " . number_format($total_migrado, 2, ',', '.') . "\n";
echo "Migração concluída!\n";

// Fechar conexão
$mysqli->close();
