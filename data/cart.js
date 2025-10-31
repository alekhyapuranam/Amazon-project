
export let cart;
loadCartFromLocalStorage();
export function loadCartFromLocalStorage(){
cart=JSON.parse(localStorage.getItem('item'));
if(!cart){
    cart=[];
}
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
            totalCount+=parseInt(order.count);
       
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
       loadCartFromLocalStorage();
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
            if(order.itemId===item)
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
              let count1= parseInt(itemPresent.count);
              itemPresent.count= (count1+itemcount).toString();
              console.log('2nd if');
              
            }
            else{
               cart.push({
              itemId : item,
              count : itemcount,
              optionsId:'1'
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
              itemId : item,
              count : itemcount,
              optionsId: '1'
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
    loadCartFromLocalStorage();
    cart.forEach((product,index)=>{
        if(deleteItem===product.itemId)
        {
            cart.splice(index,1);
            console.log("productid"+product.itemId);
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
    loadCartFromLocalStorage();
    let elementToUpdate;
    cart.forEach((element,index)=>{
        if(element.itemId===updateElementItemId){
          //let quantityLabel=document.querySelectorAll('.quantity-label');
           elementToUpdate=element;
           if(value)
           {
              element.count=value;
             // quantityLabel[index].innerHTML=inputElement.value;
           }
           else{
              element.count=element.count;
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

export function findmatchingDeliveryPrice(optionsId){
  let matchingItem;
  checkOutDate.forEach((item)=>{
    if(item.itemId===optionsId){
      matchingItem=item;
    }
  })
  return matchingItem;
}
