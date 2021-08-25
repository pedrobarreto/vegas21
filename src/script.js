const tableCards = document.querySelector('.table-cards');
const playerCards = document.querySelector('.player-cards');
let g;

const deckDraw = async () => { 
const fetchDeck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
const deckData = await fetchDeck.json();
const deckid = deckData.deck_id;
return deckid;
}





const deckGet = async (deckid, count) => { 
  const fetchDeck = await fetch(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=${count}`)
  const deck = await fetchDeck.json();
 return deck.cards.map(({ code, image, suit, value }) => {
  // createCards({ image, suit, value }); 
 return createCards({ code, image, suit, value });
  })
}

const table = async () => { 
   const  cardTb = await deckGet(g, 5)
   console.log(cardTb)
   cardTb.forEach((card) => {
     tableCards.appendChild(card)

   })
  }

   const player = async () => { 
    const  cardTb = await deckGet(g, 1)
    console.log(cardTb)
    cardTb.forEach((card) => {
      playerCards.appendChild(card)
 
    })
  }
  // tableCards.appendChild(deckGet(g, 4));


  

//   const player = () => { 
//     playerCards.appendChild(deckGet(1));
//     }
//     player();



    function createCards({ code, image, suit, value }) {
      const section = document.createElement('section');
      section.className = 'card';
      section.appendChild(createCustomElement('span', 'card__value', value));
      section.appendChild(createCustomElement('span', 'card__suit', suit));
      section.appendChild(createCardImageElement(image));
    
      return section;
    }

    function createCardImageElement(imageSource) {
      const img = document.createElement('img');
      img.className = 'card__image';
      img.src = imageSource;
      return img;
    }


function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

  window.onload = async () => {
 g = await deckDraw();
await  table()
await player()

  }