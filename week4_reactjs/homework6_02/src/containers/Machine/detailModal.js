import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input, FormText } from 'reactstrap';

class DetailModal extends Component {
  static propTypes = {
    data: PropTypes.object,
    modal: PropTypes.bool,
    handleToggleModal: PropTypes.func
  }

  render() {
    return (
      <Modal isOpen={ this.props.modal } toggle={ this.props.handleToggleModal } size="lg" >
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="editDeviceId" sm={2}>Device ID</Label>
              <Col sm={10}>
                <Input type="text" name="editDeviceId" id="editDeviceId" value={this.props.data.id} disabled />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="editModel" sm={2}>Model</Label>
              <Col sm={10}>
                <Input type="text" name="editModel" id="editModel" value={this.props.data.model} disabled />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="editStatus" sm={2}>Status</Label>
              <Col sm={10}>
                <Input type="text" name="editStatus" id="editStatus" value={this.props.data.status} disabled />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="editMachineTemp" sm={2}>Machine Temp</Label>
              <Col sm={10}>
                <Input type="text" name="editMachineTemp" id="editMachineTemp" value={this.props.data.temperature} disabled />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="editAddress" sm={2}>Address</Label>
              <Col sm={10}>
                <Input type="text" name="editAddress" id="editAddress" value={this.props.data.address} disabled />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="editRegion" sm={2}>Region</Label>
              <Col sm={10}>
                <Input type="text" name="editRegion" id="editRegion" value={this.props.data.region} disabled />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <button onClick={this.props.handleToggleModal}>Close</button>
        </ModalFooter>
      </Modal>
    )
  };
}

export default DetailModal;