import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../style.scss';
import { Link, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Home extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div className="box">
        <h1>The page is Home</h1>
        <Button color="primary" tag={Link} to="/books">
          books
        </Button>
        {/* <button>
          <Link to="/books">books</Link>
        </button> */}
      </div>
    );
  }
}

export default Home;