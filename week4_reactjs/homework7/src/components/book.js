import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class Book extends Component {
  render() {
    return (
      <div>
        <Link to={`/book/${this.props.book.id}`}>
          <h3>{this.props.book.title}</h3>
        </Link>
        <span>price : {this.props.book.price}</span>
        <button onClick={() => { this.props.handleAddToCart(this.props.book); }}>
          Add to Cart
        </button>
      </div>
    )
  }
}

export default Book;
