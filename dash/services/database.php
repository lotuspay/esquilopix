<?php
//  -- Setar o timezone padrão do sistema  --------------------------------------------------------//
date_default_timezone_set("America/Sao_Paulo");
define('SITE_URL', 'http://' . $_SERVER['HTTP_HOST']);
define('PRODUCAO', true);
if (PRODUCAO) {
    $bd = array(
        'local' => 'localhost', // local/ip
        'usuario' => 'u701470451_esquilo', // user bd
        'senha' => 'dT1?Ggg4g', // senha bd
        'banco' => 'u701470451_esquilo' // nome bd
    );
} else {
    $bd = array(
        'local' => 'localhost', // local/ip
        'usuario' => 'u701470451_esquilo', // user bd
        'senha' => 'dT1?Ggg4g', // senha bd
        'banco' => 'u701470451_esquilo' // nome bd
    );
}
#----------------------------------------------------------------------------------------------------------#
//-- conexao procedural --------------------------------------------------------------------------//
$mysqli = new mysqli($bd['local'], $bd['usuario'], $bd['senha'], $bd['banco']);

if ($mysqli->connect_errno) {
    echo "Erro ao Conectar o BD: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    exit;
}
$mysqli->set_charset("utf8mb4");
