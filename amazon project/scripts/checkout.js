import { cart, removeFormCart } from '../data/cart.js';
import { products } from '../data/products.js';

const orderSummary = document.querySelector('.order-summary');
const checkoutCartCount = document.querySelector('.return-to-home-link');

let htmlAccumulator = '';
cart.forEach((cartItem) => {

  const { productId } = cartItem;

  let matchingProduct;

  products.forEach((product) => {
    if(product.id === productId){
      matchingProduct = product;
    }
  });

  htmlAccumulator += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id} ">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${(matchingProduct.priceInCents / 100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input checkout-input">  
            <span class="save-quantity-link link-primary checkout-input">
            Save
            </span>
            <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

orderSummary.innerHTML = htmlAccumulator;
checkoutCartQuantity();

document.querySelectorAll('.delete-quantity-link').forEach((link) =>{
  link.addEventListener('click', () => {
    const { productId } = link.dataset;
    removeFormCart(productId);
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();

    checkoutCartQuantity();
  });
});

function checkoutCartQuantity(){
  let cartTotalQuantity = 0;

  cart.forEach((item) => {
    cartTotalQuantity += item.quantity;
  });

  checkoutCartCount.innerHTML = `${cartTotalQuantity} items`;
}

document.querySelectorAll('.update-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const { productId } = link.dataset;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');
  });
});