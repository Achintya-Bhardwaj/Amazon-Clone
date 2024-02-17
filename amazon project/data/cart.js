export let cart = JSON.parse(localStorage.getItem('cart')) ||
  [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: 2
  }];

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
      quantity: quantityDropdownValue,
      deliveryOptionId: '1'
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