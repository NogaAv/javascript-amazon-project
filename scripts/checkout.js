import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
//import '../data/cart-oop-class.js'; //Testing this cart-oop.js code. This is another syntax to import code. This will run all the code in that file without importing anything.

//import '../data/backend-practice.js';

//we updated the code to use loadProductsFetch() which uses promises, instead of loadProducts which uses callbacks:
import { loadProducts, loadProductsFetch } from '../data/products.js';

import { loadCart } from '../data/cart.js'; //practice: see how callback-hell created without Promise

//Async await:
//async = makes a function return a promise.
//here- first we load the products, then we load the cart.
async function loadPage() {
  //console.log('load page');

  //loadProductsFetch().then(() => {})  //regular promise '.then()' call
  try {
    //throw 'error1'; //manually creating error.it will skip the code and get to the catch() block
    await loadProductsFetch(); //await waits for the response to finish before going to next line. await only works with promise.

    //await can only be used with promise (not callback)
    const value = await new Promise((resolve, reject) => {
      //throw 'error2'; //if we await a promise(like here), instead of going to .catch(), it goes to catch() block of the try/catch
      loadCart(() => {
        //to throw error here which is in the future, we use reject().
        //(not 'throw' since it cannot run in future)
        /*reject('error3'); //it will run the code inside the catch() block*/
        resolve();
      });
    });
  } catch (error) {
    console.log('Unexpected error. Please try again later.' + error);
  }
  renderOrderSummary();
  renderPaymentSummary();

  //return 'value2'; //this gets converted to: resolve('value2')
}
loadPage();

/*
//since promise is returned we can call .then()
loadPage().then((value) => {
  console.log('next step');
  console.log('value2');
});
*/

/*
//Promise.all()
//---------------
//loading the products and the cart togather at the same time, using Promise.all()
//Promise.all() wait for ALL of the loadings to finish
//we basically create array of Promises, and give it to Paromise.all(), and it will
//wait to all promises to finish before going to the next step.
//To add next step we add .then() at the end of the Promis.all([..]).then()
//Note: we can pass values as arg in the resolve() of every Promise, and in .then() we
//recieve them as array of values
Promise.all([
  /* //we changed this load Products() to use fetch with loadProductsFetch()

  new Promise((resolve) => {
      loadProducts(() => {
        resolve('value1');
      });
    }),
  */
/*

  loadProductsFetch(), //this returns promise, se we can use it inside Promise.all()
  new Promise((resolve) => {
    //once loadCart is finish, the passed arrow-function is called and inside it we call resolve() in order to move to the next step.
    loadCart(() => {
      resolve('value2'); //go to next step (to next '.then()' if exist)
    });
  }),
]).then((values) => {
  console.log(values); //['value1', 'value2']
  //next step - after products and cart loaded from server (simultenious), we render page
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*

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

*/
