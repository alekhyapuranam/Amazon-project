export let cart=JSON.parse(localStorage.getItem('item'));
if(!cart){
    cart=[];
}
//let totalCartCount = JSON.parse(localStorage.getItem('cartCount'));
//console.log(totalCartCount);
const cartquantityText=document.querySelector('.js-cart-quantity');
let totalCartCount = JSON.parse(localStorage.getItem('cartCount'));
console.log('totalCartCount'+ totalCartCount);
console.log(cartquantityText);
if(cartquantityText){
cartquantityText.innerHTML=totalCartCount;
}

export function storeItemsInLocalStorage(toConvert,key){
    localStorage.setItem(key, JSON.stringify(toConvert));

}
export function addToCart(itemcountElement,item,index){
        console.log(item);
        let itemcount = itemcountElement[index].value;
        console.log(itemcount);
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
              itemPresent.count= (count1+parseInt(itemcount)).toString();
              console.log('2nd if');
              
            }
            else{
               cart.push({
              itemId : item,
              count : itemcount
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
          console.log(cart);
    
    
    
       
    }
     else{
          cart.push({
              itemId : item,
              count : itemcount
          });
        }
       storeItemsInLocalStorage(cart,'item');
       let totalCount=0;
        cart.forEach(order=>{
            totalCount+=parseInt(order.count);
       
        })
         console.log(totalCount);
         storeItemsInLocalStorage(totalCount,'cartCount');
        //const cartquantityText=document.querySelector('.js-cart-quantity');
         //let totalCartCount = JSON.parse(localStorage.getItem('cartCount'));
        // console.log(totalCartCount);
         cartquantityText.innerHTML=totalCount;
        // console.log( localStorage.setItem('cartCount', totalCount.toString));
        
}
//localStorage.removeItem('item');

export function deleteElementFromCart(deleteItem){
    //let itemToDelete= span.dataset.deleteItem;
    //console.log("itemToDelete"+ deleteItem);
    let items=[];
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
    


}