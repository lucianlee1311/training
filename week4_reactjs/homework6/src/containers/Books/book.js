import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Route } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Book extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <Row>
          <Col sm="3">
            <Card tag={Link} to={`/book/${this.props.data.id}`}>
              <CardBody>
                <CardText>{this.props.data.name}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <div>
          <Link to={`/book/${this.props.data.id}`}>{this.props.data.name}</Link>
        </div> */}
      </div>
    );
  }
}

export default Book;