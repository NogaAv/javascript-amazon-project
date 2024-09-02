export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  //we want the recent order at the top, so we put it in front of the array
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}
