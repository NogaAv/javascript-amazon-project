import { cart, getTotalQuantity } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import formatCurrency from '../utils/money.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary() {
  //1. Save The Data (Model)
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1; //10% tax

  const totalCents = totalBeforeTaxCents + taxCents;

  //2. Generate the HTML (View)
  const paymentSummaryHTML = `
         <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items ${getTotalQuantity()}:</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}
            </div>
          </div>

          <button class="js-place-order place-order-button button-primary">Place your order</button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  //3. Make it Interactive (Controller)

  //Making the order btn interactive (last lesson):
  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
      //make a request to the backend to create the order
      //we need to send some data (the cart) to the backend
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });

      const order = await response.json(); //remember it also returns a promise, so we await it
      // console.log(order);
      addOrder(order);
    } catch (error) {
      console.log('Unexpected error. Try again later.');
    }

    //window.location - special object provided by js lets us control the URL at the top
    //of the browser.
    //if we change the location object, it will change the url at the top of webpage:
    window.location.href = 'orders.html'; //this will replace everything after the: / so we are forwarded to the page in url:  http://127.0.0.1:5501/orders.html
    //note: the 'file' is actually filepath and should be relative to the current checkout.html page, otherwise bad filepath will result with file not found
  });
}
