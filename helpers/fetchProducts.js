const fetchProducts = async (product) => {
  try {
     const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const response = await fetch(url);
    const objeto = await response.json();
    return objeto.results;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};
console.log(fetchProducts('computador'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
