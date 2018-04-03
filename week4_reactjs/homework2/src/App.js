import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from './Profile.js';

class App extends Component {
  state = {
    current: 0
  }
  handleClick() {
    let number = this.state.current;
    const current = number += 1;
    this.setState({current});
  }
  onClickProfile = (number) => {
    const current = number -= 1;
    this.setState({current});
  }

  //-----lifecycle start-----
  // componentWillMount() {
  //   console.log('component Will Mount');
  // }
  componentDidMount() {
    console.log('component Did Mount');

    this.input.focus();
    
    fetch('https://lucianjson.herokuapp.com/machine')
    .then(res => res.json())
    .then((data) => {
      const current = data.length;
      this.setState({current});
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('should Component Update');
    // console.log('nextProps', nextProps);
    // console.log('nextState', nextState);
    return nextState.current !== this.state.current; //true;
  }
  // componentWillUpdate(nextProps, nextState) {
  //   console.log('should Will Update');
  //   // console.log('nextProps', nextProps);
  //   // console.log('nextState', nextState);
  // }
  componentDidUpdate(prevProps, prevState) {
    console.log('should Did Update');
    // console.log('prevProps', prevProps);
    // console.log('prevState', prevState);
  }

  componentWillUnmount() {
    console.log('component Will Unmount');
  }
  //-----lifecycle end-----

  render() {
    console.log('render');
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
          <input ref={(item) => this.input = item}/>
          <div><Profile number={this.state.current} onClickProfile={this.onClickProfile} /></div>
          <p>{(this.state.current)}</p>
          <button onClick={this.handleClick.bind(this)}>
            Click
          </button>
        </div>
      </div>
    );
  }
}

export default App;
