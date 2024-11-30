<?php
// Simulação de conexão ao banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nutrifit_pro";

$conn = new mysqli($servername, $username, $password, $dbname);

// Obter dados do paciente
$id = $_GET['id'] ?? 1; // Exemplo: obtendo ID via GET
$sql = "SELECT * FROM patients WHERE id = $id";
$result = $conn->query($sql);
$patient = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NutriFit Pro - Paciente</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .menu-btn {
            margin-top: 20px;
            padding: 15px;
            font-size: 1.2em;
        }
    </style>
</head>
<body>
<div class="container mt-4">
    <img src="logo-mk.png" alt="Logo MK" class="img-fluid mx-auto d-block" style="max-width: 150px;">
    <h1 class="text-center">NutriFit Pro</h1>
    <h3>Paciente: <?php echo $patient['name']; ?></h3>
    <p>Idade: <?php echo $patient['age']; ?></p>

    <button class="btn btn-info w-100 menu-btn" onclick="showSection('metabolism')">Metabolismo</button>
    <button class="btn btn-info w-100 menu-btn" onclick="showSection('training')">Treino</button>
    <button class="btn btn-info w-100 menu-btn" onclick="showSection('menu')">Cardápio</button>

    <div id="section-content" class="mt-4">
        <p>Selecione um botão para ver os detalhes.</p>
    </div>
</div>

<script>
function showSection(section) {
    const content = document.getElementById('section-content');
    if (section === 'metabolism') {
        content.innerHTML = '<p>Detalhes do metabolismo.</p>';
    } else if (section === 'training') {
        content.innerHTML = '<p>Plano de treino do paciente.</p>';
    } else if (section === 'menu') {
        content.innerHTML = `
            <div>
                <h4>Selecione o dia:</h4>
                <button class="btn btn-secondary" onclick="loadMenu('monday')">Segunda</button>
                <button class="btn btn-secondary" onclick="loadMenu('tuesday')">Terça</button>
                <!-- Adicione outros dias -->
            </div>
        `;
    }
}

function loadMenu(day) {
    const content = document.getElementById('section-content');
    content.innerHTML = `<p>Cardápio para ${day}: [Detalhes aqui]</p>`;
}
</script>
</body>
</html>
