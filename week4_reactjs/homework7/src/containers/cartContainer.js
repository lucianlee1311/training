import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Cart } from '../components';
import { deleteFromCart } from '../actions';

class CartContainer extends Component {
  static propTypes = {
    deleteFromCart: PropTypes.func
  }

  handleDeleteFromCart = (item) => {
    this.props.deleteFromCart(item);
  }

  render() {
    return (
      this.props.cartStore.cart.map((cart, index) => 
      <Cart
        key={index}
        cart={cart}
        handleDeleteFromCart={this.handleDeleteFromCart} />)
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    cartStore: store.cartStore
  }  
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    deleteFromCart
  }, dispatch)
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(CartContainer);
