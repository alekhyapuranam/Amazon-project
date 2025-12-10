import { centsToDollars } from "../scripts/util/moneyconversion.js";
import { addToCart, calCartCount, cart, loadItemFromLocalStorage, storeItemsInLocalStorage } from "./cart.js";
import { findMatchingProduct, getProducts } from "./products.js";

export const orders=loadItemFromLocalStorage('orders')||[];

export function addToOrders(order){
    orders.unshift(order);
    cart.length=0;
    localStorage.removeItem('item');
    storeItemsInLocalStorage(calCartCount(),'cartCount');
    storeItemsInLocalStorage(orders,'orders');
}
console.log('orders',orders);
let ordersHtml='';
let orderItemsHtml='';
let products=getProducts();
//console.log('products',products);
export function getDate(getdate){
  let requiredDate=new Date(getdate);
  console.log('required date',requiredDate);
  let formattedDate=requiredDate.toLocaleDateString('en-US',{
            month : 'long',
            day : 'numeric'
        });
        return formattedDate;
}


  export function renderOrderItems(order){
     orderItemsHtml=''
    let orderItemsArray=order.products;
    orderItemsArray.forEach((product)=>{
      
      let matchingItem=findMatchingProduct(product.productId);
      console.log('matchingItem',matchingItem);
      let itemName=matchingItem.name;
      let itemImage=matchingItem.image;
      let itemDate=getDate(product.estimatedDeliveryTime);
     // let itemDate=getEstimatedDeliveryTime();
      console.log('product.estimatedDeliveryTime',itemDate);
      let quantity=product.quantity;
      console.log('orderItems',itemDate,itemImage,itemName,quantity);
      orderItemsHtml+=
  ` <div class="product-image-container">
              <img src="${itemImage}">
            </div>

            <div class="product-details">
              <div class="product-name">
               ${itemName}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${itemDate}
              </div>
              <div class="product-quantity">
                Quantity: ${quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button" data-product-id=${product.productId} data-quantity=${quantity}>
                <img class="buy-again-icon js-buy-again-button" data-product-id=${product.productId} data-quantity=${quantity} src="images/icons/buy-again.png">
                <span class="buy-again-message js-buy-again-button" data-product-id=${product.productId} data-quantity=${quantity}>Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?productId=${product.productId}&orderId=${order.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
`;
    })

  return orderItemsHtml;
  
}

export function renderOrdersPage(){
  
    orders.forEach((order)=>{
        
        let dateInFormat=getDate(order.orderTime);

   
    ordersHtml+=` <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateInFormat}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${centsToDollars(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${renderOrderItems(order)}
             
            </div>
        </div>`

    })
    let ordersGrid=document.querySelector('.orders-grid');
    if(ordersGrid){
       ordersGrid.innerHTML=ordersHtml;
    }
   

}
renderOrdersPage();
let cartQuantity=document.querySelector('.cart-quantity');
let ordersGrid=document.querySelector('.orders-grid');
let buyAgainButton;
if(ordersGrid){
  console.log('buyAgainButton 1',buyAgainButton);
 ordersGrid.addEventListener('click',(event)=>{
  if(event.target.matches('.js-buy-again-button')){
    buyAgainButton=event.target;

    console.log('buyAgainButton 2',buyAgainButton);
    let productIdToBuyAgain= buyAgainButton.dataset.productId;
    let quantity=parseInt(buyAgainButton.dataset.quantity);
    console.log('event',productIdToBuyAgain);
    console.log('event', quantity);
    addToCart(quantity,productIdToBuyAgain);
     cartQuantity.innerHTML=loadItemFromLocalStorage('cartCount');
  }
  
  //let productIdToBuyAgain= buyAgainButton.dataset.productId;
  //let quantity=parseInt(buyAgainButton.dataset.quantity);
  //addToCart(quantity,productIdToBuyAgain);


});
}

if(cartQuantity){
  cartQuantity.innerHTML=loadItemFromLocalStorage('cartCount');

}



