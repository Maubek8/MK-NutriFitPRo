let patientData = JSON.parse(localStorage.getItem('patientData')) || {};

document.getElementById('createPatientPageBtn').addEventListener('click', function () {
  const patientName = document.getElementById('patient-name').value.trim();

  if (!patientName) {
    alert('Por favor, insira o nome do paciente.');
    return;
  }

  const data = patientData[patientName];
  const newWindow = window.open('', '_blank');

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
      </header>
      <div class="container">
        <!-- Conteúdo dinâmico do paciente -->
      </div>
    </body>
    </html>
  `;

  newWindow.document.write(patientHTML);
  newWindow.document.close();
});

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
