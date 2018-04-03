import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from './Profile.js';

class App extends Component {
  state = {
    current: 0,
    list: []
  }
  componentDidMount() {
    const list = Array.from(Array(10), (val,index) => { 
      return {id: index+1, current: index+1};
    });
    this.setState({list});
  }
  myButtonEvent = () => {
    const current = this.state.current += 1;
    this.setState({current});
  }
  onClickProfile = (data) => {
    const dataIndex = this.state.list.findIndex(item => item.id === data.id);
    const list = this.state.list.slice();
    list[dataIndex].current += 1;
    this.setState({list});
  }
  render() {
    return (
      <div className="App">
        <div>{this.state.list.map((item) =><Profile key={item.id} number={item.current} data={item} onClickProfile={this.onClickProfile}/>)}</div>
        <button onClick={this.myButtonEvent}>app click</button>
      </div>
    );
  }
}

export default App;
