// Botão de dark mode
const toggleButton = document.getElementById('toggle-dark-mode');
const icon = document.getElementById('icon-theme');

const carousel = document.getElementById('carousel');

// Imagens de fundo
const backgrounds = [
  'url(../../src/assets/enchente1.jpg)',
  'url(../../src/assets/enchente2.jpg)',
  'url(../../src/assets/enchente3.jpg)'
];

let current = 0;

// Função para mostrar slide atual
function showSlide(index) {
  carousel.style.backgroundImage = backgrounds[index];
}

// Proximo slide
function nextSlide() {
  current = (current + 1) % backgrounds.length;
  showSlide(current);
}

// Slide anterior
function prevSlide() {
  current = (current - 1 + backgrounds.length) % backgrounds.length;
  showSlide(current);
}

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

// Mudar automaticamente a cada 5 segundos
setInterval(nextSlide, 5000);

// Mostrar o primeiro slide ao carregar
showSlide(current);


