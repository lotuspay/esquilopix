<?php
//  -- Setar o timezone padrão do sistema  --------------------------------------------------------//
date_default_timezone_set("America/Sao_Paulo");
@define('SITE_URL', 'http://' . $_SERVER['HTTP_HOST']);
@define('PRODUCAO', true);
if (PRODUCAO) {
    $bd = array(
        'local' => '', // local/ip
        'usuario' => '', // user bd
        'senha' => '', // senha bd
        'banco' => '' // nome bd
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
