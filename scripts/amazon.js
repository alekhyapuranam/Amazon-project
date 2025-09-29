
const divElement=document.querySelector('.js-products');
let html='';

products.forEach(product =>{

    html +=
      `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${((product.priceCents)/100).toFixed(2)}
          </div>

          <div class="product-quantity-container js-product-quantity-container">
            <select class="js-quantity-container">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-cart-button" data-item-id='${product.id}'>
            Add to Cart
          </button>
        </div>`
       
})
 divElement.innerHTML=html;
const cartbutton=document.querySelectorAll('.js-cart-button');
const itemcountElement=document.querySelectorAll('.js-quantity-container');
cartbutton.forEach((button, index)=>{
    button.addEventListener('click', ()=>{
      let item=button.dataset.itemId;
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
          console.log('1st if');

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
    let totalCount=0;
    cart.forEach(order=>{
        totalCount+=parseInt(order.count);
   
    })
     console.log(totalCount);
     const cartquantityText=document.querySelector('.js-cart-quantity');
     cartquantityText.innerHTML=totalCount;
  })
  
})
