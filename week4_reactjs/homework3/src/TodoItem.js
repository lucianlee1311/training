import React from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';
import groupType from './groupType.js';

class TodoItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      todoId: PropTypes.number, 
      todoText: PropTypes.string, 
      todoIsCompleted: PropTypes.boolean,
    }),
    onClickTodoItemCheckBox: PropTypes.func,
    onClickTodoItemRemove: PropTypes.func,
  }
  handleCheckbox = () => {
    this.props.onClickTodoItemCheckBox(this.props.data.todoId);
  }
  handleRemove = () => {
    this.props.onClickTodoItemRemove(this.props.data.todoId);
  }
  render() {
    return (
      <div className="todo-item">
        <input 
         type="checkbox" 
         onClick={this.handleCheckbox} 
         defaultChecked={this.props.data.todoIsCompleted === true}
        />
        <div className="todo-text-group">
          <span>{this.props.data.todoText}</span>
          <button onClick={this.handleRemove}>remove</button>
        </div>
      </div>
    );
  }
}

export default TodoItem;
