<?php
// Configuração do Banco de Dados
define('DB_HOST', 'localhost'); // Substitua pelo host do seu banco de dados
define('DB_USER', 'root');      // Usuário do banco de dados
define('DB_PASS', '');          // Senha do banco de dados
define('DB_NAME', 'nutrifit');  // Nome do banco de dados

// URL para ativos
define('ASSETS_URL', '/assets/');

// Nome do sistema
define('SYSTEM_NAME', 'NutriFit Pro');

// Função para conectar ao banco de dados
function getDbConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        die('Erro na conexão com o banco de dados: ' . $conn->connect_error);
    }

    return $conn;
}
?>
