document.addEventListener('DOMContentLoaded', () => {
  initializeLayout();
  initializeAccordion();
});

function initializeLayout() {
  const nutriFitSection = document.getElementById('nutriFitSection');

  const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
  days.forEach(day => {
    nutriFitSection.innerHTML += `
      <div class="accordion">
        <button class="accordion-button">${day}</button>
        <div class="accordion-content">
          <textarea class="meal-textarea" data-day="${day.toLowerCase()}" placeholder="Insira refeições para ${day}..."></textarea>
        </div>
      </div>
    `;
  });
}

function initializeAccordion() {
  document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;

      // Fechar outros acordeões abertos
      document.querySelectorAll('.accordion-content').forEach(c => {
        if (c !== content) {
          c.style.display = 'none';
          c.previousElementSibling.classList.remove('active');
        }
      });

      // Alternar o estado do acordeão clicado
      const isActive = button.classList.toggle('active');
      content.style.display = isActive ? 'block' : 'none';
    });
  });
}

document.getElementById('createPatientPageBtn').addEventListener('click', () => {
  const patientName = document.getElementById('patient-name').value.trim();
  const patientDate = document.getElementById('patient-date').value;

  if (!patientName) {
    alert('Por favor, insira o nome do paciente.');
    return;
  }

  const meals = {};
  document.querySelectorAll('.meal-textarea').forEach(textarea => {
    const section = textarea.dataset.day || textarea.dataset.section;
    meals[section] = textarea.value;
  });

  const patientHTML = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <title>${patientName} - Plano Nutricional</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <header class="header">
        <img src="logo.png" alt="Logo" class="header-logo">
        <h1>${patientName}</h1>
        <p>Data: ${new Date(patientDate).toLocaleDateString('pt-BR')}</p>
      </header>
      <div class="container">
        ${Object.entries(meals).map(([section, value]) => `
          <div>
            <h3>${section}</h3>
            <p>${value || 'Sem informações registradas'}</p>
          </div>
        `).join('')}
      </div>
    </body>
    </html>
  `;

  const newWindow = window.open('', '_blank');
  newWindow.document.write(patientHTML);
  newWindow.document.close();
});

document.getElementById('downloadPatientPageBtn').addEventListener('click', () => {
  const patientName = document.getElementById('patient-name').value.trim();

  if (!patientName) {
    alert('Por favor, insira o nome do paciente.');
    return;
  }

  const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
  a.href = url;
  a.download = `${patientName}_PlanoNutricional.html`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
});

