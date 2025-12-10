
export let cart;
cart=loadItemFromLocalStorage('item')||[];
export function loadItemFromLocalStorage(key){
  let item= JSON.parse(localStorage.getItem(key));
  
  return item;
}

export let checkOutDate=[{
  itemId:'1',
  deliveryTime:'7 days' , 
  priceCents:'0'

  
},
{
  itemId:'2',
  deliveryTime:'3 days',
  priceCents:'499'
},
{
  itemId:'3',
  deliveryTime:'1 day',
  priceCents: '999'
}];
//let totalCartCount = JSON.parse(localStorage.getItem('cartCount'));
//console.log(totalCartCount);
const cartquantityText=document.querySelector('.js-cart-quantity');
const checkout=document.querySelector('.return-to-home-link');
let totalCartCount = JSON.parse(localStorage.getItem('cartCount'));
console.log('totalCartCount'+ totalCartCount);
console.log(cartquantityText);
if(cartquantityText){
cartquantityText.innerHTML=totalCartCount;

}
if(checkout){
  checkout.innerHTML=totalCartCount;
}

console.log(cart);
export function storeItemsInLocalStorage(toConvert,key){
    localStorage.setItem(key, JSON.stringify(toConvert));

}
export function calCartCount(){
  const cartquantityText=document.querySelector('.js-cart-quantity');
  const checkoutItems=document.querySelector('.return-to-home-link');
   let totalCount=0;
        cart.forEach(order=>{
            totalCount+=order.quantity;
       
        })
         console.log(totalCount);
         if(cartquantityText){
         cartquantityText.innerHTML=totalCount;
         }
         if(checkoutItems)
         {
           checkoutItems.innerHTML=totalCount;
         }
          
         storeItemsInLocalStorage(totalCount,'cartCount');
         return totalCount;

}
export function addToCart(value,item){
        console.log(item);
        let itemcount = value;
        console.log(itemcount);
        console.log('item',item);
          let itemPresent;
          
          if(cart.length!=0)
            {
              cart.forEach((order, index)=>{
           // console.log('order :' + order);
            /*if(verify){
            return;
          }*/
            if(order.productId===item)
            {
              itemPresent=order;
             /* let count1= parseInt(order.count);
              console.log(typeof count1);
              order.count= (count1+parseInt(itemcount)).toString();
              console.log('if block');
              verify=true;
              return;*/
    
            }
              })
    
            if (itemPresent) {
              let count1= parseInt(itemPresent.quantity);
              itemPresent.quantity= (count1+itemcount);
              console.log('2nd if');
              
            }
            else{
               cart.push({
              productId : item,
              quantity : itemcount,
              deliveryOptionId:'1'
          });
             console.log('3rd if');
            }
            /*if(order.itemName!==item && index==cart.length-1)
              {cart.push({
              itemName : item,
              count : itemcount
      
          });}
              
            console.log('else block');
            
           
          })}
          else{
            cart.push({
              itemName : item,
              count : itemcount
          });
          console.log('other else block');
          }
          
          */
         
    
    
    
       
    }
     else{
          cart.push({
              productId : item,
              quantity : itemcount,
              deliveryOptionId: '1'
          });
        }
       storeItemsInLocalStorage(cart,'item');
       calCartCount();
      /* let totalCount=0;
        cart.forEach(order=>{
            totalCount+=parseInt(order.count);
       
        })
         console.log(totalCount);
         storeItemsInLocalStorage(totalCount,'cartCount');*/
        //const cartquantityText=document.querySelector('.js-cart-quantity');
         //let totalCartCount = JSON.parse(localStorage.getItem('cartCount'));
        // console.log(totalCartCount);
         
        // console.log( localStorage.setItem('cartCount', totalCount.toString));



        
}
//localStorage.removeItem('item');

export function deleteElementFromCart(deleteItem){
    //let itemToDelete= span.dataset.deleteItem;
    //console.log("itemToDelete"+ deleteItem);
    //let items=[];
    cart.forEach((product,index)=>{
        if(deleteItem===product.productId)
        {
            cart.splice(index,1);
            console.log("productid"+product.productId);
            //items.push({'itemId' : product.itemId, 'count' : product.count})
            //console.log(product);
        }
        storeItemsInLocalStorage(cart,'item');
    })
   // cart=items;
    //localStorage.removeItem('item');
   //storeItemsInLocalStorage(cart,'item');
    
    calCartCount();


}

export function updateCount(value, updateElementItemId){
    console.log('inputelement', value);
    let elementToUpdate;
    cart.forEach((element,index)=>{
        if(element.productId===updateElementItemId){
          //let quantityLabel=document.querySelectorAll('.quantity-label');
           elementToUpdate=element;
           if(value)
           {
              element.quantity=parseInt(value);
             // quantityLabel[index].innerHTML=inputElement.value;
           }
           else{
              element.quantity=element.quantity;
           }
           
         //  console.log(quantityLabel[index].innerHTML);
        }
       // elementToUpdate.count=inputElement.value;
       // console.log("elementToUpdate", elementToUpdate.count);
       // console.log("elementToUpdate", elementToUpdate.count);
    })
    storeItemsInLocalStorage(cart,'item');
     calCartCount();
    // inputElement.remove();

}

export function findmatchingDeliveryPrice(deliveryOptionId){
  let matchingItem;
  checkOutDate.forEach((item)=>{
    if(item.itemId===deliveryOptionId){
      matchingItem=item;
    }
  })
  return matchingItem;
}
