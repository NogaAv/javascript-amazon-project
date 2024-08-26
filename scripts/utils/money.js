export function formatCurrency(priceCents) {
  //.toFix() has an issue with rounding numbers ending with 5. like: 6.05
  //so to fix that we added 'Math.round()' before using the toFix()
  return (Math.round(priceCents) / 100).toFixed(2);
}

// export function test() {
//   console.log('testing');
// }

//Default export: Each file can only have 1 default export!
//                The file can have in addition many other exported function (like
//                test() function here), but only 1 of them as default, or not have any default
//                at all. NOTE: On import of the default = 'import formatCurrency from ...'
//                and no need for: 'import {formatCurrency} from ...' - syntax cleaner
export default formatCurrency;
