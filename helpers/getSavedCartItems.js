// dica indicada por Adson Reis, não passava nos testes até esta mudança, porém, codigo anterior funciona perfeitamente mas não passa nos testes.
// Aparentemente os arquivos dos testes não acessam o DOM.

const getSavedCartItems = () => localStorage.getItem('cartItems');
  // const listCartSalva = document.querySelector('.cart__items');
  // const banco = localStorage.getItem('cartItems');
  // listCartSalva.innerHTML = banco;

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
