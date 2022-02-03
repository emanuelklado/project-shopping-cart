const saveCartItems = (input) => {
  localStorage.setItem('cartItems', input);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
