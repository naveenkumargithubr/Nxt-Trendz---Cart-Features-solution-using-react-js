import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'// import the cartSummury from the cartSummury component
 
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
        // if the cart is empty then show empty cart view with the img
            {showEmptyView ? (
              <EmptyCartView />
            ) : 
      
       // else display the heading and cartlist and cart summary
             (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="remove-btn"
                  type="button"
                  onClick={onClickRemoveAll}
                >
                  Remove All
                </button>
                <CartListView />
                <CartSummary />  // if items are add to the cart and add total items in the cart and also total quantity
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
