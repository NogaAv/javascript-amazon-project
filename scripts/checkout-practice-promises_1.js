import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
//import '../data/cart-oop-class.js'; //Testing this cart-oop.js code. This is another syntax to import code. This will run all the code in that file without importing anything.

//import '../data/backend-practice.js';
import { loadProducts } from '../data/products.js';

//Using Promises (these are built-in class):
//When we create Promise object we must give it a function. and-
//It's going to run this function IMMEDIATELY (by libuv )
//1'st param:'resolve' which is a function that lets us control when to go to the next step.
new Promise((resolve) => {
  console.log('start promise'); //immediately logs to webpage.
  //This callback arrow function runs immediately BY OTHER OUTER THREAD, and so the js thread next step is the code after this 'new Promise()' call
  //console.log('promise'); //immediately logs 'promise' to webpage.

  //let us call the async code: loadProducts():
  loadProducts(() => {
    console.log('finished loading');
    resolve(); //acts like jasmine's done() function. When loadProducts finishes, resolve() called and makes the Promise go to the next step which is the .then() method.
  });
}).then(() => {
  //.then() called by resolve() and adds a NEXT STEP to a promise
  console.log('next step');
});

/*
//Loading the products from backend server
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/
