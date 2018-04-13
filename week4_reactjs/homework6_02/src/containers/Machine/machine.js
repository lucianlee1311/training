import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './machine.scss';
import DetailModal from './DetailModal';

class Machine extends Component {
  static propTypes = {
    data: PropTypes.object,
    onMachineUpdate: PropTypes.func,
    onMachineDelete: PropTypes.func,
    onMachineEdit: PropTypes.func,
    onMachineCancel: PropTypes.func,
  }
  state = {
    modal: false,
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
    this.props.onMachineEdit(this.props.data.id);
  }
  handleDelete = () => {
    this.props.onMachineDelete(this.props.data.id);
  }
  handleCancel = () => {
    this.props.onMachineCancel();
    this.setState({
      address: this.props.data.address, 
      region: this.props.data.region 
    });
  }
  handleCheck = () => {
    const address = this.state.address === "" ? this.props.data.address : this.state.address;
    const region = this.state.region === "" ? this.props.data.region : this.state.region;
    const editRow = { address, region };
    this.props.onMachineUpdate(this.props.data.id, editRow);
  }
  handleToggleModal = () => {
    this.setState({ modal: !this.state.modal });
  }
  render() {
    const address = this.state.address === "" ? this.props.data.address : this.state.address;
    const region = this.state.region === "" ? this.props.data.region : this.state.region;

    let classShown; 
    let classHidden; 
    if (this.props.data.isEdit) {
      if (this.props.data.isDisabled) {
        classShown = 'edit-active-shown';
        classHidden = 'edit-active-hidden';
      } else {
        classShown = 'edit-active-hidden';
        classHidden = 'edit-active-shown';
      }
    } else {
      classShown = 'edit-active-shown';
      classHidden = 'edit-active-hidden';
    }
    
    return (
      <tr>
        <th scope="row">{ this.props.data.id }</th>
        <td>{ this.props.data.model }</td>
        <td>{ this.props.data.status }</td>
        <td>{ this.props.data.temperature }</td>
        <td>
          <span className={ classShown }>{ this.props.data.address }</span>
          <input className={ classHidden }
            onChange={ this.handleAddressChange }
            value={ address }/>
        </td>
        <td>
          <span className={ classShown }>{ this.props.data.region }</span>
          <input className={ classHidden }
            onChange={ this.handleRegionChange }
            value={ region }/>
        </td>
        <td>
          <button disabled={this.props.data.isDisabled} className={ classShown } onClick={ this.handleToggleModal }>detail</button>
        </td>
        <td>
          <button disabled={this.props.data.isDisabled} className={ classShown } onClick={ this.handleEdit }>edit</button>
          <button disabled={this.props.data.isDisabled} className={ classShown } onClick={ this.handleDelete }>remove</button>
          <button className={ classHidden } onClick={ this.handleCancel }>cancel</button>
          <button className={ classHidden } onClick={ this.handleCheck }>check</button>
        </td>

        <DetailModal 
          data={this.props.data} 
          modal={this.state.modal} 
          handleToggleModal={this.handleToggleModal} />
      </tr>
    );
  }
}

export default Machine;