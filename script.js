document.getElementById('entrar').addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const descricao = document.getElementById('descricao').value;

    if (nome && data) {
        localStorage.setItem('nome', nome);
        localStorage.setItem('data', data);
        localStorage.setItem('descricao', descricao);

        window.location.href = 'paciente.html';
    } else {
        alert('Por favor, preencha todos os campos obrigatórios!');
    }
});

if (window.location.pathname.includes('paciente.html')) {
    document.getElementById('nome').textContent = localStorage.getItem('nome');
    document.getElementById('data').textContent = localStorage.getItem('data');
    document.getElementById('descricao').textContent = localStorage.getItem('descricao');
}
