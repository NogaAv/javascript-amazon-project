import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage, cart } from '../../data/cart.js';

/*
renderOrderSummary() creates part of the checkout page. 
When we test page we have 2 things to test:
1. How the page looks
2. How the page behaves
*/
describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  //'beforeEach' Hook: now before each of our test, this function is run. It's a greate way to share setup code
  beforeEach(() => {
    //When the it('remove a product') test runs orderSummary.js code, it also runs in it the function removeFromCart(productId), which saves to localStorage the cart after deleting item.
    //It is recommended to NOT modify localStorage in our tests.
    //Therefore- we should also mock localStorage.setItem() in this deletion test
    spyOn(localStorage, 'setItem');

    //Make note: I need to add here to .innerHTML:  <div class="js-payment-summary"></div>
    //because: renderOrderSummary() calls renderPaymentSummary() and the last runs the code:
    //  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    //so to not get an error in jasmine since the innerHtml is null, we need to add the div it looks for.
    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
`;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1',
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2',
        },
      ]); //1) mocking the localStorage to load this testing cart with product
    });
    loadFromStorage();

    renderOrderSummary();
  });

  //Test how the page looks:
  it('display the cart', () => {
    // document.querySelector('.js-test-container').innerHTML = `
    //         <div class="js-order-summary"></div>
    //     `;

    // const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    // const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    // //spyOn(localStorage, 'setItem'); // <-We don't really need it here
    // spyOn(localStorage, 'getItem').and.callFake(() => {
    //   return JSON.stringify([
    //     {
    //       productId: productId1,
    //       quantity: 2,
    //       deliveryOptionId: '1',
    //     },
    //     {
    //       productId: productId2,
    //       quantity: 1,
    //       deliveryOptionId: '2',
    //     },
    //   ]); //1) mocking the localStorage to load this testing cart with product
    // });
    // loadFromStorage();
    // renderOrderSummary();
    //-------------------

    //we added class="js-cart-item-container" in orderSummary.js (in: cartSummaryHTML str) for referencing here in test:
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

    //we added class="js-product-quantity-${matchingProduct.id}" in orderSummary.js(in: cartSummaryHTML)  for referencing here in test:
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');

    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');

    //we reset the html we added in jasmine webpage after we have the test results, because we don't want the jasmine results to be pushed down by the html we inserted.
    //TODO: use the afterEach() jasmine hook for that
    document.querySelector('.js-test-container').innerHTML = ``;
  });

  //Test how the page behaves:
  it('remove a product', () => {
    //     //When the test runs orderSummary.js code, it also runs in it the function           removeFromCart(productId), which saves to localStorage the cart after deleting item.
    //     //It is recommended to NOT modify localStorage in our tests.
    //     //Therefore- we should also mock localStorage.setItem() in this deletion test
    //     spyOn(localStorage, 'setItem');

    //     //Make note: I need to add here to .innerHTML:  <div class="js-payment-summary"></div>
    //     //because: renderOrderSummary() calls renderPaymentSummary() and the last runs the code:
    //     //  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    //     //so to not get an error in jasmine since the innerHtml is null, we need to add the div it looks for.
    //     document.querySelector('.js-test-container').innerHTML = `
    //     <div class="js-order-summary"></div>
    //     <div class="js-payment-summary"></div>
    // `;

    //     const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    //     const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    //     spyOn(localStorage, 'getItem').and.callFake(() => {
    //       return JSON.stringify([
    //         {
    //           productId: productId1,
    //           quantity: 2,
    //           deliveryOptionId: '1',
    //         },
    //         {
    //           productId: productId2,
    //           quantity: 1,
    //           deliveryOptionId: '2',
    //         },
    //       ]); //1) mocking the localStorage to load this testing cart with product
    //     });
    //     loadFromStorage();
    //     renderOrderSummary();
    //---------------------------
    //we added class="js-delete-link-${matchingProduct.id}" in orderSummary.js(in: cartSummaryHTML)  for referencing here in test:

    //to click element using code we can get it using the DOM and then call .click() on the dom object returned:
    document.querySelector(`.js-delete-link-${productId1}`).click(); //clicks the delete link and removes it

    //after we click delete on the first element, we expect only 1 item to remain in cart
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

    //get element for the first product we deleted. we excpect for null
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

    //get element for the first product we deleted. we excpect for NOT a null
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

    //check the cart state after the deletion:
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    //Cleanup - we reset the html we added in jasmine webpage after we have the test results, because we don't want the jasmine results to be pushed down by the html we inserted.
    //TODO: use the afterEach() jasmine hook for that
    document.querySelector('.js-test-container').innerHTML = ``;
  });
});
