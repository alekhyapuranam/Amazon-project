import { addToCart, deleteElementFromCart, updateCount } from "../data/cart.js";
//import * as cartModule from "../data/cart.js";

describe('cart functionality test',()=>{
    let cart;
     
    beforeEach(()=>{
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
       // loadCartFromLocalStorage();
    });
    });
     it('checks the adding the new element to cart',()=>{
        console.log('cart',cart);
        addToCart(3,'58b4fc92-e98c-42aa-8c55-b6b79996769a');
        console.log(cart);
        expect(cart.length).toEqual(4);

    });

    it('checks the adding the existing element to cart',()=>{
        console.log(cart);
        addToCart(2,'83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(cart.length).toEqual(3);
        expect(parseInt(cart[2].count)).toEqual(3);
    })
    
   it('delete to cart functionality',()=>{
    deleteElementFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(2);
   })

   it('test update functionality',()=>{
    updateCount('5','83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(cart[2].count).toEqual('5');
   })

});

