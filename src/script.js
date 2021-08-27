const tableCards = document.querySelector('.table-cards');
const playerCards = document.querySelector('.player-cards');
const startBtn = document.getElementById('start');
const hitBtn = document.getElementById('hit');
const stdBtn = document.getElementById('stand');
const overlay = document.getElementById('overlay');
const messageDiv = document.querySelector('.message-div');
const messageContent = document.querySelector('.message-content');
const maravilhosoAudio = new Audio('sounds/MARAVILHOSO.mp4');
const marioDiesAudio = new Audio('sounds/mario_dies.wav');

let idDeck;
let tableScore = 0;
let playerScore = 0;

const deckDraw = async () => {
  const fetchDeck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
  const deckData = await fetchDeck.json();
  const deckid = deckData.deck_id;
  idDeck = deckid;
  startBtn.disabled = true;
  hitBtn.disabled = false;
  stdBtn.disabled = false;

  await table(1);
  await player(2);
  
 tableScore = score(tableCards);
 playerScore = score(playerCards);
 if (playerScore > 21) {
 showMessage('Perdeu, já era', marioDiesAudio);
 } else if (playerScore === 21) {
 showMessage('BLACKJACK!!!', maravilhosoAudio);
 }
}

const deckGet = async (deckid, count) => {
  const fetchDeck = await fetch(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=${count}`)
  const deck = await fetchDeck.json();
  return deck.cards.map(({
    code,
    image,
    suit,
    value
  }) => {

    return createCards({
      code,
      image,
      suit,
      value,
      
    });
  })
}

const table = async (n) => {
  const cardTb = await deckGet(idDeck, n)
  cardTb.forEach((card) => {
    tableCards.appendChild(card)
  })
}

const player = async (n) => {
  const cardTb = await deckGet(idDeck, n)
  return cardTb.forEach((card) => {
    playerCards.appendChild(card)
  })
}

function createCards({
  code,
  image,
  suit,
  value,
}) {

  const section = document.createElement('section');
  section.className = `card-${code}`;
  section.appendChild(createCustomElement('span', value));
  section.appendChild(createCustomElement('span', suit));
  section.appendChild(createCardImageElement(image));

  return section;
}

function createCardImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'card__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className) {
  const e = document.createElement(element);
  e.className = className;
  return e;
}

const cardDrawPlayer = async () => {
  await player(1);
  playerScore = score(playerCards);
  playerVerify();
  if (playerCards.children.length === 5) {
    hitBtn.disabled = true;
  }
}

const score = (quem) => {
 return Array.from(quem.children).reduce((acc, valor) => {
  let somar = 0;
  if (valor.firstChild.className === "JACK" || valor.firstChild.className === "QUEEN" 
  || valor.firstChild.className === "KING") {
    somar = 10;
  } else if (valor.firstChild.className === 'ACE') {
    somar = 11;
  } else somar = parseInt(valor.firstChild.className);
  acc += somar;
  return acc;
  }, 0);
}

const showMessage = (message, audio) => {
  overlay.className = 'active';
  messageDiv.classList.add('active');
  messageContent.innerText = message;
  audio.play();
} 

overlay.addEventListener('click', () => {
  overlay.classList.remove('active');
  messageDiv.classList.remove('active');
  restartGame();
})

const restartGame = async () => {
  tableCards.innerHTML = '';
  playerCards.innerHTML = '';
  messageContent.innerHTML = '';
  startBtn.disabled = true;
  hitBtn.disabled = false;
  stdBtn.disabled = false;
  await table(1);
  await player(2);
  playerScore = score(playerCards);
  tableScore = score(tableCards);
}

const tableLogic = async () => {
   for(let i = 0; i < 5; i += 1) {
    if (playerScore >= tableScore && tableCards.children.length < 5){ //precisa de uma condicional pra player stand;
      await table(1);
      tableScore = score(tableCards);
    };
  }
  compare();
}

const compare = () => {
  if(playerScore > tableScore){
    showMessage('Você ganhou! MARAVILHOSO', maravilhosoAudio);
  } else if(playerScore === tableScore) {
    showMessage('EMPATOU! JOGUE NOVAMENTE', marioDiesAudio); 
  } else if (tableScore > 21){
    showMessage('A mesa estourou!', maravilhosoAudio);
  } else {
    showMessage('Você perdeu, passe o dinheiro!', marioDiesAudio);
  }
}

const playerVerify = () => {
  if (playerScore > 21) {
    showMessage('Perdeu, já era', marioDiesAudio);
  } 
  if (playerScore === 21) {
    showMessage('BLACKJACK!!!', maravilhosoAudio);
  }
}

stdBtn.addEventListener('click', tableLogic)
startBtn.addEventListener('click', deckDraw);
hitBtn.addEventListener('click', cardDrawPlayer);

window.onload = () => {}