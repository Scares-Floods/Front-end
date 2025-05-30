let indice = 0;
    const carrossel = document.getElementById("carrossel");
    const total = document.querySelectorAll(".carrossel-item").length;

    function atualizarCarrossel() {
      carrossel.style.transform = `translateX(-${indice * 100}%)`;
    }

    function proximo() {
      indice = (indice + 1) % total;
      atualizarCarrossel();
    }

    function anterior() {
      indice = (indice - 1 + total) % total;
      atualizarCarrossel();
    }

    setInterval(proximo, 2000);