import { cart, addToCart } from '../data/cart.js';
import formatCurrency from '../scripts/utils/money.js';
/*
  //Another way to import: Import all the file content and rename, them I can access any func or variable:

  import * as cartModule from '../data/cart.js';
  cartModule.addToCart('id');
  cartModule.cart;
*/

import { products } from '../data/products.js';
//Data Structure:
// const products = [
//   {
//     image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating: {
//       stars: 4.5,
//       count: 87,
//     },
//     priceCents: 1090,
//   },
//   {
//     image: 'images/products/intermediate-composite-basketball.jpg',
//     name: 'Intermediate Size Basketball',
//     rating: {
//       stars: 4,
//       count: 127,
//     },
//     priceCents: 2095,
//   },
//   {
//     image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name: 'Adults Plain Cotton T-Shirt - 2 Pack',
//     rating: {
//       stars: 4.5,
//       count: 56,
//     },
//     priceCents: 799,
//   },
//   {
//     image: 'images/products/black-2-slot-toaster.jpg',
//     name: '2 Slot Toaster - Black',
//     rating: {
//       stars: 5,
//       count: 2197,
//     },
//     priceCents: 1899,
//   },
// ];

// const starsImg = {
//   _40: 'images/ratings/rating-40.png',
//   _45: 'images/ratings/rating-45.png',
//   _50: 'images/ratings/rating-50.png',
// };

//Looping through the array:
let productsHTML = '';
products.forEach((product, index) => {
  //console.log(index, product);
  productsHTML += `
    <div class="product-container">
    <div class="product-image-container">
      <img class="product-image" src=${product.image} />
    </div>

    <div class="product-name limit-text-to-2-lines">${product.name}</div>

    <div class="product-rating-container">
      <img class="product-rating-stars" src="${product.getStarsUrl()}" />
      <div class="product-rating-count link-primary">${product.rating.count}</div>
    </div>

    <div class="product-price">$${product.getPrice()}</div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png" />
      Added
    </div>

    <button class="js-add-to-cart add-to-cart-button button-primary" data-product-id="${product.id}">Add to Cart</button>
  </div>`;
});

//console.log(productsHTML);
document.querySelector('.js-products-grid').innerHTML = productsHTML;

//In case we already have items in cart, we update the cart icon quantity:
updateCartQuantity();

//We will not move this function to the cart.js file, because this function updates the webpage,
//and not the cart itself.
function updateCartQuantity() {
  //update cart quantity in up-right corner of amazon.html page:
  let cartQuantity = 0;
  cart.forEach((cartItem) => (cartQuantity += cartItem.quantity));
  document.querySelectorAll('.cart-quantity').forEach((cartQuant) => {
    cartQuant.innerText = cartQuantity;
  });
}

//Adding Event listener to 'Add to cart' button:
document.querySelectorAll('.js-add-to-cart').forEach((addBtn) => {
  addBtn.addEventListener('click', (event) => {
    //console.log(addBtn.dataset); //gives us all the data-attributes attached to that element as object: {productName: "Adults Plain Cotton T-Shirt - 2 Pack"}

    const productId = addBtn.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
});
