const fetchItem = async (item) => {
try {
  const url = `https://api.mercadolibre.com/items/${item}`;
  const response = await fetch(url);
  const objItem = await response.json();
  return objItem;
 } catch (error) {
  throw new Error('You must provide an url');
 }
};
console.log(fetchItem('MLB1341706310'));
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
