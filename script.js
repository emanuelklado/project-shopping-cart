const listCart = document.querySelector('.cart__items');
const addToCart = document.getElementsByClassName('item__add');
const clearCart = document.querySelector('.empty-cart');
const itemLi = document.getElementsByClassName('cart__item');
const listProducts = document.querySelector('.items');
const loadMsg = document.createElement('p');// criei fora para poder remover após carregamento.
const pTotal = document.querySelector('.total-price');
const sectionSelected = document.getElementsByClassName('selected');
const input = document.getElementById('pesquisa');
const iconCart = document.querySelector('.material-icons');
const divCart = document.querySelector('.cart');

// função de somar o carrinho de compras
function sum() {
const sumTotal = [];
for (let index = 0; index < itemLi.length; index += 1) {
  const itemCartPrice = (Number(itemLi[index].innerText.split('$')[1]));
  sumTotal.push(itemCartPrice);
}
 pTotal.innerText = `TOTAL R$ ${sumTotal.reduce((acum, el) => acum + el, 0).toFixed(2)}`;
}

function loading() {
  loadMsg.innerText = '';
  loadMsg.className = 'loading';
  listProducts.appendChild(loadMsg);
}
// cria miniaturas;
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
// add os produtos na pagina. (todas as sections)
function createProductItemElement({ id: sku, title: name, thumbnail: image, price }) {
  const section = document.createElement('section');
  const imageHD = image.replace('-I.jpg', '-J.jpg'); // traz imagem com qualidade superior. dica na monitoria de Daniel.
  section.className = 'item';
  const priceFormated = `R$ ${price.toFixed(2)}`;
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(imageHD));
  section.appendChild(createCustomElement('span', 'price-product', priceFormated));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// exclui as linhas e salva
function cartItemClickListener(event) {
  // event.target.remove();
  event.currentTarget.remove(); // pra pegar o pai (section) e deletar imagem junto.
  saveCartItems(listCart.innerHTML);
  sum();
}
// limpa o carrinho inteiro e salva
clearCart.addEventListener('click', () => {
  listCart.innerHTML = '';
  localStorage.removeItem('cartItems');
  sum();
  });

// cria a lista do carrinho.
function createCartItemElement({ thumbnail: img, id: sku, title: name, price: salePrice }) {
  const section = document.createElement('section');
  section.className = 'selected';
  const li = document.createElement('li');
  const imgMini = document.createElement('img');
  imgMini.src = img;
  section.appendChild(imgMini);
  li.className = 'cart__item';
  li.innerText = `COD: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  section.appendChild(li);
  section.addEventListener('click', cartItemClickListener);

  return section;
}

// cria as linhas, renderiza os itens e salva.
async function getIdElement(event) {
const id = event.target.parentNode.firstChild.innerText;
const item = await fetchItem(id);
listCart.appendChild(createCartItemElement(item));
saveCartItems(listCart.innerHTML);
sum();
}
// permite remover itens apos atualizar pagina
function removeLinesAfterLoading() {
for (let index = 0; index < itemLi.length; index += 1) {
  sectionSelected[index].addEventListener('click', cartItemClickListener);
}
}
// percorre os elementos e adiciona evento click em todos eles.(botões);
function catchID() {
  for (let index = 0; index < addToCart.length; index += 1) {
   addToCart[index].addEventListener('click', getIdElement); 
  }
}
// função generica recebendo o parametro de busca dos produtos.
async function renderProducts(product) {
  const products = await fetchProducts(product);
  products.forEach((element) => {
  listProducts.appendChild(createProductItemElement(element));
});
  catchID();
}
// evento do input para buscar novos produtos na API.
input.addEventListener('change', () => {
listProducts.innerHTML = '';
renderProducts(input.value);
});

function showCart() {
  if (divCart.style.display === 'none' || divCart.style.display === '') {
    divCart.style.display = 'flex';
  } else {
    divCart.style.display = 'none';
  }
}
iconCart.addEventListener('click', showCart);

window.onload = async () => {
  loading();
  setTimeout(() => {
    loadMsg.remove();
    renderProducts('computador');
    listCart.innerHTML = getSavedCartItems();
    removeLinesAfterLoading();
    sum();
  }, 1500);
};