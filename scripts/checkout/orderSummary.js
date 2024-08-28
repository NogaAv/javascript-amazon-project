import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products } from '../../data/products.js'; //'Naming export' = import {somefuncName} from ''
import formatCurrency from '../utils/money.js';
// import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //Default export, no need for{}
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { getProduct } from '../../data/products.js';
import { renderPaymentSummary } from './paymentSummary.js';

// hello();

//function from the 'dayjs' lib we added to checkout.html script tag.
//See documentation to learn about how to use the lib
// const today = dayjs();
// const delivaryDate = today.add(7, 'days');
// console.log(delivaryDate.format('dddd, MMMM D'));

export function renderOrderSummary() {
  let cartSummaryHTML = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    //   let matchingProduct = products.find((product) => product.id === productId);

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
        <div class="cart-item-container 
                js-cart-item-container  
                js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">Delivery date: ${dateString}</div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image" src=${matchingProduct.image} />
    
                  <div class="cart-item-details">
                    <div class="product-name">${matchingProduct.name}</div>
                    <div class="product-price">$${matchingProduct.getPrice()}</div>
                    <div class="js-product-quantity-${matchingProduct.id} product-quantity">
                      <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
                      <span class="update-quantity-link link-primary"> Update </span>
                      <span class="js-delete-link-${matchingProduct.id} js-delete-link delete-quantity-link link-primary" data-product-id=${cartItem.productId}> Delete </span>
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">Choose a delivery option:</div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                  </div>
                </div>
              </div> 
        `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = ``;

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `<div class="js-delivery-option delivery-option"
                  data-product-id="${matchingProduct.id}"
                  data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked && 'checked'} class="delivery-option-input" name="delivery-option-${matchingProduct.id}" />
                <div>
                  <div class="delivery-option-date">${dateString}</div>
                  <div class="delivery-option-price">${priceString} Shipping</div>
                </div>
              </div>`;
    });

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
      const productId = deleteLink.dataset.productId;
      removeFromCart(productId);

      //Updating the HTML after the removal of products:
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      //This delivery option will make changes to several elements in the page:
      //to the Delivery date title, and to the Order Summary where the cost is updated.
      //This is why we better re-run the whole function that renders the page as whole:
      renderOrderSummary(); //RECURSION
      renderPaymentSummary();
    });
  });
}

//Instead of using the DOM and change the elements directly, we re-run the code to
//build the page again whenever it is updated.
