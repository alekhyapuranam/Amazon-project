import { cart, findmatchingDeliveryPrice } from '../data/cart.js';
import { findMatchingProduct } from '../data/products.js';
import { centsToDollars } from './util/moneyconversion.js';
export function renderPaymentSummary() {
    let totalPriceCount=0;
    let totalDeliveryCost=0;
    cart.forEach((item)=>{
        let matchingProductItem=findMatchingProduct(item.itemId);
       // console.log(matchingItem);
         totalPriceCount+=matchingProductItem.priceCents*parseInt(item.count);
         
         let matchingDeliveryItem=findmatchingDeliveryPrice(item.optionsId);
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
            <div>Items (3):</div>
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

          <button class="place-order-button button-primary">
            Place your order
          </button>
      
`;
let paymentSummary=document.querySelector('.payment-summary');
paymentSummary.innerHTML=renderPaymentSummaryHtml;

}