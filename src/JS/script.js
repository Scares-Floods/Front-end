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

// Mudar automaticamente a cada 5 segundos
setInterval(nextSlide, 5000);

// Mostrar o primeiro slide ao carregar
showSlide(current);