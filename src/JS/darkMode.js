// Botão de dark mode
const toggleButton = document.getElementById('toggle-dark-mode');
const icon = document.getElementById('icon-theme');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // (Opcional) Salvar preferência no navegador
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);

    if (document.body.classList.contains('dark-mode')) {
      icon.src = '../../src/assets/solIcon.png';   // Ícone branco para modo escuro
      icon.alt = 'Modo claro';
    } else {
      icon.src = '../../src/assets/luaIcon.png';  // Ícone preto para modo claro
      icon.alt = 'Modo escuro';
    }
});

// Carregar preferência ao abrir o site
window.addEventListener('load', () => {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  }
});