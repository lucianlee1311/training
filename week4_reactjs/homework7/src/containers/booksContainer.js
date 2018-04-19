import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBooks, addToCart } from '../actions';

// import { BookList } from '../components';
import { Book } from '../components';

class BooksContainer extends Component {

  componentDidMount() {
    this.props.getBooks();
  }

  handleAddToCart = (book) => {
    this.props.addToCart(book);
  }

  render() {
    return (
      this.props.books.map((book, index) => (
        <Book
          key={index}
          book={book}
          handleAddToCart={this.handleAddToCart} />)
      )
    )
  }

  /** BookList */
  // render() {
  //   return (
  //     <BookList
  //       books={this.props.books}
  //       handleAddToCart={this.handleAddToCart} />
  //   )
  // }
}

const mapStateToProps = (state) => {
  return {
    books: state.bookList.books
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getBooks: getBooks,
    addToCart: addToCart,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksContainer);