import { cart/*as myCart*/, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";

const productGrid = document.querySelector('.products-grid');
const cartQuantity = document.querySelector('.cart-quantity');


let htmlAccumulator = '';
products.forEach((product) => {
  htmlAccumulator += `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>
    
    <div class="product-price">
      $${(product.priceInCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select class="quantity-dropdown-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary "
      data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>
  `
});
productGrid.innerHTML = htmlAccumulator;

const addToCartBut = document.querySelectorAll('.add-to-cart-button');

addToCartBut.forEach((button) => {

  let timeOutId;

  function updateCartQuantity(){
    let cartTotalQuantity = 0;

    cart.forEach((item) => {
      cartTotalQuantity += item.quantity;
    });

    cartQuantity.innerHTML = cartTotalQuantity;
  }

  button.addEventListener('click', () => {

    // const productId = button.dataset.productId;
    const { productId } = button.dataset;

    addToCart(productId);
    updateCartQuantity();

    const showAddedPic = document.querySelector(`.added-to-cart-${productId}`);
    showAddedPic.classList.add('added-to-cart-active');
    
    if(timeOutId){
      clearTimeout(timeOutId);
      showAddedPic.classList.remove('added-to-cart-active');
      showAddedPic.offsetWidth;
      showAddedPic.classList.add('added-to-cart-active');
    }
    timeOutId = setTimeout(() => {
      showAddedPic.classList.remove('added-to-cart-active');
    }, 3000);
    
  });
});