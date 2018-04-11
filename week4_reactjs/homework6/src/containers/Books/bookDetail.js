import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BookData from './data.json'
import { Link, Route } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardText, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class BookDetail extends Component {
  state = {
    id: 0,
    name: "",
    price: 0
  }
  componentDidMount() {
    const bookList = Object.assign([], BookData);
    const book = bookList.filter(item => item.id.toString() === this.props.match.params.id).shift();
    this.setState({
      id: book.id, 
      name: book.name,
      price: book.price
    });
  }
  handleBackPrev = () => {
    this.props.history.goBack();
  }
  render() {
    return (
      <div>
        <h1>The page is {this.state.name}</h1>
        <Row>
          <Col sm="3">
            <Card>
              <CardBody>
                <CardText>id: {this.state.id}</CardText>
                <CardText>name: {this.state.name}</CardText>
                <CardText>price: {this.state.price}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Button color="secondary" onClick={this.handleBackPrev}>
          back to books
        </Button>
        {/* <div>id: {this.state.id}</div>
        <div>name: {this.state.name}</div>
        <div>price: {this.state.price}</div>
        <button onClick={this.handleBackPrev}>back to books</button> */}
        {/* <button>
          <Link to="/books">back to books</Link>
        </button> */}
      </div>
    );
  }
}

export default BookDetail;