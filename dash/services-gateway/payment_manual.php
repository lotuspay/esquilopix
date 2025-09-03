<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

session_start();
include_once('../services/database.php');
include_once('../services/funcao.php');
include_once('../services/crud.php');

// Buscar token Lotuspay do banco
$sql_token = "SELECT token_secreto FROM Lotuspay WHERE id = 1 LIMIT 1";
$Lotuspay_TOKEN = "";
$CALLBACK_URL  = "https://esquilo.com/callback";

if ($result_token = $mysqli->query($sql_token)) {
    if ($row = $result_token->fetch_assoc()) {
        $Lotuspay_TOKEN = $row['token_secreto'];
    } else {
        echo json_encode(["success" => false, "message" => "Token Lotuspay não encontrado."]);
        exit;
    }
} else {
    echo json_encode(["success" => false, "message" => "Erro ao buscar token Lotuspay."]);
    exit;
}

// Verificar se ID foi informado
if (!isset($_GET['id'])) {
    echo json_encode(["success" => false, "message" => "ID de transação não informado."]);
    exit;
}

$id = PHP_SEGURO($_GET['id']);

// Buscar dados do saque e ID do usuário
$sql = "SELECT valor, pix, tipo, id_user FROM solicitacao_saques WHERE transacao_id = ?";
if ($stmt = $mysqli->prepare($sql)) {
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $stmt->bind_result($valor, $chavepix1, $tipoChavePix, $id_user);
    $stmt->fetch();
    $stmt->close();

    if (!$valor || !$chavepix1 || !$id_user) {
        echo json_encode(["success" => false, "message" => "Dados do saque não encontrados."]);
        exit;
    }

    $valor = number_format($valor, 2, '.', '');

    // Buscar dados reais do usuário
    $sql_user = "SELECT full_name, cpf FROM usuarios WHERE id = ? LIMIT 1";
    if ($stmt_user = $mysqli->prepare($sql_user)) {
        $stmt_user->bind_param("i", $id_user);
        $stmt_user->execute();
        $stmt_user->bind_result($nome_real, $cpf_real);
        $stmt_user->fetch();
        $stmt_user->close();
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao buscar dados do usuário."]);
        exit;
    }

    // Monta payload Lotuspay
    $payload = [
        "valor" => $valor,
        "nome"  => $nome_real,
        "doc_tipo" => "cpf",
        "doc_numero" => $cpf_real,
        "callback_url" => $CALLBACK_URL,
        "external_reference" => "saque_" . $id
    ];

    // Envia requisição
    $ch = curl_init("https://api.Lotuspay.digital/v1/pix/payments/");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer {$Lotuspay_TOKEN}",
        "Content-Type: application/json"
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error    = curl_error($ch);
    curl_close($ch);

    if ($error) {
        echo json_encode(["success" => false, "message" => "Erro cURL: " . $error]);
        exit;
    }

    $data = json_decode($response, true);

    if ($httpCode === 201 && isset($data['id_transacao'])) {
        // Atualiza status do saque
        $sql_update = "UPDATE solicitacao_saques SET status = 1 WHERE transacao_id = ?";
        if ($stmt_update = $mysqli->prepare($sql_update)) {
            $stmt_update->bind_param("s", $id);
            $stmt_update->execute();
            $stmt_update->close();
        }

        echo json_encode([
            "success" => true,
            "message" => "Saque enviado via Lotuspay.",
            "transaction_id_gateway" => $data['id_transacao'],
            "status" => $data['status']
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => $data['message'] ?? "Erro ao processar pagamento",
            "data"    => $data
        ]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Erro ao preparar query do saque."]);
    exit;
}
?>