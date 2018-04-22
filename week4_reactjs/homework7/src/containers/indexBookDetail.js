import React, { Component } from 'react';

import BookDetailContainer from './bookDetailContainer';
import CartContainer from './cartContainer';

class AppBookDetail extends Component {
  render() {
    return (
      <div>
        <h2>Book Detail Example</h2>
        <hr/>
        {<BookDetailContainer id={ this.props.match.params.id } />}
        <hr/>
        {<CartContainer />}
      </div>
    );
  }
}

export default AppBookDetail;
