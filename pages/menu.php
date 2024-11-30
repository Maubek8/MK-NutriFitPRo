<?php
require_once '../config.php';

// Obter informações do paciente e cardápio do banco de dados
$conn = getDbConnection();

// ID do paciente (normalmente passado via GET na URL)
$patient_id = $_GET['id'] ?? 1;

// Obter dados do paciente
$patient_sql = "SELECT * FROM patients WHERE id = ?";
$stmt = $conn->prepare($patient_sql);
$stmt->bind_param("i", $patient_id);
$stmt->execute();
$patient = $stmt->get_result()->fetch_assoc();

// Obter cardápio do paciente
$menu_sql = "SELECT * FROM menus WHERE patient_id = ?";
$stmt = $conn->prepare($menu_sql);
$stmt->bind_param("i", $patient_id);
$stmt->execute();
$menus = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

// Organizar cardápios por dia
$weekly_menu = [];
foreach ($menus as $menu) {
    $weekly_menu[$menu['day']] = $menu['details'];
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NutriFit Pro - Cardápio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
        }

        .container {
            margin-top: 20px;
            max-width: 900px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .day-buttons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
        }

        .day-button {
            flex: 1;
            max-width: 120px;
            padding: 10px 15px;
            text-align: center;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            background: #007bff;
            color: white;
            transition: background 0.3s;
        }

        .day-button.active {
            background: #0056b3;
        }

        .menu-display {
            margin-top: 20px;
        }

        @media (max-width: 768px) {
            .day-buttons {
                flex-direction: column;
            }

            .day-button {
                width: 100%;
            }
        }
    </style>
</head>
<body>
<div class="container">
    <img src="../assets/img/logo-mk.png" alt="Logo MK" class="img-fluid mx-auto d-block" style="max-width: 150px;">
    <h1 class="text-center">NutriFit Pro</h1>
    <h3>Paciente: <?php echo $patient['name']; ?></h3>
    <p>Idade: <?php echo $patient['age']; ?> anos</p>

    <div class="day-buttons">
        <?php
        $days = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'];
        foreach ($days as $day) {
            echo "<button class='day-button' onclick='showMenu(\"$day\")'>" . ucfirst($day) . "</button>";
        }
        ?>
    </div>

    <div class="menu-display" id="menuDisplay">
        <p>Selecione um dia para ver o cardápio.</p>
    </div>

    <button class="btn btn-success w-100 mt-4" onclick="exportToPDF()">Baixar Cardápio em PDF</button>
</div>

<script>
    const weeklyMenu = <?php echo json_encode($weekly_menu); ?>;

    function showMenu(day) {
        const menuDisplay = document.getElementById('menuDisplay');
        if (weeklyMenu[day]) {
            menuDisplay.innerHTML = `
                <h4>Cardápio de ${day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                <p>${weeklyMenu[day]}</p>
            `;
        } else {
            menuDisplay.innerHTML = '<p>Nenhum cardápio disponível para este dia.</p>';
        }

        // Atualizar botões ativos
        const buttons = document.querySelectorAll('.day-button');
        buttons.forEach(button => button.classList.remove('active'));
        document.querySelector(`.day-button[onclick='showMenu("${day}")']`).classList.add('active');
    }

    function exportToPDF() {
        const pdfContent = document.getElementById('menuDisplay').innerHTML;
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,' + btoa(pdfContent);
        link.download = 'cardapio.pdf';
        link.click();
    }
</script>
</body>
</html>
