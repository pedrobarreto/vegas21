const tableCards = document.querySelector('.table-cards');
const playerCards = document.querySelector('.player-cards');
const startMenu = document.querySelector('.menu-start');
const playerMenu = document.querySelector('.menu');
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

// cria a imagem da carta
function createCardImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'card__image';
  img.src = imageSource;
  return img;
}

// cria um elemento que armazena o numero e naipe da carta
function createCustomElement(element, className) {
  const e = document.createElement(element);
  e.className = className;
  return e;
}

// ela verifica se o player ja ganhou ou perdeu
const playerVerify = () => {
  if (playerScore > 21) {
    showMessage('Perdeu, já era', marioDiesAudio, 'no1.gif');
  } else if (playerScore === 21) {
    showMessage('BLACKJACK!!!', maravilhosoAudio, 'win1.gif');
  }
}

// soma o score da mesa ou do player, dependendo do parametro 'quem'
const score = (quem) => {
  return Array.from(quem.children).reduce((acc, valor) => {
    let somar = 0;
    if (valor.firstChild.className === "JACK" || valor.firstChild.className === "QUEEN" ||
    valor.firstChild.className === "KING") {
      somar = 10;
    } else if (valor.firstChild.className === 'ACE') {
      somar = 11;
    } else somar = parseInt(valor.firstChild.className);
    acc += somar;
    return acc;
  }, 0);
}

// mostra na tela uma mensagem,  gif e audio de vitoria ou derrota
const showMessage = (message, audio, gif) => {
  overlay.className = 'active';
  messageDiv.classList.add('active');
  const img = document.createElement('img');
  const h2 = document.createElement('h3');
  h2.innerText = message;
  img.className = 'msg__img';
  img.src = gif;
  messageContent.appendChild(img)
  messageContent.appendChild(h2)
  audio.play();
}

// começa um novo jogo, com o mesmo deck
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
  playerVerify();
}

// quando clicar na tela, chama a funçao de resetar o game 
overlay.addEventListener('click', () => {
  overlay.classList.remove('active');
  messageDiv.classList.remove('active');
  restartGame();
})

// verifica quem ganhou
const compare = () => {
  if (playerScore > tableScore) {
    showMessage('Você ganhou! MARAVILHOSO', maravilhosoAudio, 'win1.gif');
  } else if (playerScore === tableScore) {
    showMessage('EMPATOU! JOGUE NOVAMENTE', marioDiesAudio, 'no1.gif');
  } else if (tableScore > 21) {
    showMessage('Você ganhou! MARAVILHOSO', maravilhosoAudio, 'win2.gif');
  } else {
    showMessage('Você perdeu, passe o dinheiro!', marioDiesAudio, 'no2.gif');
  }
}

// chama as funcoes para criar a carta e mostrar na mesa
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

// pega um numero determinado de cartas no deck que possui o ID que foi pego pela funcao deckDraw  
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

// chama a funcao para pegar a quantidade certa de cartas para mesa e adiona elas na tela
const table = async (n) => {
  const cardTb = await deckGet(idDeck, n)
  cardTb.forEach((card) => {
    tableCards.appendChild(card)
  })
}

// chama a funcao para pegar a quantidade certa de cartas para o player e adiona elas na tela
const player = async (n) => {
  const cardTb = await deckGet(idDeck, n)
  return cardTb.forEach((card) => {
    playerCards.appendChild(card)
    TweenMax.staggerTo(".player-cards", 1, {
      rotation: 360,
      y: 100
    }, 0.5);
  })
}

// inteligencia artificial do dealer
const tableLogic = async () => {
  for (let i = 0; i < 5; i += 1) {
    if (playerScore >= tableScore && tableCards.children.length < 5) { //precisa de uma condicional pra player stand;
      await table(1);
      tableScore = score(tableCards);
    };
  }
  compare();
}

// o player compra mais uma carta e ja atualiza o seu score (botao hit)
const cardDrawPlayer = async () => {
  await player(1);
  playerScore = score(playerCards);
  playerVerify();
  if (playerCards.children.length === 5) {
    hitBtn.disabled = true;
  }
}

// funçao que faz a requisiçao, na API deckOfCards, de um novo deck e devolve o ID dele
const deckDraw = async () => {
  const fetchDeck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
  const deckData = await fetchDeck.json();
  const deckid = deckData.deck_id;
  idDeck = deckid;
  startBtn.disabled = true;
  hitBtn.disabled = false;
  stdBtn.disabled = false;
  startMenu.style.display = 'none';
  playerMenu.style.display = 'flex';

  await table(1);
  await player(2);

  tableScore = score(tableCards);
  playerScore = score(playerCards);
}

// ecutadores de eventos  
stdBtn.addEventListener('click', tableLogic);
startBtn.addEventListener('click', deckDraw);
hitBtn.addEventListener('click', cardDrawPlayer);

window.onload = () => {}