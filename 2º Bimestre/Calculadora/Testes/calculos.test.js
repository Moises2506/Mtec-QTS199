/**
 * @jest-environment jsdom
 */

const { calcular } = require('../src/calculadora.js');


beforeEach(() => {
  document.body.innerHTML = `
    <input type="text" id="operacao" />
    <div id="resultado">0</div>
  `;
});

test('Deve calcular corretamente uma expressão', async () => {
  document.querySelector('#operacao').value = '2+3';

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ resultado: 5 }),
    })
  );

  await calcular();

  expect(global.fetch).toHaveBeenCalledWith(
    'http://localhost:3000/calcular',
    expect.any(Object)
  );
  expect(document.querySelector('#resultado').innerText).toBe(5);
});

test('Deve exibir alerta se o campo estiver vazio', async () => {
  document.getElementById('operacao').value = '';

  global.alert = jest.fn(); 

  await calcular();

  expect(global.alert).toHaveBeenCalledWith('Digite uma expressão antes de calcular!');
});

