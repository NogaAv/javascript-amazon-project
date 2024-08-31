import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
//import '../data/cart-oop-class.js'; //Testing this cart-oop.js code. This is another syntax to import code. This will run all the code in that file without importing anything.

//import '../data/backend-practice.js';
import { loadProducts } from '../data/products.js';

//Loading the products from backend server
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
