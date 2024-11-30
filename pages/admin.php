<?php
// Simulação de conexão ao banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nutrifit_pro";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Lógica de inserção de paciente e cardápio
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['add_patient'])) {
        $name = $_POST['name'];
        $age = $_POST['age'];
        $metabolism = $_POST['metabolism'];

        $sql = "INSERT INTO patients (name, age, metabolism) VALUES ('$name', '$age', '$metabolism')";
        $conn->query($sql);
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administração - NutriFit Pro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-4">
    <img src="logo-mk.png" alt="Logo MK" class="img-fluid mx-auto d-block" style="max-width: 150px;">
    <h1 class="text-center">NutriFit Pro</h1>

    <form method="POST" class="mt-4">
        <h3>Cadastro de Pacientes</h3>
        <div class="mb-3">
            <label for="name" class="form-label">Nome do Paciente</label>
            <input type="text" class="form-control" id="name" name="name" required>
        </div>
        <div class="mb-3">
            <label for="age" class="form-label">Idade</label>
            <input type="number" class="form-control" id="age" name="age" required>
        </div>
        <div class="mb-3">
            <label for="metabolism" class="form-label">Metabolismo</label>
            <input type="text" class="form-control" id="metabolism" name="metabolism">
        </div>
        <button type="submit" class="btn btn-primary w-100" name="add_patient">Cadastrar</button>
    </form>
</div>
</body>
</html>
