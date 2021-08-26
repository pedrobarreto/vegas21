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

const deckGet = async (deckid, count) => {
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

const cardDrawPlayer = () => {
  player(1);
}

startBtn.addEventListener('click', deckDraw);
hitBtn.addEventListener('click', cardDrawPlayer);

window.onload = () => {}