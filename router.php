<?php
// Router raiz para emular .htaccess sem Apache
// Uso: php -S 127.0.0.1:8000 router.php (executar no diretório raiz do projeto)

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$projectRoot = __DIR__;
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/');

// CORS básico para ambiente de desenvolvimento e para permitir credenciais quando frontend estiver em outra origem localhost
// Em produção, prefira servir frontend e backend na mesma origem e/ou configurar no Apache.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    // Origens comuns de dev front-end
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

$isAllowedOrigin = $origin && in_array($origin, $allowedOrigins, true);
if ($isAllowedOrigin) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With');
    header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
    header('Vary: Origin');
}

// Responder rapidamente preflight OPTIONS
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    // Mesmo se a origem não estiver na allowlist, respondemos 204 para evitar timeouts de dev
    http_response_code(204);
    echo '';
    return true;
}

// Servir arquivos estáticos diretamente se existirem sob a raiz
$fullPath = realpath($projectRoot . $uri);
if ($fullPath !== false && strpos($fullPath, $projectRoot) === 0 && is_file($fullPath)) {
    return false; // deixa o servidor embutido servir
}

// Roteamento para APIs: garanta que /api/* vá para os handlers corretos e não caia no index SPA
if (strpos($uri, '/api') === 0) {
    $apiTarget = $projectRoot . $uri;

    // 1) Se caminho aponta para arquivo existente (ex: /api/v1/api.php), deixe o servidor servir
    $apiReal = realpath($apiTarget);
    if ($apiReal !== false && strpos($apiReal, $projectRoot) === 0 && is_file($apiReal)) {
        return false;
    }

    // 2) Se for um diretório com index.php (ex: /api/user/refresh/index.php), inclua
    if (is_dir($apiTarget) && file_exists($apiTarget . DIRECTORY_SEPARATOR . 'index.php')) {
        try { require $apiTarget . DIRECTORY_SEPARATOR . 'index.php'; } catch (Throwable $e) { http_response_code(500); echo 'Router error: ' . $e->getMessage(); }
        return true;
    }

    // 3) Fallback conhecido: /api/v1 -> front controller api/v1/api.php
    $apiV1 = $projectRoot . DIRECTORY_SEPARATOR . 'api' . DIRECTORY_SEPARATOR . 'v1' . DIRECTORY_SEPARATOR . 'api.php';
    if (file_exists($apiV1)) {
        try { require $apiV1; } catch (Throwable $e) { http_response_code(500); echo 'Router error: ' . $e->getMessage(); }
        return true;
    }

    http_response_code(404);
    echo 'API route not found';
    return true;
}

// Endpoints de API no nível da raiz (sem prefixo /api)
// Encaminhar para api/v1/api.php para garantir resposta JSON
// Inclui autenticação e endpoints do jogo/usuário usados pela UI
$rootApiEndpoints = [
    // auth
    '/register',
    '/login-to-game',
    '/logout',

    // game
    '/game/start',
    '/game/cash-out',
    '/game/open-chest',
    '/game-history',

    // user/profile
    '/user-data',
    '/change-password',

    // referral/agent
    '/referral-link',
    '/agent-panel-data',
    '/agent-collect-commission',

    // deposit/withdrawal
    '/deposit-data',
    '/deposit',
    '/check-payment-status',
    '/withdrawal-data',
    '/withdrawal',
    '/update-pix-document',
];
if (in_array(parse_url($uri, PHP_URL_PATH), $rootApiEndpoints, true)) {
    $apiV1 = $projectRoot . DIRECTORY_SEPARATOR . 'api' . DIRECTORY_SEPARATOR . 'v1' . DIRECTORY_SEPARATOR . 'api.php';
    if (file_exists($apiV1)) {
        try { require $apiV1; } catch (Throwable $e) { http_response_code(500); echo 'Router error: ' . $e->getMessage(); }
        return true;
    }
}

