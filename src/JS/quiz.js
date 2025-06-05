// Questions array - each has question text, answers, and the correct answer index
const questions = [
  {
    question: "O que é uma enchente?",
    answers: [
      { text: "Uma erupção de um vulcão próximo a rios" },
      { text: "Um tremor de terra causado por excesso de água" },
      { text: "O transbordamento de rios ou acúmulo de água em áreas urbanas" },
      { text: "O acúmulo excessivo de água que provoca alagamentos" },
    ],
    correctAnswerIndex: 2,
  },
  {
    question: "Qual dos fatores a seguir contribui para o aumento das enchentes nas cidades?",
    answers: [
      { text: "Preservação de florestas" },
      { text: "Uso de energia solar" },
      { text: "Impermeabilização do solo por asfalto e concreto" },
      { text: "Construção de poços artesianos" },
    ],
    correctAnswerIndex: 2,
  },
  {
    question: "Qual é uma das principais consequências de uma enchente?",
    answers: [
      { text: "Melhoria da agricultura urbana" },
      { text: "Aumento da biodiversidade local" },
      { text: "Geração de energia limpa" },
      { text: "Danos materiais e riscos à saúde pública" },
    ],
    correctAnswerIndex: 3,
  },
  {
    question: "Como a população pode ajudar a evitar enchentes nas cidades?",
    answers: [
      { text: "Jogando lixo nas ruas para facilitar o escoamento" },
      { text: "Lavando calçadas com mangueiras" },
      { text: "Não jogando lixo em bueiros e córregos" },
      { text: "Construindo casas sobre rios" },
    ],
    correctAnswerIndex: 2,
  },
  {
    question: "Que infraestrutura ajuda no controle de enchentes em áreas urbanas?",
    answers: [
      { text: "Casas flutuantes" },
      { text: "Sistemas de drenagem pluvial eficientes" },
      { text: "Linhas de transmissão elétrica" },
      { text: "Túneis subterrâneos para pedestres" },
    ],
    correctAnswerIndex: 1,
  },
  {
    question: "Em que época do ano ocorrem mais enchentes no Brasil, de forma geral (considerando as regiões com maior incidência)?",
    answers: [
      { text: "Inverno" },
      { text: "Outono" },
      { text: "Verão" },
      { text: "Primavera" },
    ],
    correctAnswerIndex: 2,
  },
  {
    question: "Qual órgão brasileiro é responsável por monitorar e alertar sobre riscos de desastres naturais, como enchentes?",
    answers: [
      { text: "IBGE (Instituto Brasileiro de Geografia e Estatística)" },
      { text: "Defesa Civil (Nacional, Estadual ou Municipal) e CEMADEN" },
      { text: "INSS (Instituto Nacional do Seguro Social)" },
      { text: "Receita Federal" },
    ],
    correctAnswerIndex: 1,
  },
  {
    question: "O que é alagamento urbano?",
    answers: [
      { text: "Aumento da maré que atinge zonas costeiras" },
      { text: "Apenas o transbordamento de rios" },
      { text: "Acúmulo de água da chuva por falta de escoamento adequado" },
      { text: "Fenômeno de seca extrema nas cidades" },
    ],
    correctAnswerIndex: 2,
  },
  {
    question: "Uma forma natural de reduzir o impacto das enchentes é:",
    answers: [
      { text: "Construir mais prédios nas margens dos rios" },
      { text: "Desmatar áreas de várzea" },
      { text: "Canalizar todos os rios da cidade" },
      { text: "Preservar matas ciliares e áreas verdes" },
    ],
    correctAnswerIndex: 3,
  },
  {
    question: "Qual destes problemas pode ocorrer após uma enchente?",
    answers: [
      { text: "Aumento da produção agrícola na área afetada" },
      { text: "Restauração automática das ruas pela água" },
      { text: "Disseminação de doenças como leptospirose" },
      { text: "Crescimento imediato da economia local" },
    ],
    correctAnswerIndex: 2,
  },
];

// DOM Elements
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const answerButtonsContainer = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const resultDiv = document.getElementById('result');
const startContainer = document.getElementById('start-container');
const questionTextElement = document.getElementById('question');
const restartBtn = document.getElementById('restart-btn');


// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let selectedButton = null;

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', handleNextQuestion); // Chamada direta para handleNextQuestion
restartBtn.addEventListener('click', restartQuiz);

