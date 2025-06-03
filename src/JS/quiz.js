  // Questions array - each has question text and answers mapped to cars
  const questions = [
    {
      question: "O que é uma enchente?",
      answers: [
        { text: "Uma erupção de um vulcão próximo a rios", car: "EQE" },
        { text: "Um tremor de terra causado por excesso de água", car: "BYD" },
        { text: "O transbordamento de rios ou acúmulo de água em áreas urbanas", car: "HONDA" },
        { text: "O acúmulo excessivo de água que provoca alagamentos", car: "TESLA" },
      ],
    },
    {
      question: "Qual dos fatores a seguir contribui para o aumento das enchentes nas cidades?",
      answers: [
        { text: "Preservação de florestas", car: "EQE" },
        { text: "Uso de energia solar", car: "BYD" },
        { text: "Impermeabilização do solo por asfalto e concreto", car: "HONDA" },
        { text: "Construção de poços artesianos", car: "TESLA" },
      ],
    },
    {
      question: "Qual é uma das principais consequências de uma enchente?",
      answers: [
        { text: "Melhoria da agricultura urbana", car: "EQE" },
        { text: "Aumento da biodiversidade local", car: "BYD" },
        { text: "Geração de energia limpa", car: "HONDA" },
        { text: "Danos materiais e riscos à saúde pública", car: "TESLA" },
      ],
    },
    {
      question: "Como a população pode ajudar a evitar enchentes nas cidades?",
      answers: [
        { text: "Jogando lixo nas ruas para facilitar o escoamento", car: "EQE" },
        { text: "Lavando calçadas com mangueiras", car: "BYD" },
        { text: "Não jogando lixo em bueiros e córregos", car: "HONDA" },
        { text: "Construindo casas sobre rios", car: "TESLA" },
      ],
    },
    {
      question: "Que infraestrutura ajuda no controle de enchentes em áreas urbanas?",
      answers: [
        { text: "Casas flutuantes", car: "EQE" },
        { text: "Sistemas de drenagem pluvial eficientes", car: "BYD" },
        { text: "Linhas de transmissão elétrica", car: "HONDA" },
        { text: "Túneis subterrâneos para pedestres", car: "TESLA" },
      ],
    },
    {
      question: "Em que época do ano ocorrem mais enchentes no Brasil?",
      answers: [
        { text: "Inverno", car: "EQE" },
        { text: "Outono", car: "BYD" },
        { text: "Verão", car: "HONDA" },
        { text: "Primavera", car: "TESLA" },
      ],
    },
    {
      question: "Qual órgão brasileiro é responsável por monitorar e alertar sobre riscos de desastres naturais, como enchentes?",
      answers: [
        { text: "IBGE", car: "EQE" },
        { text: "Defesa Civil", car: "BYD" },
        { text: "INSS", car: "HONDA" },
        { text: "Receita Federal", car: "TESLA" },
      ],
    },
    {
      question: "O que é alagamento urbano?",
      answers: [
        { text: "Aumento da maré que atinge zonas costeiras", car: "EQE" },
        { text: "Apenas o transbordamento de rios", car: "BYD" },
        { text: "Acúmulo de água da chuva por falta de escoamento adequado", car: "HONDA" },
        { text: "Fenômeno de seca extrema nas cidades", car: "TESLA" },
      ],
    },
    {
      question: "Uma forma natural de reduzir o impacto das enchentes é:",
      answers: [
        { text: "Construir mais prédios nas margens dos rios", car: "EQE" },
        { text: "Desmatar áreas de várzea", car: "BYD" },
        { text: "Canalizar todos os rios da cidade", car: "HONDA" },
        { text: "Preservar matas ciliares e áreas verdes", car: "TESLA" },
      ],
    },
    {
      question: "Qual destes problemas pode ocorrer após uma enchente?",
      answers: [
        { text: "Aumento da produção agrícola", car: "EQE" },
        { text: "Restauração automática das ruas", car: "BYD" },
        { text: "Disseminação de doenças como leptospirose", car: "HONDA" },
        { text: "Crescimento da economia local", car: "TESLA" },
      ],
    },
  ];
 
  const startBtn = document.getElementById('start-btn');
  const nextBtn = document.getElementById('next-btn');
  const questionContainer = document.getElementById('question-container');
  const answerButtons = document.getElementById('answer-buttons');
  const resultContainer = document.getElementById('result-container');
  const resultDiv = document.getElementById('result');
  const startContainer = document.getElementById('start-container');
 
  let currentQuestionIndex = 0;
  let scores = { EQE: 0, BYD: 0, HONDA: 0, TESLA: 0 };
  let selectedAnswer = null;
 
  startBtn.addEventListener('click', startQuiz);
  nextBtn.addEventListener('click', () => {
    if (selectedAnswer !== null) {
      // Increment score of previously selected answer
      scores[selectedAnswer]++;
      selectedAnswer = null;
      currentQuestionIndex++;
      setNextQuestion();
    }
  });
 
  function startQuiz() {
    startContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    scores = { EQE: 0, BYD: 0, HONDA: 0, TESLA: 0 };
    selectedAnswer = null;
    nextBtn.disabled = true;
    setNextQuestion();
  }
 
  function setNextQuestion() {
    resetState();
    if (currentQuestionIndex >= questions.length) {
      showResult();
      return;
    }
    showQuestion(questions[currentQuestionIndex]);
  }
 
  function showQuestion(questionObj) {
    document.getElementById('question').textContent = questionObj.question;
    questionObj.answers.forEach(answer => {
      const button = document.createElement('button');
      button.classList.add('answer');
      button.textContent = answer.text;
      button.dataset.car = answer.car;
      button.addEventListener('click', selectAnswer);
      answerButtons.appendChild(button);
    });
  }
 
  function resetState() {
    nextBtn.disabled = true;
    // Remove all answer buttons
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
    selectedAnswer = null;
  }
 
  function selectAnswer(e) {
    const chosenCar = e.target.dataset.car;
 
    // Unselect all other buttons
    Array.from(answerButtons.children).forEach(button => {
      button.style.backgroundColor = '#7EBAFF';
      button.style.color = '#3895ff';
      button.style.borderBottom = '1px solid #3895ff';
    });
 
    // Highlight selected button
    e.target.style.backgroundColor = '#3895ff';
    e.target.style.color = 'white';
    e.target.style.borderBottom = '1px solid #7EBAFF';
 
    selectedAnswer = chosenCar;
    nextBtn.disabled = false;
  }
 
  function showResult() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
 
    let maxScore = -1;
    let bestCars = [];
    for (const car in scores) {
      if (scores[car] > maxScore) {
        maxScore = scores[car];
        bestCars = [car];
      } else if (scores[car] === maxScore) {
        bestCars.push(car);
      }
    }
 
    let resultHTML = "";
    if (bestCars.length === 1) {
      const carKey = bestCars[0];
      resultHTML = `<div>O carro ideal para você é: <span id="car-name">${cars[carKey].name}</span></div>
                    <div id="car-description">${cars[carKey].description}</div>`;
    } else {
      resultHTML = `<div>Você combinou com mais de um carro! Veja suas opções:</div>`;
      bestCars.forEach(carKey => {
        resultHTML += `<div style="margin-top: 15px;font-weight: 700; color:#28a745;">${cars[carKey].name}</div>
                       <div>${cars[carKey].description}</div>`;
      });
    }
 
    resultDiv.innerHTML = resultHTML;
  }
 
  document.getElementById('restart-btn').addEventListener('click', () => {
    resultContainer.classList.add('hidden');
    startContainer.classList.remove('hidden');
  });
 