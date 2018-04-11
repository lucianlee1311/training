import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Book from './book';
import BookData from './data.json'
import { Link, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Books extends Component {
  state = {
    bookList: []
  }
  componentDidMount() {
    const bookList = Object.assign([], BookData);
    this.setState({bookList});
  }
  render() {
    return (
      <div>
        <h1>The page is Books</h1>
        {this.state.bookList.map(item => (<Book 
          key={Math.random()}
          data={item} />))}
        <Button color="secondary" tag={Link} to="/">
          back to home
        </Button>
        {/* <button>
          <Link to="/">back to home</Link>
        </button> */}
      </div>
    );
  }
}

export default Books;