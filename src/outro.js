
const tableLogic = (playerPoints, tableCardCount, tablePoints) => {
  let cardCount = tableCardCount
  if(playerPoints > tablePoints && cardCount < 5){ //precisa de uma condicional pra player stand;
    const newCardTb = deckGet(g, 1);
    tableCards.appendChild(newCardTb);
  } 
  
}


const flipCard = () => { //isso só tem na minha branch
  const getCard = document.getElementById('player-card');
  getCard.addEventListener('click', (event) => {
    event.target.style.backgroundColor = ('rgb(238, 70, 70)');
    
  })
}

