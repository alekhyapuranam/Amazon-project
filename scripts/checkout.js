import dayjs from 'https://unpkg.com/dayjs@1.11.11/esm/index.js';
import { cart, checkOutDate, deleteElementFromCart, storeItemsInLocalStorage, updateCount } from '../data/cart.js';
import { products } from '../data/products.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { centsToDollars } from './util/moneyconversion.js';

  let day=dayjs();
  let plusSeven=(day.add(7,'day')).format('dddd, MMMM DD');
  let plusThree = (day.add(3,'day')).format('dddd, MMMM DD');
  let nextDay=(day.add(1,'day')).format('dddd, MMMM DD');
  let itemId='';
    let itemImage='';
    let itemName='';
    let itemPrice='';
    render();
function render(){
let checkoutpagehtml='';

  
cart.forEach((cartItem, index)=>{
    console.log('cartItem'+cartItem);
    itemId=cartItem.itemId;
    itemImage='';
    itemName='';
    itemPrice='';

    products.forEach((product,index)=>{
        if(itemId===product.id){
            itemImage=product.image;
            itemName=product.name;
            itemPrice=product.priceCents;
        }
       
    })
    console.log('optionId', cartItem.optionsId);
    //console.log(itemImage);
    checkoutpagehtml+=`
      <div class="cart-item-container-${itemId} cart-item-container" data-item-id="${itemId}">
            <div class="delivery-date">
              Delivery date: ${calculateDeliveryDate(cartItem.optionsId)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${itemImage}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${itemName}
                </div>
                <div class="product-price">
                  $${centsToDollars(itemPrice)}
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
                  ${RenderdeliveryOption(cartItem.optionsId,checkOutDate)}
                </div>
              </div>
              
            </div>
          </div>
    
    `
    
 
})

//console.log(checkoutpagehtml);
let orderSummary=document.querySelector('.js-order-summary');
orderSummary.innerHTML=checkoutpagehtml;
}

/*let deliveryOptions=document.querySelectorAll('.delivery-options');
deliveryOptions.forEach((cartItem,index)=>{
  let radioButtons = cartItem.querySelectorAll(`.delivery-option-input`);
 console.log('radioButtons', radioButtons); 
 radioButtons.forEach((element)=>{
   element.addEventListener('change',()=>{
     let item=cartItem.closest('.cart-item-container');
     let itemId=item.dataset.itemId;
      console.log('item', itemId);
   // console.log('sibling :',typeof element.nextSibling);
    let deliveryDate= element.nextElementSibling;
    let day= deliveryDate.querySelector('.delivery-option-date');
    let shipping=deliveryDate.querySelector('.delivery-option-price').textContent;
    console.log('shipping price :',shipping);
    checkOutDate.forEach((item,index)=>{
       if(item.itemId===itemId)
       {
         if(shipping==='FREE Shipping' )
    {
      item.priceCents='0';
      }
    
    else if(shipping==='$4.99 - Shipping'){
      item.priceCents='499';
      
    }
    else if(shipping==='$9.99 - Shipping'){
      item.priceCents='999';
       }
      console.log('price changed');
}
       if(item.itemId!==itemId&& index==(checkOutDate.length)-1)
       {
         if(shipping==='FREE Shipping' )
    {
      checkOutDate.push({
        itemId: itemId,
        priceCents:'0'
      })
    }
    else if(shipping==='$4.99 - Shipping'){
      checkOutDate.push({
        itemId: itemId,
        priceCents:'499'
      })
    }
    else if(shipping==='$9.99 - Shipping'){
      checkOutDate.push({
        itemId: itemId,
        priceCents:'999'
      })
    }  
    console.log('pricepushed');
       }
 
        })
        console.log(checkOutDate);
    let deliveryDateToChange= document.querySelectorAll('.delivery-date');

    deliveryDateToChange[index].textContent=day.textContent;
    console.log('deliveryDateToChange',deliveryDateToChange);
   // document.querySelector('.delivery-date').innerHTML=`Delivery date:${deliveryDate.textContent} `;
   })

 })


})*/
function calculateDeliveryDate(optionId){
  if(optionId==='1'){
    return plusSeven;
  }
  else if(optionId==='2'){
    return plusThree;
  }
  else if(optionId==='3'){
    return nextDay;
  }

}
function selectShippingOption(cartOptionsId,checkOutDateId){
  let matchingItem;
 // let matchingItem=cart.find(cartItem=>checkOutDate.find(checkOutDateItem=>
 //   cartItem.optionsId===checkOutDateItem.itemId
 // checkOutDate.forEach((element)=>{
 //   console.log('inthis function');
  //    if(cartOptionsId===element.itemId){
  //    matchingItem= 'checked';
  //  }
 // })
//  return matchingItem;
if(cartOptionsId===checkOutDateId){
  return 'checked';
}
   
  
 // ));
 // return matchingItem?'checked':'';
 /* cart.forEach((cartItem)=>{
    checkOutDate.forEach((checkOutDateItem)=>{
      console.log('inside checkoutdate loop');
      if(cartItem.optionsId===checkOutDateItem.itemId)
      {
        console.log('returing something');
        matchingItem = 'checked';
      }
      else{
        matchingItem='';
      }

    })

  })
  return matchingItem;*/

}

