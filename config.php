<?php
// Configurações do Banco de Dados
define('DB_HOST', 'localhost');       // Endereço do servidor do banco de dados
define('DB_USER', 'root');           // Usuário do banco de dados
define('DB_PASS', '');               // Senha do banco de dados
define('DB_NAME', 'nutrifit_pro');   // Nome do banco de dados

// Caminhos base
define('BASE_URL', 'http://localhost/nutrifit_pro/'); // URL base do sistema
define('ASSETS_URL', BASE_URL . 'assets/');          // URL para os arquivos estáticos

// Configurações do sistema
define('SYSTEM_NAME', 'NutriFit Pro'); // Nome do sistema

// Função de conexão ao banco de dados
function getDbConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        die('Erro na conexão com o banco de dados: ' . $conn->connect_error);
    }
    
    return $conn;
}

// Configuração de fuso horário
date_default_timezone_set('America/Sao_Paulo');
