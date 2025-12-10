import { calCartCount, cart, findmatchingDeliveryPrice } from '../data/cart.js';
import { addToOrders } from '../data/orders.js';
import { findMatchingProduct } from '../data/products.js';
import { centsToDollars } from './util/moneyconversion.js';
export function renderPaymentSummary() {
    let totalPriceCount=0;
    let totalDeliveryCost=0;
    cart.forEach((item)=>{
        let matchingProductItem=findMatchingProduct(item.productId);
         console.log('matchingItem',item.productId);
       console.log('matchingItem',typeof matchingProductItem.priceCents);
         totalPriceCount+=matchingProductItem.priceCents*item.quantity;
         
         let matchingDeliveryItem=findmatchingDeliveryPrice(item.deliveryOptionId);
         console.log(matchingDeliveryItem);
         totalDeliveryCost+=parseInt(matchingDeliveryItem.priceCents);
    })
   
    let totalBeforeTax=totalPriceCount+totalDeliveryCost;
    let estimatedTax=totalBeforeTax*0.1;
    let orderTotal=totalBeforeTax+estimatedTax;
     console.log(totalPriceCount, totalDeliveryCost, totalBeforeTax, estimatedTax);
let renderPaymentSummaryHtml=`
 
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calCartCount()}):</div>
            <div class="payment-summary-money">$${centsToDollars(totalPriceCount)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${centsToDollars(totalDeliveryCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${centsToDollars(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${centsToDollars(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${centsToDollars(orderTotal)}</div>
          </div>

          
         <button class="place-order-button button-primary js-order-button">
            Place your order
          </button>
        
      
`;
let paymentSummary=document.querySelector('.payment-summary');
if(paymentSummary){
paymentSummary.innerHTML=renderPaymentSummaryHtml;
}
if(document.querySelector('.js-order-button'));{
document.querySelector('.js-order-button').addEventListener('click',async ()=>{
    let response=await fetch('https://supersimplebackend.dev/orders',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        cart:cart
      })
    });
     let order=await response.json();
      addToOrders(order);
      window.location.href='orders.html';
      console.log('order',order);
  }); 
}
}