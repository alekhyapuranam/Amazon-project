import * as cartObject from '../../data/cart.js';
import { deleteEventDelegation, render } from '../../scripts/checkout.js';

describe('checkout page functionality',()=>{
    let cart;
     let testHtml;
     beforeEach(()=>{
       testHtml=document.querySelector('.cart-items-test');
         testHtml.innerHTML=` <div class="cart-items-test">
    <div class="js-order-summary order-summary"></div>
    <div class="payment-summary"></div>
   `;

        
            cart=[{itemId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', count: '2', optionsId:'1'},
                {itemId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', count: '1', optionsId:'2'},
                {itemId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e', count: '1', optionsId:'2'}];
        spyOn(localStorage,'getItem').and.callFake((key) =>{
            if(key==='item'){
                return JSON.stringify(cart);
            }
            return null
            
        });
        spyOn(localStorage,'setItem').and.callFake((key,value)=>{
            if(key==='item'){
                cart=JSON.parse(value);
            }
           
        });
         cartObject.loadCartFromLocalStorage();
        });
        afterEach(()=>{
            testHtml.innerHTML='';
        })

    it('test rendering of cart items on page',()=>{
        
        console.log("test called", document.querySelector('.cart-items-test'));
        
            console.log('true');
            render();
            console.log(document.querySelectorAll('.cart-item-container'));
            expect(document.querySelectorAll('.cart-item-container').length).toEqual(3);
       
        
    });
    it('test delete functionality on the dom',()=>{
        
        cartObject.deleteElementFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart.length).toEqual(2);
        render();
        let deleteElement=document.querySelectorAll('.delete-quantity-link');

        expect(document.querySelectorAll('.cart-item-container').length).toEqual(2);
       // console.log('deleteElement',deleteElement);
    });
    it('test clicking delete element on DOM',()=>{
        render();
        let orderSummary=document.querySelector('.order-summary');
       // cartObject.deleteElementFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        let deleteElement=document.querySelectorAll('.delete-quantity-link');
        spyOn(cartObject,'deleteElementFromCart').and.callThrough();
       // spyOn(orderSummary,'addEventListener').and.callThrough();
       
        deleteEventDelegation();
         
        deleteElement[0].click();
        deleteElement=document.querySelectorAll('.delete-quantity-link');
        console.log('Item',deleteElement);
         expect(document.querySelectorAll('.cart-item-container').length).toEqual(2);
         expect(deleteElement[0].dataset.deleteItem).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      //  expect(cartObject.deleteElementFromCart).toHaveBeenCalledWith(deleteElement[0].dataset.deleteItem);


    })
});
