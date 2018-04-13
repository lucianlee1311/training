import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../style.scss';
import MachineTable from '../Machine/machineTable';
import 'bootstrap/dist/css/bootstrap.css';

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