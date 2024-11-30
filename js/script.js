function submitForm() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const date = document.getElementById("date").value;
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const goalWeight = parseFloat(document.getElementById("goalWeight").value);
    const menu = document.getElementById("menu").value;

    const bmi = (weight / (height * height)).toFixed(2);
    const tmb = Math.round(10 * weight + 6.25 * (height * 100) - 5 * age + 5); // Fórmula de Harris-Benedict

    const patientData = {
        name, age, date, height, weight, goalWeight, menu, bmi, tmb
    };

    localStorage.setItem("patientData", JSON.stringify(patientData));
    window.location.href = "paciente.html";
}

function loadPatientData() {
    const patientData = JSON.parse(localStorage.getItem("patientData"));
    if (!patientData) return;

    document.getElementById("patientName").textContent = patientData.name;
    document.getElementById("patientAge").textContent = patientData.age;
    document.getElementById("patientDate").textContent = patientData.date;
    document.getElementById("patientWeight").textContent = patientData.weight;
    document.getElementById("patientHeight").textContent = patientData.height;
    document.getElementById("goalWeight").textContent = patientData.goalWeight;
    document.getElementById("bmi").textContent = patientData.bmi;
    document.getElementById("tmb").textContent = patientData.tmb;

    const menuDisplay = document.getElementById("dayMenuDisplay");
    menuDisplay.textContent = patientData.menu;
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.style.display = section.style.display === "block" ? "none" : "block";
}
