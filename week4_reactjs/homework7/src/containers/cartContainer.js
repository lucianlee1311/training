import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Cart } from '../components';
import { deleteFromCart } from '../actions';

class CartContainer extends Component {
  handleDeleteFromCart = (item) => {
    this.props.deleteFromCart(item);
  }

  render() {
    return (
      this.props.cart.map((cart, index) => 
      <Cart
        key={index}
        cart={cart}
        handleDeleteFromCart={this.handleDeleteFromCart} />)
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartList.cart
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    deleteFromCart: deleteFromCart,
  }, dispatch)
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(CartContainer);
