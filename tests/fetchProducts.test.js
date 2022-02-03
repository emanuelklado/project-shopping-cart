require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('testa se é uma função!',() => {
    expect(typeof fetchProducts).toMatch('function');
  });
  it('testa se a função foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('testa o url/endpoint usado pelo fetch', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });
  it('testa se o retorno da função é uma estrutura de dados igual ao objeto computadorSearch', () => {
    expect(fetchProducts('computador')).resolves.toMatchObject(computadorSearch);
  });
  it('testa se ao chamar a função sem argumento ela retorna um erro com a mensagem "You must provide an url"', async () => {
    await expect(fetchProducts()).rejects.toEqual(new Error("You must provide an url"));
  });
});
