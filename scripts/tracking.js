import dayjs from 'https://unpkg.com/dayjs@1.11.11/esm/index.js';
import { getDate, orders } from "../data/orders.js";
import { findMatchingProduct } from '../data/products.js';
let trackingHtml='';
let url=new URLSearchParams(window.location.search);
let orderId=url.get('orderId');
let productId=url.get('productId');
let matchingItem;
let matchingProduct;
let matchingProductItem;
let today=dayjs();
let requiredOrder=findMatchingItems(orderId,orders,'id');

let orderTime=requiredOrder.orderTime;
let deliveryTime;

requiredOrder.products.forEach((item)=>{
  if(item.productId===productId){
    deliveryTime=item.estimatedDeliveryTime;
  }
});

let dayJsDeliveryTime=dayjs(deliveryTime);
let dayJsOrderTime=dayjs(orderTime);
//console.log('deliveryTime : ',dayJsDeliveryTime);
//console.log(',orderTime :',dayJsOrderTime);
let diffminutes=today.diff(dayJsOrderTime,'minutes');
let deliveryTimeDiffOrderTime=dayJsDeliveryTime.diff(dayJsOrderTime,'minutes');
let finalPercentageOfTime=(diffminutes/deliveryTimeDiffOrderTime)*100;

console.log('diffminutes : ', finalPercentageOfTime);
export function findMatchingItems(id,itemArray,idName)
{
  let match;
    itemArray.forEach((item)=>{
      if(item[idName]===id){
        match=item;
       
      }
    })
    return match;
}

orders.forEach((order) => {
        if(order.id===orderId)
        {
            matchingItem=order;
        }
    
});
matchingItem.products.forEach((product)=>{
    if(product.productId===productId)
    {
        matchingProductItem=product;
        deliveryTime=product.estimatedDeliveryTime;
        matchingProduct=findMatchingProduct(productId);
   
    }
});


export function renderTrackingPage(){
    trackingHtml+=`
     <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

     <div class="delivery-date">
          ${getDate(matchingItem.orderTime)}
        </div>

        <div class="product-info">
            ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingProductItem.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label ">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`;
          let tracking=document.querySelector('.order-tracking');
       if(tracking) {
            tracking.innerHTML=trackingHtml;
       }
}
renderTrackingPage();
function setTrackingStatus(finalPercentage){
  let currentStatus=document.querySelectorAll('.progress-label');
  let progressBar=document.querySelector('.progress-bar');
  progressBar.style.width=finalPercentage+'%';
  console.log('currentStatus',currentStatus);
  if(finalPercentage<=49){
    currentStatus[0].classList.add('current-status');
      
  }
  else if(finalPercentage>=50&&finalPercentage<=99){
    currentStatus[1].classList.add('current-status');
  }
  else if(finalPercentage>=100){
    currentStatus[2].classList.add('current-status');
  }

}
setTrackingStatus(finalPercentageOfTime);
