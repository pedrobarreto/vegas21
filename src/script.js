const { moduleExpression } = require("@babel/types");

const tableCards = document.querySelector('.table-cards');
const playerCards = document.querySelector('.player-cards');
const startBtn = document.getElementById('start');
const hitBtn = document.getElementById('hit');
const stdBtn = document.getElementById('stand');
let idDeck;
let tableScore = 0;
let playerScore = 0;

const deckDraw = async () => {
  const fetchDeck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
  const deckData = await fetchDeck.json();
  const deckid = deckData.deck_id;
  idDeck = deckid;

  const t = await table(1);
  const p = await player(2);
  
 tableScore = score(tableCards);
 playerScore = score(playerCards);
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

const tableLogic = async () => {
   for(let i = 0; i < 5; i += 1) {
    if (playerScore >= tableScore && tableCards.children.length < 5){ //precisa de uma condicional pra player stand;
      await table(1);
      console.log(playerScore);
      tableScore = score(tableCards);
    };
    
  }
  if(playerScore > tableScore){
    console.log('Você ganhou! MARAVILHOSO');
  } else if(playerScore === tableScore) {
    console.log('EMPATOU! JOGUE NOVAMENTE');
  } else if (tableScore > 21){
    console.log('A mesa estourou!');
  } else {
    console.log('Você perdeu, passe o dinheiro!');
  }
}

const victoryDefeat = () => {
  if(playerScore !== 21 && playerScore < 21) {
    tableLogic()
  } else if (playerScore === 21) {
    console.log("BLACKJACK!!!");
  } else console.log('Perdeu, já era');
}


const standFunc = () => {
  victoryDefeat();
}

stdBtn.addEventListener('click', standFunc);
startBtn.addEventListener('click', deckDraw);
hitBtn.addEventListener('click', cardDrawPlayer);

window.onload = () => {}

module.exports = { score};