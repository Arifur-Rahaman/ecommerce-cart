import { useSelector, useDispatch } from 'react-redux';

import './App.css';

function App() {
  const dispatch = useDispatch()

  const { product, cart } = useSelector(state => state)

  
  const handleAddCart = (productId) => {
    const stock = product.find(p=>p.id ===productId).quantity
    const isExist = cart.find(c=>c.id === productId)
    const quantity = isExist ? isExist.quantity+1 : 1
    if(quantity<=stock){
      dispatch({ type: 'ADD_CART', payload: productId })
    }else{
      alert('Out of stock')
    }
  }

  const handleSubtractCart = (cartId)=>{
    dispatch({type: 'SUBTRACT_CART', payload: cartId})
  }

  const style = {
    display: 'flex',
    alignItems: 'center',
    columnGap: '8px',
    border: '1px solid orange',
    padding: '8px'
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', boxSizing: 'border-box' }}>
      <div>
        <h1>Products</h1>
        {
          product.map((p) => (
            <div key={p.id} style={style}>
              <p>{p.name} - {p.quantity}</p>
              <button onClick={() => handleAddCart(p.id)}>Add to cart</button>
            </div>
          ))

        }
      </div>

      <div>
        <h1>Carts</h1>
        {
          cart.map((c) => (
            <div key={c.id}
              style={style}>
              <button onClick={()=>handleSubtractCart(c.id)}>-</button>
              <p>{c.name} - {c.quantity}</p>
              <button onClick={()=>handleAddCart(c.id)}>+</button>

            </div>
          ))

        }
      </div>

    </div>
  );
}

export default App;
