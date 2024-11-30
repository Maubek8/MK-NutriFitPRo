function submitForm() {
    // Captura os valores inseridos
    const fullName = document.getElementById("fullName").value;
    const metabolicData = document.getElementById("metabolicData").value;
    const menuData = document.getElementById("menuData").value;

    // Validação simples
    if (!fullName || !metabolicData || !menuData) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Armazena os dados no LocalStorage
    const patientData = { fullName, metabolicData, menuData };
    localStorage.setItem("patientData", JSON.stringify(patientData));

    // Redireciona para a página do paciente
    window.location.href = "./paciente.html"; // Use "./" para indicar o mesmo diretório
}

function loadPatientData() {
    // Recupera os dados do LocalStorage
    const patientData = JSON.parse(localStorage.getItem("patientData"));
    if (!patientData) {
        alert("Nenhum dado encontrado.");
        return;
    }

    // Exibe os dados na página `paciente.html`
    document.getElementById("displayFullName").textContent = patientData.fullName;
    document.getElementById("displayMetabolicData").textContent = patientData.metabolicData.replace(/\n/g, "<br>");
    document.getElementById("displayMenuData").textContent = patientData.menuData.replace(/\n/g, "<br>");
}