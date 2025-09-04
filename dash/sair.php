<?php
// Garantir que nenhum output quebre os headers e evitar cache
ob_start();
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

// Detecta HTTPS atrás de proxy/balanceador
$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https')
    || (($_SERVER['HTTP_X_FORWARDED_SSL'] ?? '') === 'on');

session_start();
	include_once("logs/registrar_logs.php");
	include_once("services/database.php");
	include_once("services/funcao.php");
	global $mysqli;
	// Opcional: registrar log de saída
	// if (isset($_SESSION['data_adm']['email'])) {
	//     registrarLog($mysqli, $_SESSION['data_adm']['email'], 'Deslogou do painel admin');
	// }

	// Limpar todas as variáveis de sessão conhecidas
	unset($_SESSION['token_adm_encrypted']);
	unset($_SESSION['crsf_token_adm']);
	unset($_SESSION['anti_crsf_token_adm']);
	unset($_SESSION['data_adm']);
	unset($_SESSION['admin_id']);
	unset($_SESSION['admin_perms']);
	unset($_SESSION['2fa_verified']);

	// Limpar o array inteiro de sessão
	$_SESSION = [];

    // Apagar o cookie de sessão no navegador em múltiplos paths/domínios
    if (ini_get('session.use_cookies')) {
        $cookieName = session_name();
        $params = session_get_cookie_params();

        // 1) Tentar apagar com os mesmos parâmetros da sessão atual
        setcookie(
            $cookieName,
            '',
            [
                'expires'  => time() - 42000,
                'path'     => $params['path'] ?: '/',
                'domain'   => $params['domain'] ?: '',
                'secure'   => $isHttps,
                'httponly' => $params['httponly'] ?? true,
                'samesite' => $params['samesite'] ?? 'Lax'
            ]
        );

        // 2) Tentativas adicionais cobrindo variações comuns
        $host = $_SERVER['HTTP_HOST'] ?? '';
        $domains = array_unique([
            '',
            $host,
            '.' . ltrim($host, '.'),
        ]);
        $paths = ['/', '/dash', '/dash/', '/dash/ajax', '/dash/admin'];
        foreach ($domains as $domain) {
            foreach ($paths as $path) {
                setcookie($cookieName, '', time() - 42000, $path, $domain, $isHttps, $params['httponly'] ?? true);
            }
        }
    }

	// Destruir a sessão no servidor
	session_destroy();

	// Redirecionar sempre para a página de login configurada
	$destinoLogin = isset($painel_adm_acessar) ? $painel_adm_acessar : 'login.php';
header('Location: ' . $destinoLogin, true, 302);
echo "<script>window.location.replace('" . addslashes($destinoLogin) . "');</script>";
ob_end_flush();
exit();
?>