export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
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