// Functions
function startQuiz() {
  startContainer.classList.add('hidden');
  resultContainer.classList.add('hidden');
  questionContainer.classList.remove('hidden');
  nextBtn.classList.remove('hidden'); // Mostrar o botão Próxima
  nextBtn.textContent = 'Próxima Pergunta'; // Resetar texto do botão
  currentQuestionIndex = 0;
  score = 0;
  selectedButton = null;
  setNextQuestion();
}

function restartQuiz() {
  resultContainer.classList.add('hidden');
  startContainer.classList.remove('hidden');
  nextBtn.classList.add('hidden');
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(questionObj) {
  questionTextElement.textContent = questionObj.question;
  questionObj.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.classList.add('answer');
    button.textContent = answer.text;
    button.dataset.index = index;
    button.addEventListener('click', selectAnswer);
    answerButtonsContainer.appendChild(button);
  });
}

function resetState() {
  nextBtn.disabled = true; // Desabilitar até uma resposta ser selecionada
  selectedButton = null;
  answerButtonsContainer.dataset.answered = 'false'; // Resetar marcação de respondida
  while (answerButtonsContainer.firstChild) {
    answerButtonsContainer.removeChild(answerButtonsContainer.firstChild);
  }
}

function selectAnswer(e) {
  const newlySelectedButton = e.target;

  // Desmarcar o botão anteriormente selecionado, se houver
  if (selectedButton) {
    selectedButton.classList.remove('selected-answer');
    // Reverta aqui os estilos específicos que você aplicou para seleção
    selectedButton.style.backgroundColor = ''; // Exemplo: cor padrão do botão
    selectedButton.style.color = '';      // Exemplo: cor padrão do texto
    selectedButton.style.borderBottom = '';
  }

  // Marcar o novo botão selecionado
  newlySelectedButton.classList.add('selected-answer');
  // Aplique aqui os estilos para o botão selecionado
  newlySelectedButton.style.backgroundColor = '#3895ff'; // Exemplo: azul para selecionado
  newlySelectedButton.style.color = 'white';
  newlySelectedButton.style.borderBottom = '1px solid #7EBAFF';


  selectedButton = newlySelectedButton;
  nextBtn.disabled = false; // Habilitar o botão "Próxima"
}

function handleNextQuestion() {
  if (!selectedButton) return; // Segurança: não fazer nada se nenhum botão foi selecionado

  const selectedIndex = parseInt(selectedButton.dataset.index);
  const correctAnswerIndex = questions[currentQuestionIndex].correctAnswerIndex;

  // Verificar se a resposta selecionada é a correta
  if (selectedIndex === correctAnswerIndex) {
    score++;
    selectedButton.classList.add('correct-answer');
    selectedButton.style.backgroundColor = '#28a745'; // Verde para correto
    selectedButton.style.color = 'white';
  } else {
    selectedButton.classList.add('wrong-answer');
    selectedButton.style.backgroundColor = '#dc3545'; // Vermelho para incorreto
    selectedButton.style.color = 'white';

    // Opcional: Destacar a resposta correta se o usuário errou
    Array.from(answerButtonsContainer.children).forEach(button => {
      if (parseInt(button.dataset.index) === correctAnswerIndex) {
        button.classList.add('correct-answer'); // Adiciona a classe para o CSS
        button.style.backgroundColor = '#28a745'; // Verde para correto
        button.style.color = 'white';
      }
    });
  }

  // Desabilitar todos os botões de resposta para a pergunta atual
  Array.from(answerButtonsContainer.children).forEach(button => {
    button.disabled = true;
  });
  answerButtonsContainer.dataset.answered = 'true'; // Marcar que a pergunta foi respondida

  currentQuestionIndex++; // Incrementar para a próxima pergunta

  if (currentQuestionIndex < questions.length) {
    // Ainda há perguntas
    setNextQuestion(); // Configurar a próxima pergunta
  } else {
    // Fim do quiz
    showResult();
  }
}

function showResult() {
  questionContainer.classList.add('hidden');
  nextBtn.classList.add('hidden'); // Esconder o botão Próxima na tela de resultado
  resultContainer.classList.remove('hidden');
  resultDiv.innerHTML = `Você acertou <span id="score">${score}</span> de <span id="total-questions">${questions.length}</span> perguntas!`;
}

// Configuração inicial
nextBtn.classList.add('hidden'); // Ocultar o botão Próxima inicialmente

