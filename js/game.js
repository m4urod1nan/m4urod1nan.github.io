const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'cachorro',
  'cao',
  'cat',
  'coelho',
  'gato',
  'hamster',
  'jabuti',
  'peixe',
  'rato',
  'salamandra',
  'tartaruga'


];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 22) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}




let isTimerPaused = false;
let timerInterval;

const pauseTimer = () => {
  isTimerPaused = !isTimerPaused;
}

const startTimer = () => {
  let currentTime = 0;
  timerInterval = setInterval(() => {
    if (!isTimerPaused) {
      currentTime += 1;
      timer.innerHTML = currentTime < 10 ? `0${currentTime}` : currentTime;
    }
  }, 1000);
}

const pausarButton = document.querySelector('.botao-pausar');
pausarButton.addEventListener('click', togglePauseResume);

function togglePauseResume() {
  isTimerPaused = !isTimerPaused;
  const buttonText = pausarButton.textContent.trim();

  if (isTimerPaused) {

    pausarButton.textContent = 'Retomar Partida';
    
  } else {

    pausarButton.textContent = 'Pausar';
  }
}

const restartGame = () => {


  // Limpar o estado atual do jogo (por exemplo, cartas reveladas, variáveis de estado)
  firstCard = '';
  secondCard = '';
  isTimerPaused = false; // testa se o timer não esta pausado!
  clearInterval(timerInterval); // Limpa o intervalo do timer atual
  timer.innerHTML = '00'; // Reinicia o timer para 00

  // Remove todas as cartas do tabuleiro
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.remove());

  // Embaralha as cartas novamente e inicia o timer do zero!
  loadGame();
  startTimer();
}

// Adiciona um evento  ao botão "Reiniciar"
const reiniciarButton = document.querySelector('.botao-reiniciar');
reiniciarButton.addEventListener('click', restartGame);



window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
