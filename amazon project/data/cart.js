export const cart = [];

export function addToCart(productId){

  const quantityDropdown = document.querySelector(`.quantity-dropdown-${productId}`);
  const quantityDropdownValue = Number(quantityDropdown.value);

  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantityDropdownValue;
  } else {
    cart.push({
      productId,
      quantity: quantityDropdownValue
    });
  }
  quantityDropdown.value = 1;
}