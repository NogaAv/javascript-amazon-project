import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
//import '../data/cart-oop-class.js'; //Testing this cart-oop.js code. This is another syntax to import code. This will run all the code in that file without importing anything.

//import '../data/backend-practice.js';
import { loadProducts } from '../data/products.js';

import { loadCart } from '../data/cart.js'; //practice: see how callback-hell created without Promise

/*
//Loading the products from backend server (Using Promise)
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

//We demonstrate here how Promises solves the callback nesting hell problem:
//NOTE: after the loadingProducts finish and resolve() calls .then(), we want to call loadCart().
//The problem is: inside .then() we don't have resolve() to indicate end of run like we have inside Promise callback method.
//So- we will create inside .then() a new Promise to have another resolve() call, and return it

//Loading the products from backend server (Using Promise)
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1'); //go to next step (i.e- 'then()'). resolve arg lets us share a value between 2 steps of a Promise, since it will get passed to the .then() as argument
  });
}).then((value) => {
  console.log(value); //'value1'
  //inside .then(), if we want to use resolve() to wait for some code to finish, we can return a new Promise:
  return new Promise((resolve) => {
    //once loadCart is finish, the passed arrow-function is called and inside it we call resolve() in order to move to the next step.
    loadCart(() => {
      resolve(); //go to next step (to next '.then()' if exist)
    });
  }).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});

/*
//Loading the products from backend server (Using callbacks)
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
//Demonstrating using nesting callback (callback-hell):
//Loading the cart and then the products from backend server
//So now, this code will load the products, wait for it to finish and then will load the cart,
//waits for it to finish, and then render the page.
//We added layer of nesting. The problem: If we have lots of callbacks, our code will become more and more nested. So, Promises let us solve this problem by FLATTEN our code.
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary(); //we need this to run AFTER the cart is loaded, so moved inside loadCart
    renderPaymentSummary();
  });
});
*/
