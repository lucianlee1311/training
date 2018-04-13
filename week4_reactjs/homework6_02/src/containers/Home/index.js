import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MachineTable from '../Machine/machineTable';

class Home extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <MachineTable />
      </div>
    );
  }
}

export default Home;