import React, { Component } from 'react';

class Cart extends Component {
  render() {
    return (
      <div>{this.props.cart.title}</div>
    )
  }
}

export default Cart;