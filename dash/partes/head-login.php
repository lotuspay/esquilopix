<?php
#======================================#
ini_set('display_errors', 1);
error_reporting(E_ALL);
#======================================#
// Detecta HTTPS atrás de proxy e padroniza sessão/cookies
$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https')
    || (($_SERVER['HTTP_X_FORWARDED_SSL'] ?? '') === 'on');

// Evitar cache
if (!headers_sent()) {
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');
    header('Expires: 0');
}

// Configurar cookie de sessão para todo o domínio
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => $isHttps,
    ]);
    session_start();
}
include_once "services/database.php";
include_once 'logs/registrar_logs.php';
include_once "services/funcao.php";
include_once "services/crud.php";
include_once "services/crud-adm.php";
include_once "services/CSRF_Protect.php";
$csrf = new CSRF_Protect();
#======================================#

// Verificar se já está logado e redirecionar para o painel
if(isset($_SESSION['token_adm_encrypted']) && isset($_SESSION["crsf_token_adm"]) && isset($_SESSION["anti_crsf_token_adm"])){
    header('Location: ' . $painel_adm);
    exit();
}
?>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="<?php echo $csrf->getToken(); ?>">
    <title>Login - Painel Administrativo</title>
    <link rel="shortcut icon" href="./assets/images/logo/favicon.ico">
    <link rel="stylesheet" href="./assets/css/tailwind.css" />
    <link rel="stylesheet" href="./assets/css/nice-select2.css" />
    <link rel="stylesheet" href="./assets/css/fontawesome.css" />
    <link rel="stylesheet" href="./assets/css/style.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
