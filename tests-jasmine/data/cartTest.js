import { addToCart, cart, loadFromStorage } from '../../data/cart.js';

describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem'); //we don't want the localStorage.setItem in our code to actually change cart. so we mock it with undefined function (that does nothing)

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1',
        },
      ]); //1) mocking the localStorage to load this testing cart with product
    });
    loadFromStorage(); //2)..and then we need to reload cart from storage, this in order for the localStorage.getItem be called in code and load the mocked product to our cart imported above

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    //toHaveBeenCalledTimes - checks how many time localStorage.setItem() was called in the code above. Note: This only works if the method was mocked by spyOn()
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    //spyOn() is a function to create Mock.
    //1'st param = The object we want to mock
    //2'nd param = The method we want to mock

    //here, we mocked setItem with undefined func
    //because we don't want the testing to actually set the localstorage to the testing values:
    spyOn(localStorage, 'setItem');

    //now, we replace localStorage.getItem() function in our tested code with fake/mock:
    spyOn(localStorage, 'getItem').and.callFake(() => {
      //overriding the method:
      return JSON.stringify([]); //localstorage only handles strings, so we call JSON.stringify
    });
    console.log(localStorage.getItem('cart')); //I get the [] empty array on the jasmine webpage's console - since the mock is run

    loadFromStorage(); //we need to use the moked func
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    //toHaveBeenCalledTimes - checks how many time localStorage.setItem() was called in the code above. Note: This only works if the method was mocked by spyOn()
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});
