//with export: this variable can be accessed outside cart.js
export let cart;

loadFromStorage();

export function loadFromStorage() {
  //If the cart is empty we don't want the localStorage to return null, so we give default
  // return JSON.parse(localStorage.getItem('cart')) || [];

  cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
    //we create default values to make the development easier when we reproduce this page:
    cart = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
      },
    ];
  }
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1', //for new products the default is 1
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
  // cart.forEach((cartItem, index) => {
  //   if (cartItem.productId === itemId) {
  //     console.log(cart.splice(index, 1));
  //   }
  // });
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function getTotalQuantity() {
  let itemsCount = 0;
  cart.forEach((cartItem) => (itemsCount += cartItem.quantity));
  return itemsCount;
}
