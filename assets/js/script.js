// Função de confirmação antes de excluir um registro
function confirmDelete(message = "Tem certeza que deseja excluir este item?") {
    return confirm(message);
}

// Mostrar alertas para salvar ou carregar dados
function showAlert(message, type = "success") {
    const alertBox = document.createElement("div");
    alertBox.className = `alert alert-${type}`;
    alertBox.innerText = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

// Exemplo de uso
document.addEventListener("DOMContentLoaded", () => {
    console.log("Scripts carregados com sucesso!");
});
