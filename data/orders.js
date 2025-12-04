import { centsToDollars } from "../scripts/util/moneyconversion.js";
import { cart, loadItemFromLocalStorage, storeItemsInLocalStorage } from "./cart.js";
import { findMatchingProduct, getProducts } from "./products.js";

export const orders=loadItemFromLocalStorage('orders')||[];

export function addToOrders(order){
    orders.unshift(order);
    cart.length=0;
    localStorage.removeItem('item');
    storeItemsInLocalStorage(orders,'orders');
}
console.log('orders',orders);
let ordersHtml='';
let orderItemsHtml='';
let products=getProducts();
//console.log('products',products);
export function getDate(date){
  let requiredDate=new Date(date);
  let formattedDate=requiredDate.toLocaleDateString('en-US',{
            month : 'long',
            day : 'numeric'
        });
        return formattedDate;
}


  export function renderOrderItems(order){
   
    let orderItemsArray=order.products;
    orderItemsArray.forEach((product)=>{
      
      let matchingItem=findMatchingProduct(product.productId);
      console.log('matchingItem',matchingItem);
      let itemName=matchingItem.name;
      let itemImage=matchingItem.image;
      let itemDate=getDate(product.estimatedDeliveryTime);
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
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
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

