// Inicializar Layout Dinâmico
function initializeLayout() {
  const accordionContainer = document.getElementById('accordion-container');

  const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
  days.forEach(day => {
    accordionContainer.innerHTML += `
      <div class="accordion">
        <button class="accordion-button">${day}</button>
        <div class="accordion-content">
          <textarea class="meal-textarea" data-day="${day.toLowerCase()}"></textarea>
        </div>
      </div>
    `;
  });

  accordionContainer.innerHTML += `
    <div class="accordion">
      <button class="accordion-button">Alternativas</button>
      <div class="accordion-content">
        <textarea class="meal-textarea" data-section="alternativas"></textarea>
      </div>
    </div>
    <div class="accordion">
      <button class="accordion-button">Metabolismo</button>
      <div class="accordion-content">
        <textarea class="meal-textarea" data-section="metabolismo"></textarea>
      </div>
    </div>
    <div class="accordion">
      <button class="accordion-button">Exercícios</button>
      <div class="accordion-content">
        <textarea class="meal-textarea" data-section="exercicios"></textarea>
      </div>
    </div>
  `;
  initializeAccordion();
}

// Tornar os botões dinâmicos (comportamento acordeão)
function initializeAccordion() {
  const accordionButtons = document.querySelectorAll('.accordion-button');
  accordionButtons.forEach(button => {
    button.addEventListener('click', function () {
      const content = this.nextElementSibling;

      // Fechar todos os outros acordeões abertos
      document.querySelectorAll('.accordion-content').forEach(c => {
        if (c !== content) {
          c.style.display = 'none';
          c.previousElementSibling.classList.remove('active');
        }
      });

      // Alternar o estado do acordeão clicado
      const isActive = this.classList.toggle('active');
      content.style.display = isActive ? 'block' : 'none';
    });
  });
}

// Inicializar as seções dinâmicas ao carregar a página
document.addEventListener('DOMContentLoaded', initializeLayout);

// Criar página do paciente
document.getElementById('createPatientPageBtn').addEventListener('click', function () {
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

// Baixar página do paciente
document.getElementById('downloadPatientPageBtn').addEventListener('click', function () {
  const patientName = document.getElementById('patient-name').value.trim();

  if (!patientName) {
    alert('Por favor, insira o nome do paciente.');
    return;
  }

  const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${patientName}.html`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
});
