import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../../style.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input, FormText } from 'reactstrap';

class Machine extends Component {
  static propTypes = {
    data: PropTypes.object,
    onMachineUpdate: PropTypes.func
  }
  state = {
    modal: false,
    shown: true,
    address: "",
    region: ""
  }
  componentDidMount() {

  }
  handleAddressChange = (event) => {
    this.setState({ address:　event.target.value });
  }
  handleRegionChange = (event) => {
    this.setState({ region: event.target.value });
  }
  handleEdit = () => {
    this.setState({ shown: !this.state.shown });
  }
  handleDelete = () => {
    this.props.onMachineDelete(this.props.data.id);
  }
  handleCancel = () => {
    this.setState({
      shown: !this.state.shown, 
      address: this.props.data.address, 
      region: this.props.data.region 
    });
  }
  handleCheck = () => {
    const address = this.state.address === "" ? this.props.data.address : this.state.address;
    const region = this.state.region === "" ? this.props.data.region : this.state.region;
    const editRow = { address, region };
    this.props.onMachineUpdate(this.props.data.id, editRow);
    this.setState({ shown: !this.state.shown });
  }
  handleToggleModal = () => {
    this.setState({ modal: !this.state.modal });
  }
  render() {
    const address = this.state.address === "" ? this.props.data.address : this.state.address;
    const region = this.state.region === "" ? this.props.data.region : this.state.region;
		const shown = {
			display: this.state.shown ? "inline-block" : "none"
		};
		const hidden = {
			display: this.state.shown ? "none" : "inline-block"
    };
    
    return (
      <tr>
        <th scope="row">{ this.props.data.id }</th>
        <td>{ this.props.data.model }</td>
        <td>{ this.props.data.status }</td>
        <td>{ this.props.data.temperature }</td>
        <td>
          <span style={ shown }>{ this.props.data.address }</span>
          <input style={ hidden }
            onChange={ this.handleAddressChange }
            value={ address }/>
        </td>
        <td>
          <span style={ shown }>{ this.props.data.region }</span>
          <input style={ hidden }
            onChange={ this.handleRegionChange }
            value={ region }/>
        </td>
        <td>
          <button style={ shown } onClick={ this.handleToggleModal }>detail</button>
        </td>
        <td>
          <button style={ shown } onClick={ this.handleEdit }>edit</button>
          <button style={ shown } onClick={ this.handleDelete }>remove</button>
          <button style={ hidden } onClick={ this.handleCancel }>cancel</button>
          <button style={ hidden } onClick={ this.handleCheck }>check</button>
        </td>
        <Modal isOpen={ this.state.modal } toggle={ this.handleToggleModal } size="lg" >
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
            <button onClick={this.handleToggleModal}>Close</button>
          </ModalFooter>
        </Modal>
      </tr>
    );
  }
}

export default Machine;