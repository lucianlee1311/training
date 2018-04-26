import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Route } from 'react-router-dom';

import { addToCart } from '../actions';

import { BookDetail } from '../components';

class BookDetailContainer extends Component {
  static propTypes = {
    addToCart: PropTypes.func,
    bookDetail: PropTypes.array
  };

  componentDidMount() {

  }

  handleAddToCart = (book) => {
    this.props.addToCart(book);
  }

  render() {
    return (
      <div>
        <button>
          <Link to="/">back to home</Link>
        </button>
        <BookDetail
          book={this.props.bookDetail}
          handleAddToCart={this.handleAddToCart} />
      </div>
    )
  }
}

const mapStoreToProps = (store, ownProps) => {
  return {
    bookDetail: store.bookStore.books.find(item => String(item.id) === ownProps.id)
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addToCart,
  }, dispatch)
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(BookDetailContainer);