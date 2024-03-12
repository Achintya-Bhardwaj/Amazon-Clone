import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";

export function renderPaymentSummary() {

  let productsPriceInCents = 0;
  let shippingPriceInCents = 0;

  cart.forEach(cartItem => {
    const matchingProduct = getProduct(cartItem.productId);
    productsPriceInCents += matchingProduct.priceInCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceInCents += deliveryOption.priceInCents;
  });

  const totalBeforeTaxInCents = productsPriceInCents + shippingPriceInCents;
  const taxInCents = totalBeforeTaxInCents * 0.1;
  const totalPriceInCents = totalBeforeTaxInCents + taxInCents;
  
  const paymentSummaryHtml = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div class="totalQuantitySummary"></div>
      <div class="payment-summary-money">
      $${formatCurrency(productsPriceInCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
      $${formatCurrency(shippingPriceInCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
      $${formatCurrency(totalBeforeTaxInCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
      $${formatCurrency(taxInCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
      $${formatCurrency(totalPriceInCents)}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

  function totalItemSummary(){
    const totalQuantitySummary = document.querySelector('.totalQuantitySummary');

    let cartTotalQuantity = 0;

    cart.forEach((item) => {
      cartTotalQuantity += item.quantity;
    });

    totalQuantitySummary.innerHTML = `Items (${cartTotalQuantity}):`;
  }
  totalItemSummary();
} 