document.addEventListener('DOMContentLoaded', () => {
  const patientData = JSON.parse(localStorage.getItem('patientData')) || {};

  const weekDays = [
    { day: 'monday', label: 'Segunda-feira' },
    { day: 'tuesday', label: 'Terça-feira' },
    { day: 'wednesday', label: 'Quarta-feira' },
    { day: 'thursday', label: 'Quinta-feira' },
    { day: 'friday', label: 'Sexta-feira' },
    { day: 'saturday', label: 'Sábado' },
    { day: 'sunday', label: 'Domingo' },
  ];

  const refeicoesContent = document.getElementById('refeicoes-content');

  weekDays.forEach(({ day, label }) => {
    const button = document.createElement('button');
    button.className = `accordion-button day-${day}`;
    button.innerHTML = `${label} <span>+</span>`;
    
    const content = document.createElement('div');
    content.className = 'accordion-content';
    content.innerHTML = `
      <textarea class="meal-textarea" data-day="${day}" placeholder="Cole aqui as refeições de ${label}..."></textarea>
      <button class="save-btn">Salvar ${label}</button>
    `;

    refeicoesContent.appendChild(button);
    refeicoesContent.appendChild(content);

    button.addEventListener('click', () => {
      const isActive = button.classList.toggle('active');
      content.style.display = isActive ? 'block' : 'none';
    });
  });

  document.getElementById('createPatientPageBtn').addEventListener('click', () => {
    const patientName = document.getElementById('patient-name').value.trim();
    if (!patientName) {
      alert('Insira o nome do paciente!');
      return;
    }

    const patientPageHTML = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${patientName} - Plano Nutricional</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        ${document.querySelector('.header').outerHTML}
        ${document.querySelector('.container').outerHTML}
      </body>
      </html>
    `;

    const blob = new Blob([patientPageHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${patientName}_plano_nutricional.html`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  });
});
