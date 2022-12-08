import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachId => eachId.id !== id)
    this.setState({cartList: updatedCartList})
  }

  // here what we wrote on this method is firs we get the cartlist and the iterate over the cartlist get the item id if id is equal then increment by 1 and return the eachItem & updated quantity
  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachId => {
        if (id === eachId.id) {
          const updatedQuantity = eachId.quantity + 1
          return {...eachId, quantity: updatedQuantity}
        }
        return eachId
      }),
    }))
  }

  // here we first we take the cartlist from state later find the cartlist eachitem id and if eachItem id is greater than 1 then remove the item from the list.
  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObjItem = cartList.find(
      eachObjectItem => eachObjectItem.id === id,
    )
    if (productObjItem.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (id === eachItem.id) {
            const updatedQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    // this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const productObject = cartList.find(eachItem => eachItem.id === product.id)

    // if the same product item is found add the item quantity and then display the item
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (productObject.id === eachItem.id) {
            const updatedQuantity = eachItem.quantity + product.quantity
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }))
    }

    // else return the empty list
    else {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
