import {createStore} from 'redux';

const initialState = {
    product: [{id: 1, name: 'Pen', quantity: 5}, 
    {id: 2, name: 'Book', quantity: 6}, 
    {id: 3, name: 'Pencil', quantity: 7}
],
    cart: []
}
const productReducer = (state=initialState, action) =>{
    state = JSON.parse(JSON.stringify(state))
    switch(action.type){
        
        case 'ADD_CART':
        {
            
          const isExist =  state.cart.find(c=>c.id===action.payload)
          const quantity = isExist? isExist.quantity + 1 : 1
          const product = state.product.find(c=>c.id===action.payload)
          const item = {...product, quantity: quantity}
          if(isExist){
            const newCart = state.cart.map(c=>c.id===action.payload ? item : c)

            return {
                ...state, cart: newCart
            }
          }
            return {
                ...state, cart: [...state.cart, item]
            }
        }

        case 'SUBTRACT_CART':{
            const item =  state.cart.find(c=>c.id===action.payload)
            const quantity = item.quantity - 1
            const newItem = {...item, quantity}
            const updatedCart = state.cart.map(c=>c.id===action.payload ? newItem : c)
            if(quantity===0){
                
                return {
                    ...state,
                    cart: state.cart.filter(c=>c.id !== action.payload)
                }
            }
            return(
                {
                    ...state, cart: updatedCart
                }
            )

        }

        default: return state
    }
}
export const store = createStore(productReducer)