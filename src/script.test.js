
describe('Testa a função score', () => {
  const escripito = require('../src/script');
  
  test('testa se a função score, ao receber um objeto com um array com parametro "JACK" retorna o valor 10', () => {
    let objArray = {
      firstChild: { 
        className: "JACK"
      }
    }

    escripito.score = jest.fn().mockImplementation((objeto) => {
      return  Array.from(objeto).reduce((acc, valor) => {
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
    });

    expect(escripito.score(objArray)).toBe('10');
    expect(1 + 1).toBe(2);
  })
  
  

  



})