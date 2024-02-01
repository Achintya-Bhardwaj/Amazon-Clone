export let cart = JSON.parse(localStorage.getItem('cart')) ||
  [];

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

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

  saveToStorage();
}

export function removeFormCart(productId){

  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveToStorage();
}