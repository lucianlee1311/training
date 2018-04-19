import React, { Component } from 'react';

class CartList extends Component {
  render() {
    return (
      this.props.cartList.map((cart, index) => (
        <div key={index}>{cart.title}</div>
      ))
    )
  }
}

export default CartList;
