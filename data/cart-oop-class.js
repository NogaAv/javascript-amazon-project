//OOP = We group our data and functions togather into object
//Here, We use Class to create objects.
//The Class Cart() is a blueprint for creating cart objects.

//Naming convention:
//Use 'PascalCase' for things that generate objects.
//PascalCase = start every word with a capital.

//class has different syntax than object:
//  In properties: '=' instead of ':' and ';' at end instead of ','
//  In functions: no need for ',' at end of function
//  We create object from class using 'new' keyword

class Cart {
  //cartItems = undefined;
  cartItems;
  //'localStorageKey' can not be passed as parameter like in the function version. so we add it as property:
  // localStorageKey = undefined;
  #localStorageKey; //# - makes it a - 'private property' (as opposed to 'public property')

  //Ctor- unique function that is called automatically when an object is created
  constructor(localStorageKey) {
    //At this stage = the object already created
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage(); //This method should only be called from inside the class, so private
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    if (!this.cartItems) {
      this.cartItems = [
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

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
  addToCart(productId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1', //for new products the default is 1
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

//In class = We need to use the 'new' keyword for creating object from class
//Without constructor- We need to manually set this property after creating object.
//    const cart = new Cart();
//    cart.localStorageKey = 'cart-oop';
//and we need to set up rest of code:
//    cart.loadFromStorage();

//With constructor:
const cart = new Cart('cart-oop'); //we send parameters for constructor in this ()

//Using OOP and function to create object- We easily create new cart for business
const businessCart = new Cart('cart-business');

//for TESTINGS:
cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
console.log(cart);

//for TESTINGS:
// businessCart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
console.log(businessCart);

//With class - We can also check if an object is an Instance of a class:
console.log(cart instanceof Cart); //true
console.log(businessCart instanceof Cart); //true

//This code is problematic. To prevent this we use private properties and methods:
// cart.localStorageKey = 'aaa';

// cart.#localStorageKey = 'test'; //in console: 'SyntaxError: Private field '#localStorageKey' must be declared in an enclosing class'
