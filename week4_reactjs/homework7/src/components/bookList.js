import React, { Component } from 'react';

class BookList extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.book.title}</h3>
        <div>
          <button onClick={() => { this.props.handleAddToCart(book); }}>
            Add to Cart
          </button>
        </div>
      </div>
    )
  }
}

export default BookList;
