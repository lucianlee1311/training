import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBooks, addToCart } from '../actions';

import { Book } from '../components';
import data from '../data.json';

class BooksContainer extends Component {
  static propTypes = {
    getBooks: PropTypes.func,
    addToCart: PropTypes.func
  }

  componentDidMount() {
    const books = [...data];
    this.props.getBooks(books);
  }

  handleAddToCart = (book) => {
    this.props.addToCart(book);
  }

  render() {
    return (
      this.props.bookStore.books.map((book, index) => (
        <Book
          key={index}
          book={book}
          handleAddToCart={this.handleAddToCart} />)
      )
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    bookStore: store.bookStore
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getBooks,
    addToCart
  }, dispatch)
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(BooksContainer);