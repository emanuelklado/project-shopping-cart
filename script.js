const listCart = document.querySelector('.cart__items');
const addToCart = document.getElementsByClassName('item__add');
const clearCart = document.querySelector('.empty-cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// exclui as linhas e salva
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(listCart.innerHTML);
}
// limpa o carrinho inteiro e salva
clearCart.addEventListener('click', () => {
  listCart.innerHTML = '';
  localStorage.removeItem('cartItems');
  });

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);

  return li;
}
// cria as linhas, renderiza os itens e salva.
async function getIdElement(event) {
const id = event.target.parentNode.firstChild.innerText;
const item = await fetchItem(id);
listCart.appendChild(createCartItemElement(item));
saveCartItems(listCart.innerHTML);
}

function catchID() {
  for (let index = 0; index < addToCart.length; index += 1) {
   addToCart[index].addEventListener('click', getIdElement); 
  }
}

window.onload = async () => {
  // passando o obj retornado da função fetchProducts
  const products = await fetchProducts('computador');
  const listProducts = document.querySelector('.items');
  // passando cada elemento do obj como paramentro da função que cria os produtos.
  products.forEach((element) => {
    listProducts.appendChild(createProductItemElement(element));
  });
  catchID();
  getSavedCartItems();
  listCart.innerHTML = getSavedCartItems();
};
