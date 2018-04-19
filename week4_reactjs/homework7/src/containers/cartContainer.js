import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { CartList } from '../components';
import { Cart } from '../components';

class CartContainer extends Component {
  render() {
    return (
      this.props.cart.map((cart, index) => 
      <Cart
        key={index}
        cart={cart} />)
    )
  }

  /** CartList */
  // render() {
  //   return (
  //     <CartList
  //       cartList={this.props.cart}
  //     />
  //   )
  // }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartList.cart
  }
};

export default connect(
  mapStateToProps, 
  null
)(CartContainer);
