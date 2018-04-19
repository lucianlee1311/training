import React, { Component } from 'react';

import BooksContainer from './booksContainer';
import CartContainer from './cartContainer';

class App extends Component {
  render() {
    return (
      <div>
        <h2>Shopping Cart Example</h2>
        <hr/>
        {<BooksContainer />}
        <hr/>
        {<CartContainer />}
      </div>
    );
  }
}

export default App
