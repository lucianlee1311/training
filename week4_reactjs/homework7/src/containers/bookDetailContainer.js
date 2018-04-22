import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Route } from 'react-router-dom';

import { getBooks, getBookDetail, addToCart } from '../actions';

import { BookDetail } from '../components';

class BookDetailContainer extends Component {
  
  static propTypes = {
    // id: PropTypes.string.isRequired,
    // name: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // price: PropTypes.number.isRequired,
  };

  componentDidMount() {

  }

  handleAddToCart = (book) => {
    this.props.addToCart(book);
  }

  render() {
    console.log('BookDetailContainer render');
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

const mapStateToProps = (state, ownProps) => {console.log('mapStateToProps');
  return {
    bookDetail: state.bookList.books.find(item => String(item.id) === ownProps.id)
  }
};

const mapDispatchToProps = (dispatch) => {console.log('mapDispatchToProps');
  return bindActionCreators({
    getBookDetail: getBookDetail,
    addToCart: addToCart,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookDetailContainer);