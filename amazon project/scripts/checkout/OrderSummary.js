import { cart, removeFromCart, saveToStorage, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderPaymentSummary } from './PaymentSummary.js';

const orderSummary = document.querySelector('.order-summary');
const checkoutCartCount = document.querySelector('.return-to-home-link');

export function renderOrderSummary(){
  let htmlAccumulator = '';
  cart.forEach((cartItem) => {

    const { productId } = cartItem;

    const matchingProduct = getProduct(productId);

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateFormat = deliveryDate.format('dddd, MMMM D');

    htmlAccumulator += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id} ">
        <div class="delivery-date">
          Delivery date: ${dateFormat}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceInCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input checkout-input checkout-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">  
              <span class="save-quantity-link link-primary checkout-input" data-product-id="${matchingProduct.id}">
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
            ${deliveryDateHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  orderSummary.innerHTML = htmlAccumulator;
  checkoutCartQuantity();

  function deliveryDateHTML(matchingProduct, cartItem){
    let dateHTML = '';
    
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateFormat = deliveryDate.format('dddd, MMMM D');

      const price = deliveryOption.priceInCents === 0 ? 'FREE' : `${formatCurrency(deliveryOption.priceInCents)} -`
      
      const isChecked = deliveryOption.id === Number(cartItem.deliveryOptionId);

      dateHTML += `
        <div class="delivery-option js-delivery-option"
          data-product-id = "${matchingProduct.id}"
          data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateFormat}
            </div>
            <div class="delivery-option-price">
              ${price} Shipping
            </div>
          </div>
        </div>
    `
    });
    return dateHTML;
  }

  document.querySelectorAll('.delete-quantity-link').forEach((link) =>{
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      removeFromCart(productId);
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();

      checkoutCartQuantity();

      renderPaymentSummary();
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

  function saveButtonJs(productId){
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');
    
    const quantityInputValue = document.querySelector(`.checkout-input-${productId}`);
    quantityInputValue.focus();
    document.querySelector(`.quantity-label-${productId}`).innerHTML = Number(quantityInputValue.value);

    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        cartItem.quantity = Number(quantityInputValue.value);
      }
    });
    saveToStorage();
    checkoutCartQuantity();
  }

  document.querySelectorAll('.save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      saveButtonJs(productId);
    });
  });

  document.querySelectorAll('.quantity-input').forEach((input) => {
    input.addEventListener('keydown', (event) => {
      const { productId } = input.dataset;
    if (event.key === 'Enter') {
      saveButtonJs(productId);
    }
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
