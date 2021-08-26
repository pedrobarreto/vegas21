const section = document.querySelector('.deck');
const btn = document.querySelector('.reShu');
const numCard = document.querySelector('.cardsNow');
const send = document.querySelector('.enviar');
const contagem = document.querySelector('.contagem');

const criarCartas = ({ image }) => {
    const novaSec = document.createElement('div');
    novaSec.className = 'novaCarta';
    const createImg = document.createElement('img');
    createImg.src = image;
    novaSec.appendChild(createImg);
    return novaSec;

}

const fetchDeck = async () => {
    const fetchDeck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    const deckData = await fetchDeck.json();
    console.log(deckData.deck_id);
    btn.addEventListener('click', () => {
        reShuffle(deckData.deck_id);
    });

    send.addEventListener('click', () => {
        const quantidade = numCard.value;
        fetchCall(deckData.deck_id, quantidade);
    })

};

const fetchCall = async (id, quant) => {
    const callApi = await fetch(`http://deckofcardsapi.com/api/deck/${id}/draw/?count=${quant}`);
    const apiJson = await callApi.json();
    apiJson.cards.forEach((card) => {
        section.appendChild(criarCartas({
            image: card.image
        }));
        console.log(card.value);

        if (section.children.length <= 6) {
            contagem.innerHTML = `Total de cartas : ${section.children.length}, Chamadas restantes: ${6 - section.children.length}`;
        } else {
            alert('cartas esgotadas');
        }



    });

};

const reShuffle = async (id) => {
    const reS = await fetch(`http://deckofcardsapi.com/api/deck/${id}/shuffle/`);
    const resJson = await reS.json();
    console.log(resJson.success);
}

//console.log(fetchDeck());
//fetchDeck();

window.onload = () => {
    fetchDeck();
    //fetchCall()
};