function RenderdeliveryOption(cartOptionsId,checkOutDate){
  let deliveryOptionsHTML='';
  let cartOptionId=cartOptionsId;
  console.log('cartOptionId ', cartOptionId);
  checkOutDate.forEach((element,index)=>{
    console.log('in the loop');
    let time=element.deliveryTime;
    let deliveryDay='';
    let price='';
    if(time==='7 days'){
      deliveryDay=(day.add(7,'day')).format('dddd, MMMM DD');
      price='FREE - Shipping';
    }
    else if(time==='3 days'){
      deliveryDay=(day.add(3,'day')).format('dddd, MMMM DD');
      price='4.99 - Shipping';
    }
    else{
      deliveryDay=(day.add(1,'day')).format('dddd, MMMM DD');
      price='9.99 - Shipping';
    }
   // let checked=(index==0?"checked":"");
      deliveryOptionsHTML+=`
                <div class="delivery-option delivery-option-${element.deliveryTime}" data-id='${element.itemId}'>
                  <input type="radio" ${selectShippingOption(cartOptionId,element.itemId)}
                    class="delivery-option-input"
                    name="delivery-option-${itemId}">
                  <div>
                    <div class="delivery-option-date">${deliveryDay}
                    </div>
                    <div class="delivery-option-price">
                      ${price}
                    </div>
                  </div>
                </div>`
  })
 
   return deliveryOptionsHTML;             
}

/*let cartItems=document.querySelectorAll('.cart-item-container');
cartItems.forEach((element)=>{
  element.querySelectorAll(".delivery-option").forEach((option)=>{
    option.addEventListener('click',()=>{
      let optionItemId=option.dataset.id;
     let selectedItem= option.closest('.cart-item-container');
      let selectedItemId= selectedItem.dataset.itemId;
      console.log(optionItemId);
      cart.forEach((item)=>{
        if(selectedItemId===item.itemId){
          
          item.optionsId=optionItemId;
          console.log('inside if', item.optionsId);
           storeItemsInLocalStorage(cart,'item');
           render();
        }
     
      })
      

    })
  });


})*/

//delivery date selection using event delegation
let cartItem=document.querySelector('.order-summary');
cartItem.addEventListener('click',(event)=>{
  let element= event.target.closest('.cart-item-container');
  if(element)
  {
    let elementId= element.dataset.itemId;
    let deliveryDate=event.target.closest('.delivery-option');
    if(deliveryDate){
      console.log(deliveryDate.dataset.id);
    }
    cart.forEach((element)=>{
      if(element.itemId===elementId){
        element.optionsId=deliveryDate.dataset.id;
      }
    })
    storeItemsInLocalStorage(cart,'item');
    renderPaymentSummary();
    render();
  }
  //storeItemsInLocalStorage(cart,'item');
})


/*let deleteOption= document.querySelectorAll(".delete-quantity-link");
deleteOption.forEach((item)=>{
    item.addEventListener('click',()=>{
    let deleteItem=item.dataset.deleteItem
    deleteElementFromCart(deleteItem);
    let itemToDelete= document.querySelector(".cart-item-container-"+deleteItem);
    itemToDelete.remove();
    let cartCount=0;*/
    /*cart.forEach((product)=>{
        cartCount+=parseInt(product.count);

    })
    console.log('deleteoption cartcount '+cartCount);
    storeItemsInLocalStorage(cartCount,'cartCount');*/
   // calCartCount();

//})

//})

//using event delegation for delete option
let deleteButton=document.querySelector('.order-summary');
deleteButton.addEventListener('click',(event)=>{
  if(event.target.matches('.delete-quantity-link')){
    let deleteItem=event.target.dataset.deleteItem;
    deleteElementFromCart(deleteItem);
    console.log("deleteItem", deleteItem);
    renderPaymentSummary();
    render();
  }
  
})

/*let updateOption= document.querySelectorAll(".update-quantity-link");
console.log(updateOption);
let updated=1;
updateOption.forEach((element,index)=>{
    let inputElement;
    let updateElementItemId=element.dataset.updateItem;
    element.addEventListener("click",()=>{
        if(inputElement){
            
            updateCount(inputElement, updateElementItemId);
            inputElement.remove();
            inputElement=null;*/
            //console.log(updated);
            //updated=1;
  /*          console.log('input element :', inputElement);
        }else{
          console.log('creating input element');
        inputElement=document.createElement('input');
        inputElement.type='text';
        inputElement.classList.add('.count-update');
        let insideSpan=document.querySelectorAll(".span-to-update-span");
        console.log(insideSpan);*/
        //let spanElement=document.createElement('span');
        //spanElement.textContent='Update';
        //spanElement.classList.add('link-primary');
       /* insideSpan[index].append(inputElement);*/
        //console.log(updated);
        //updated=0;
        
      /*  }*/
       
        
        //element.appendChild(spanElement);
        //element.innerHTML=`<span><input type=""></input></span>`
        
  /*  })
    

})*/

//update option using event delegation
let updateButton=document.querySelector('.order-summary');
updateButton.addEventListener('click',(event)=>{
  
  
  if(event.target.matches('.update-quantity-link')){
    

    let element=event.target;
    let insideSpan=element.nextElementSibling;
   let inputPresent=insideSpan.querySelector('.count-update');
    let updateElementItemId=element.dataset.updateItem;
        if(inputPresent){
           let value=inputPresent.value;
           console.log(inputPresent);
           updateCount(value, updateElementItemId);
             console.log('target', element);
             renderPaymentSummary()
            //inputElement.remove();
            render();
            //inputElement='';

  }
  else{
    
       //let insideSpan;   
       let inputElement=document.createElement('input');
        inputElement.type='text';
        inputElement.classList.add('count-update');
          
           console.log('creating input element',insideSpan);
          insideSpan.append(inputElement);

        inputElement.focus();
        console.log('type of',typeof insideSpan);
       
        
  }

  }
})
renderPaymentSummary();