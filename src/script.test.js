describe('Testa a função score', () => {
  const falsao = ((objeto) => {
    return objeto.reduce((acc, valor) => {
      let somar = 0;
      if (valor.firstChild.className === "JACK" || valor.firstChild.className === "QUEEN" ||
        valor.firstChild.className === "KING") {
        somar = 10;
      } else if (valor.firstChild.className === 'ACE') {
        somar = 11;
      } else somar = parseInt(valor.firstChild.className);
      acc += somar;
      return acc;
    }, 0);
  });

  test('testa se a função score, ao receber um objeto com um array com parametro "JACK" retorna o valor 10', () => {
    const objArray = [{
      firstChild: {
        className: "JACK"
      }
    }, ]

    expect(falsao(objArray)).toBe(10);
  });

  test('testa se a função score soma valores de varias cartas e retorna esse valor ao final', () => {
    const objArray2 = [{
        firstChild: {
          className: "4"
        }
      },
      {
        firstChild: {
          className: "4"
        }
      },
      {
        firstChild: {
          className: "QUEEN"
        }
      }
    ]
    expect(falsao(objArray2)).toBe(18);
  })

  test('Converte os valores de "QUEEN" e "KING no valor 10 e soma os valores', () => {
    const objArray3 = [{
      firstChild: {
        className: "KING"
      }
    },
    {
      firstChild: {
        className: "QUEEN"
      }
    },]
    expect(falsao(objArray3)).toBe(20);
  })


})