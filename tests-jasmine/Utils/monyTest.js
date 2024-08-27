import formatCurrency from '../../scripts/utils/money.js';

//jasmin function- creates a test-suite:
describe('test suite: formatCurrency', () => {
  //creating a test using it() function
  it('converts cents into dollars', () => {
    //expect() lets us compare value to another value. Create an expectation for a spec(=test)
    //expect() returns object with methods we can call on
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds down to the nearest cent', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });
});
