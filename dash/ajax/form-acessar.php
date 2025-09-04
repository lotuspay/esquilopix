<?php
// Detecta HTTPS atrás de proxy e padroniza cookie de sessão
$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https')
    || (($_SERVER['HTTP_X_FORWARDED_SSL'] ?? '') === 'on');

// Evitar cache em requisições de login
if (!headers_sent()) {
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');
    header('Expires: 0');
}

// Garanta que o cookie de sessão seja válido em todo o domínio (não apenas em /dash/ajax)
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_set_cookie_params([
        'lifetime' => 60 * 60 * 24 * 5, // 5 dias
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => $isHttps,
    ]);
    session_start();
}

// Verificar se é uma requisição POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo 'Método não permitido';
    exit;
}

// Verificar se todos os campos necessários foram enviados
if (!isset($_POST['email'], $_POST['senha'], $_POST['_csrf'])) {
    echo 'Dados incompletos no formulário.';
    exit;
}

include_once('../logs/registrar_logs.php');
include_once('../services/database.php');
include_once('../services/funcao.php');

// Sanitizar e validar dados
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$senha = trim($_POST['senha']);
$csrf = trim($_POST['_csrf']);

// Validações
if (empty($csrf)) {
    echo 'Token de segurança inválido. Atualize a página.';
    exit;
}

if (empty($email)) {
    echo 'Por favor, insira um e-mail.';
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo 'Por favor, insira um e-mail válido.';
    exit;
}

if (empty($senha)) {
    echo 'Por favor, insira sua senha.';
    exit;
}

if (strlen($senha) < 6) {
    echo 'A senha deve ter pelo menos 6 caracteres.';
    exit;
}

// Buscar usuário no banco de dados
try {
    $stmt = $mysqli->prepare("SELECT id, email, senha FROM admin_users WHERE email = ? AND status = 1 LIMIT 1");
    if (!$stmt) {
        echo 'Erro interno do servidor.';
        exit;
    }

    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo 'E-mail ou senha incorretos.';
        exit;
    }

    $user = $result->fetch_assoc();

    // Verificar senha
    if (!password_verify($senha, $user['senha'])) {
        echo 'E-mail ou senha incorretos.';
        exit;
    }

    // Login bem-sucedido - criar sessão (seguindo lógica original)
    $id = preg_replace("/[^0-9]/", "", $user['id']);
    $data_atual = date('Y-m-d H:i:s');
    $token_base = md5($data_atual . md5($email) . sha1($id));
    $token_encrypted = CRIPT_AES('encrypt', $token_base);

    // Definir variáveis de sessão seguindo o padrão original
    $_SESSION['anti_crsf_token_adm'] = $csrf;
    $_SESSION['crsf_token_adm'] = $token_encrypted;
    $_SESSION['token_adm_encrypted'] = CRIPT_AES('encrypt', $id);
    $_SESSION['2fa_verified'] = true;

    // Carregar ID do admin na sessão
    $_SESSION['admin_id'] = $user['id'];

    // Carregar permissões do admin na sessão
    $perms = [];
    $stmt_perm = $mysqli->prepare('SELECT permission FROM admin_permissions WHERE admin_id = ?');
    $stmt_perm->bind_param('i', $user['id']);
    $stmt_perm->execute();
    $res_perm = $stmt_perm->get_result();
    while ($row = $res_perm->fetch_assoc())
        $perms[] = $row['permission'];
    $stmt_perm->close();
    $_SESSION['admin_perms'] = $perms;

    // Registrar log
    if (function_exists('registrarLog')) {
        registrarLog($mysqli, $email, "Login realizado no painel administrativo");
    }

    // Notificação no Telegram se a função existir
    if (function_exists('TelegramAdminNotify')) {
        TelegramAdminNotify('🔐 ' . $email . ' fez login no sistema em ' . $data_atual);
    }

    echo 'Login realizado com sucesso! Redirecionando...';
    echo "<script>setTimeout(() => window.location.href = '{$painel_adm}', 2000);</script>";

} catch (Exception $e) {
    error_log("Erro no login: " . $e->getMessage());
    echo 'Erro interno do servidor. Tente novamente.';
}

function enviarNotificacaoTelegram($email)
{
    $tokenBot = ''; // Adicione seu token do bot aqui
    $chatId = '';   // Adicione seu chat ID aqui

    // Só enviar se estiver configurado
    if (empty($tokenBot) || empty($chatId)) {
        return;
    }

    $urlSite = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'];
    $dataHora = date('d/m/Y H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'Desconhecido';

    $mensagem = "🔐 <b>Novo login no painel administrativo</b>\n\n";
    $mensagem .= "📧 <b>E-mail:</b> {$email}\n";
    $mensagem .= "🌐 <b>Site:</b> {$urlSite}\n";
    $mensagem .= "📅 <b>Data/Hora:</b> {$dataHora}\n";
    $mensagem .= "🌍 <b>IP:</b> {$ip}";

    $url = "https://api.telegram.org/bot{$tokenBot}/sendMessage";

    $dados = [
        'chat_id' => $chatId,
        'text' => $mensagem,
        'parse_mode' => 'HTML'
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($dados));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $resposta = curl_exec($ch);
    curl_close($ch);
}
?>