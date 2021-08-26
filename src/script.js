const tableCards = document.querySelector('.table-cards');
const playerCards = document.querySelector('.player-cards');
const startBtn = document.getElementById('start');
const hitBtn = document.getElementById('hit');
let idDeck;

const deckDraw = async () => {
  const fetchDeck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
  const deckData = await fetchDeck.json();
  const deckid = deckData.deck_id;
  idDeck = deckid;

  const t = await table(1);
  const p = await player(2);
}

<<<<<<< HEAD
const flipCard = () => {
  const getCard = document.getElementById('player-card');
  getCard.addEventListener('click', (event) => {
    event.target.style.backgroundColor = ('rgb(238, 70, 70)');
    
  })
}

const deckGet = async (deckid, count) => { 
=======
const deckGet = async (deckid, count) => {
>>>>>>> 1b51032292129c4c3ae6397498e49b978fee4a64
  const fetchDeck = await fetch(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=${count}`)
  const deck = await fetchDeck.json();
  return deck.cards.map(({
    code,
    image,
    suit,
    value
  }, i) => {

    return createCards({
      code,
      image,
      suit,
      value,
      i
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
  i
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

<<<<<<< HEAD
  window.onload = async () => {
 g = await deckDraw();
    await table()
    await player()
  }
=======
const cardDrawPlayer = () => {
  player(1);
}

startBtn.addEventListener('click', deckDraw);
hitBtn.addEventListener('click', cardDrawPlayer);

window.onload = () => {}
>>>>>>> 1b51032292129c4c3ae6397498e49b978fee4a64
