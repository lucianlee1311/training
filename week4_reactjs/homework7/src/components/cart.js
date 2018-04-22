import React, { Component } from 'react';

class Cart extends Component {
  render() {
    return (
      <div>
        <span>{this.props.cart.title}</span>
        <button onClick={() => this.props.handleDeleteFromCart(this.props.cart)}>delete</button>
      </div>
    )
  }
}

export default Cart;