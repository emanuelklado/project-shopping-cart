require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('testa se é uma função!',() => {
    expect(typeof fetchItem).toMatch('function');
  });
  it('testa se a função foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('testa o url/endpoint usado pelo fetch', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  });
  it('testa se o retorno da função é uma estrutura de dados igual ao objeto item', () => {
    expect(fetchItem('MLB1615760527')).resolves.toMatchObject(item);
  });
  it('testa se ao chamar a função sem argumento ela retorna um erro com a mensagem "You must provide an url"', async () => {
    await expect(fetchItem()).rejects.toEqual(new Error("You must provide an url"));
  });
});
