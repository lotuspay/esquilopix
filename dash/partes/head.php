<?php
#======================================#
ini_set('display_errors', 0);
error_reporting(E_ALL);
#======================================#
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Evitar cache do navegador para páginas protegidas
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

include_once "services/database.php";
include_once 'logs/registrar_logs.php';
include_once "services/funcao.php";
include_once "services/crud.php";
include_once "services/crud-adm.php";
include_once 'services/checa_login_adm.php';
include_once "services/CSRF_Protect.php";
$csrf = new CSRF_Protect();
#======================================#
#expulsa user
checa_login_adm();
#======================================#
// Verificação de usuário bloqueado (somente se dados do admin estiverem carregados)
if (isset($_SESSION['data_adm']) && isset($_SESSION['data_adm']['status']) && $_SESSION['data_adm']['status'] != '1') {
    echo "<script>setTimeout(function() { window.location.href = 'bloqueado.php'; }, 0);</script>";
    exit();
}
/// final do script --#
?>

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Premium Tailwind CSS Admin & Dashboard Template" />
    <meta name="author" content="Webonzer" />

    <!-- Site Tiltle -->
    <title>PH</title>

    <!-- Site favicon -->
    <link rel="shortcut icon" href="assets/images/favicon.ico" />

    <!-- Custom Style -->
    <link rel="stylesheet" type="text/css" href="assets/css/style.css" />

    <!-- Alpine.js -->
    <script src="assets/js/alpine.min.js" defer></script>
</head>