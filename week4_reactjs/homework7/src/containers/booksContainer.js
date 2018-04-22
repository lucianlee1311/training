import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBooks, addToCart } from '../actions';

import { Book } from '../components';

class BooksContainer extends Component {

  componentDidMount() {
    console.log('BooksContainer componentDidMount');
    this.props.getBooks();
  }

  handleAddToCart = (book) => {
    console.log('this.props.cart', this.props.cart);
    this.props.addToCart(book);
  }

  render() {
    console.log('BooksContainer render');
    return (
      this.props.books.map((book, index) => (
        <Book
          key={index}
          book={book}
          handleAddToCart={this.handleAddToCart} />)
      )
    )
  }
}

const mapStateToProps = (state) => {console.log('|mapStateToProps|');
  return {
    books: state.bookList.books,
    cart: state.cartList.cart
  }
};

const mapDispatchToProps = (dispatch) => {console.log('*mapDispatchToProps*');
  return bindActionCreators({
    getBooks: getBooks,
    addToCart: addToCart,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksContainer);