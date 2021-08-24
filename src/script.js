const deckDraw = async () => { 
const fetchDeck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
const deckData = await fetchDeck.json();
console.log(deckData);
const deckid = deckData.deck_id;
console.log(deckid);
}
window.onload =() => {
deckDraw();
}