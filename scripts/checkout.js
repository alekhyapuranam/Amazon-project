import { cart, deleteElementFromCart, updateCount } from '../data/cart.js';
import { products } from '../data/products.js';
let checkoutpagehtml='';
cart.forEach((cartItem, index)=>{
    console.log('cartItem'+cartItem);
    let itemId=cartItem.itemId;
    let itemImage='';
    let itemName='';
    let itemPrice='';
    products.forEach((product,index)=>{
        if(itemId===product.id){
            itemImage=product.image;
            itemName=product.name;
            itemPrice=product.priceCents;
        }
       
    })
    //console.log(itemImage);
    checkoutpagehtml+=`
      <div class="cart-item-container-${itemId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${itemImage}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${itemName}
                </div>
                <div class="product-price">
                  $${itemPrice/100}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.count}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-update-item='${itemId}'>
                    Update
                  </span>
                  <span class='span-to-update-span'></span>
                  <span class="delete-quantity-link link-primary" data-delete-item='${itemId}'>
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
                    name="delivery-option-${itemId}">
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
                    name="delivery-option-${itemId}">
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
                    name="delivery-option-${itemId}">
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
    
    `

 
})
//console.log(checkoutpagehtml);
let orderSummary=document.querySelector('.js-order-summary');
orderSummary.innerHTML=checkoutpagehtml;

let deleteOption= document.querySelectorAll(".delete-quantity-link");
deleteOption.forEach((item)=>{
    item.addEventListener('click',()=>{
    let deleteItem=item.dataset.deleteItem
    deleteElementFromCart(deleteItem);
    let itemToDelete= document.querySelector(".cart-item-container-"+deleteItem);
    itemToDelete.remove();
    let cartCount=0;
    /*cart.forEach((product)=>{
        cartCount+=parseInt(product.count);

    })
    console.log('deleteoption cartcount '+cartCount);
    storeItemsInLocalStorage(cartCount,'cartCount');*/
   // calCartCount();

})

})

let updateOption= document.querySelectorAll(".update-quantity-link");
console.log(updateOption);
let updated=1;
updateOption.forEach((element,index)=>{
    let inputElement;
    let updateElementItemId=element.dataset.updateItem;
    element.addEventListener("click",()=>{
        if(inputElement){
            
            updateCount(inputElement, updateElementItemId);
            inputElement.remove();
            //console.log(updated);
            //updated=1;
        }else{
        inputElement=document.createElement('input');
        inputElement.type='text';
        inputElement.classList.add('.count-update');
        let insideSpan=document.querySelectorAll(".span-to-update-span");
        console.log(insideSpan);
        //let spanElement=document.createElement('span');
        //spanElement.textContent='Update';
        //spanElement.classList.add('link-primary');
        insideSpan[index].append(inputElement);
        //console.log(updated);
        //updated=0;
        
        }
       
        
        //element.appendChild(spanElement);
        //element.innerHTML=`<span><input type=""></input></span>`
        
    })
    

})
