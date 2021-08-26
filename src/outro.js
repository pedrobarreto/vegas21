
const tableLogic = (playerPoints, tablePoints) => {
  let cardCount = tableCardCount
  if(playerPoints > tablePoints && cardCount < 5){ //precisa de uma condicional pra player stand;
    const newCardTb = deckGet(g, 1);
    tableCards.appendChild(newCardTb);
    cardCount += 1;
  } 
}

const scoreFunc = (cartaValor) => {
  if(cartaValor === "JACK" || cartaValor === "QUEEN" || cartaValor === "KING"){
    return 10;
  }
  return parseInt(cartaValor);    
}

const somarPontos = () => {

}

const flipCard = () => { //isso só tem na minha branch
  const getCard = document.getElementById('player-card');
  getCard.addEventListener('click', (event) => {
    event.target.style.backgroundColor = ('rgb(238, 70, 70)');
    
  })
}

