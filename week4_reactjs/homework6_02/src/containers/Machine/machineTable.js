import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../style.scss';
import MachineData from '../../machineData.json'
import Machine from '../Machine/machine';
import 'bootstrap/dist/css/bootstrap.css';

class MachineTable extends Component {
  state = {
    machines: []
  }
  componentDidMount() {
    const machines = Object.assign([], MachineData);
    this.setState({ machines });
  }
  handleMachineEdit = (id) => {
    this.state.machines.forEach(item => {
      if (item.id === id) {
        item.isDisabled = false;
      } else {
        item.isDisabled = true;
      }
      item.isEdit = true;
    });
    this.setState({ machines: this.state.machines });
  }
  handleMachineDelete = (id) => {
    const machines = this.state.machines.filter(item => item.id !== id);
    this.setState({ machines });
  }
  handleMachineCancel = () => {
    this.state.machines.forEach(item => {
      item.isDisabled = false;
      item.isEdit = false;
    });
    this.setState({ machines: this.state.machines });
  }
  handleMachineUpdate = (id, editRow) => {
    const machines = this.state.machines.map(item => {
      if(item.id === id) {
        item.address = editRow.address;
        item.region = editRow.region;
      }
      item.isDisabled = false;
      item.isEdit = false;
      return item;
    });
    this.setState({ machines });
  }

  render() {
    const machine = this.state.machines.map(item => 
     <Machine 
      key={ Math.random() } 
      data={ item }
      onMachineUpdate={ this.handleMachineUpdate } 
      onMachineDelete={ this.handleMachineDelete }
      onMachineEdit={ this.handleMachineEdit }
      onMachineCancel={ this.handleMachineCancel } />);

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Device ID</th>
              <th scope="col">Model</th>
              <th scope="col">Status</th>
              <th scope="col">Machine Temp</th>
              <th scope="col">Address</th>
              <th scope="col">Region</th>
              <th scope="col">Details</th>
              <th scope="col">Setup</th>
            </tr>
          </thead>
          <tbody>
            { machine }
          </tbody>
        </table>
      </div>
    );
  }
}

export default MachineTable;