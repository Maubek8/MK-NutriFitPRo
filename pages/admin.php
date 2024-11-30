<?php
require_once '../includes/header.php'; // Inclui o cabeçalho com o logo e o estilo

// Verificar conexão com o banco de dados
$conn = getDbConnection();
?>

<div class="container mt-4">
    <h2 class="text-center">Painel de Administração</h2>
    <p class="text-center">Gerencie pacientes e cardápios abaixo:</p>

    <!-- Formulário para cadastro de pacientes -->
    <form method="POST" action="admin.php" class="mt-4">
        <h3>Cadastro de Pacientes</h3>
        <div class="mb-3">
            <label for="name" class="form-label">Nome do Paciente</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Digite o nome do paciente" required>
        </div>
        <div class="mb-3">
            <label for="age" class="form-label">Idade</label>
            <input type="number" class="form-control" id="age" name="age" placeholder="Digite a idade do paciente" required>
        </div>
        <div class="mb-3">
            <label for="metabolism" class="form-label">Metabolismo</label>
            <input type="text" class="form-control" id="metabolism" name="metabolism" placeholder="Digite informações de metabolismo">
        </div>
        <button type="submit" class="btn btn-primary w-100" name="add_patient">Cadastrar Paciente</button>
    </form>

    <!-- Tabela de pacientes cadastrados -->
    <div class="mt-5">
        <h3 class="text-center">Pacientes Cadastrados</h3>
        <table class="table table-bordered mt-3">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Metabolismo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Buscar pacientes no banco de dados
                $result = $conn->query("SELECT * FROM patients");

                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>{$row['id']}</td>
                                <td>{$row['name']}</td>
                                <td>{$row['age']}</td>
                                <td>{$row['metabolism']}</td>
                                <td>
                                    <a href='menu.php?id={$row['id']}' class='btn btn-success btn-sm'>Ver Cardápio</a>
                                    <a href='delete.php?id={$row['id']}' class='btn btn-danger btn-sm'>Excluir</a>
                                </td>
                              </tr>";
                    }
                } else {
                    echo "<tr><td colspan='5' class='text-center'>Nenhum paciente cadastrado.</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</div>

<?php
require_once '../includes/footer.php'; // Inclui o rodapé
?>

<?php
// Lógica para adicionar pacientes ao banco de dados
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_patient'])) {
    $name = $_POST['name'];
    $age = $_POST['age'];
    $metabolism = $_POST['metabolism'];

    $stmt = $conn->prepare("INSERT INTO patients (name, age, metabolism) VALUES (?, ?, ?)");
    $stmt->bind_param("sis", $name, $age, $metabolism);

    if ($stmt->execute()) {
        echo "<script>alert('Paciente cadastrado com sucesso!'); window.location.href='admin.php';</script>";
    } else {
        echo "<script>alert('Erro ao cadastrar paciente.');</script>";
    }
}
?>
