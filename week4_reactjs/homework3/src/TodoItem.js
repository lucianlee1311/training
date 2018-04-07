import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {

  handleCheckbox = () => {
    this.props.onClickTodoItemCheckBox(this.props.data);
  }
  handleRemove = () => {
    this.props.onClickTodoItemRemove(this.props.data);
  }
  render() {
    return (
      <div>
        <input type="checkbox" onClick={this.handleCheckbox}/>
        <span>{this.props.data.todoText}</span>
        <button onClick={this.handleRemove}>remove</button>
      </div>
    );
  }
}

export default TodoItem;