// Se a requisição for para o subapp do painel (/dash ...), roteia como antes
if (strpos($uri, '/dash') === 0) {
    $dashDir = $projectRoot . DIRECTORY_SEPARATOR . 'dash';

    // Ajustar CWD e include_path para que includes relativos funcionem (./partes/..., ./services/...)
    chdir($dashDir);
    set_include_path($dashDir . PATH_SEPARATOR . get_include_path());

    // Remover prefixo /dash
    $path = substr($uri, 5); // remove '/dash'
    if ($path === false) { $path = ''; }
    $path = trim($path, '/');

    // Mapa de rotas amigáveis
    $map = [
        'login' => 'login.php',
        'sair' => 'sair.php',
        'caixa-premiacoes' => 'caixa-premiacoes.php',
        'usuarios' => 'usuarios.php',
        'admin-usuarios' => 'admin-usuarios.php',
        'index' => 'index.php',
        'sistema' => 'sistema.php',
        'afiliados' => 'afiliados.php',
        'listagem-afiliados' => 'listagem-afiliados.php',
        'pagamentos' => 'pagamentos.php',
        'conversao' => 'conversao.php',
        'imagens' => 'imagens.php',
        'valores' => 'valores.php',
        'cores' => 'cores.php',
        'banners' => 'banners.php',
        'usuario-detalhes' => 'usuario-detalhes.php',
        'raspadinhas' => 'raspadinhas.php',
        'recompensas' => 'recompensas.php',
        'editar-premiacoes' => 'editar-premiacoes.php',
        'historico-raspadinhas' => 'historico-raspadinhas.php',
        'depositos' => 'depositos.php',
        'saques' => 'saques.php',
        'webhooks' => 'webhooks.php',
    ];

    // Rotas AJAX: /dash/ajax/<slug>
    if (strpos($path, 'ajax/') === 0) {
        $ajaxSlug = trim(substr($path, 5), '/');
        // Mapeamentos explícitos (se houver)
        $ajaxMap = [
            'form-slider' => 'form-slider.php',
        ];
        if ($ajaxSlug === '' && file_exists($dashDir . '/ajax/index.php')) {
            try { require $dashDir . '/ajax/index.php'; } catch (Throwable $e) { http_response_code(500); echo 'Router error: ' . $e->getMessage(); }
            return true;
        }
        if (isset($ajaxMap[$ajaxSlug]) && file_exists($dashDir . '/ajax/' . $ajaxMap[$ajaxSlug])) {
            try { require $dashDir . '/ajax/' . $ajaxMap[$ajaxSlug]; } catch (Throwable $e) { http_response_code(500); echo 'Router error: ' . $e->getMessage(); }
            return true;
        }
        $directAjax = $dashDir . '/ajax/' . basename($ajaxSlug) . '.php';
        if (file_exists($directAjax)) {
            try { require $directAjax; } catch (Throwable $e) { http_response_code(500); echo 'Router error: ' . $e->getMessage(); }
            return true;
        }
        http_response_code(404);
        echo 'AJAX route not found';
        return true;
    }

    // Raiz do painel
    if ($path === '' || $path === false) {
        $entry = $dashDir . '/index.php';
        if (file_exists($entry)) {
            try { require $entry; } catch (Throwable $e) { http_response_code(500); echo 'Router error: ' . $e->getMessage(); }
            return true;
        }
    }

    // Se a rota estiver no mapa
    if (isset($map[$path])) {
        $target = $dashDir . '/' . $map[$path];
        if (file_exists($target)) {
            try { require $target; } catch (Throwable $e) { http_response_code(500); echo 'Router error: ' . $e->getMessage(); }
            return true;
        }
    }

    // Fallback: arquivo PHP direto em dash
    $direct = $dashDir . '/' . basename($path) . '.php';
    if ($path !== '' && file_exists($direct)) {
        try { require $direct; } catch (Throwable $e) { http_response_code(500); echo 'Router error: ' . $e->getMessage(); }
        return true;
    }

    // Último recurso: index.php do dash
    $index = $dashDir . '/index.php';
    if (file_exists($index)) {
        try { require $index; } catch (Throwable $e) { http_response_code(500); echo 'Router error: ' . $e->getMessage(); }
        return true;
    }

    http_response_code(404);
    echo 'Route not found (dash)';
    return true;
}

// Para qualquer outra rota fora de /dash, se não houver arquivo correspondente, tente index.php da raiz se existir
$rootIndex = $projectRoot . '/index.php';
if (file_exists($rootIndex)) {
    try { require $rootIndex; } catch (Throwable $e) { http_response_code(500); echo 'Router error: ' . $e->getMessage(); }
    return true;
}

http_response_code(404);
echo 'Route not found';
return true;
