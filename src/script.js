const tableCards = document.querySelector('.table-cards');
const playerCards = document.querySelector('.player-cards');
let g;

const deckDraw = async () => { 
const fetchDeck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
const deckData = await fetchDeck.json();
const deckid = deckData.deck_id;
return deckid;
}

const flipCard = () => {
  const getCard = document.getElementById('player-card');
  getCard.addEventListener('click', (event) => {
    event.target.style.backgroundColor = ('rgb(238, 70, 70)');
    
  })
}

const deckGet = async (deckid, count) => { 
  const fetchDeck = await fetch(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=${count}`)
  const deck = await fetchDeck.json();
 return deck.cards.map(({ code, image, suit, value }, i) => {

 return createCards({ code, image, suit, value, i});
  })
}

const table = async () => { 
  const count = 5;
   const  cardTb = await deckGet(g, count)
   cardTb.forEach((card) => {
     tableCards.appendChild(card)
   })
  }

   const player = async () => { 
    const count = 2;
    const  cardTb = await deckGet(g, count)
   return cardTb.forEach((card) => {
      playerCards.appendChild(card)
    })
  }

    function createCards({ code, image, suit, value, i}) {
      console.log(i)
     
       const section = document.createElement('section');
      section.className = `card-${code}`;
      section.style.zIndex = i + 1
      section.style.left = (i * 90 ) + 'px'
      section.style.position = 'absolute'
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

  window.onload = async () => {
 g = await deckDraw();
    await table()
    await player()
  }
