import React from 'react';
import PropTypes from 'prop-types';

class TodoFooter extends React.Component {

  handleAll = () => {
    this.props.onClickAll();
  }
  handleActive = () => {
    this.props.onClickActive();
  }
  handleCompleted = () => {
    this.props.onClickCompleted();
  }
  render() {
    return (
      <div>
        <span>{this.props.data.todoList.length}</span>
        <button onClick={this.handleAll}>all</button>
        <button onClick={this.handleActive}>active</button>
        <button onClick={this.handleCompleted}>completed</button>
        <span>{this.props.data.currentGroupType}</span>
      </div>
    );
  }
}

export default TodoFooter;
