import { addToCart } from '../data/cart.js';
import { getProducts } from '../data/products.js';
//loadProducts().then((products)=>{
let products=await getProducts();

 
 console.log('products',products);
  const divElement=document.querySelector('.js-products');
let html='';
console.log("products1",products);
products.forEach(product =>{

    html +=
      `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src=${product.getImageUrl()}>
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.getProductPrice(product.priceCents)}
          </div>

          <div class="product-quantity-container js-product-quantity-container">
            <select class="js-quantity-container">
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
          ${product.getChartLink()}

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-cart-button" data-item-id='${product.id}'>
            Add to Cart
          </button>
        </div>`
       
})
 divElement.innerHTML=html;
const cartbutton=document.querySelectorAll('.js-cart-button');
const itemcountElement=document.querySelectorAll('.js-quantity-container');

cartbutton.forEach((button, index)=>{
    button.addEventListener('click', ()=>{
      console.log('itemcountelement', typeof itemcountElement[index].value);
      let value=parseInt(itemcountElement[index].value);
      let item=button.dataset.itemId;
      addToCart(value,item);
  })
  
})


//})
