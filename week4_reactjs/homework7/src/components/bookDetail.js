import React, { Component } from 'react';

class BookDetail extends Component {
  render() {
    return (
      <div>
        <div>id: {this.props.book.id}</div>
        <div>title: {this.props.book.title}</div>
        <div>price: {this.props.book.price}</div>
        <button onClick={() => { this.props.handleAddToCart(this.props.book); }}>
          Add to Cart
        </button>
      </div>
    );
  }
}

export default BookDetail;