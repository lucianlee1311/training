import React from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';

class TodoItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({ 
      todoId: PropTypes.number, 
      todoText: PropTypes.string, 
      todoGroup: PropTypes.number,
    }),
    onClickTodoItemCheckBox: PropTypes.func,
    onClickTodoItemRemove: PropTypes.func,
  }
  handleCheckbox = () => {
    this.props.onClickTodoItemCheckBox(this.props.data);
  }
  handleRemove = () => {
    this.props.onClickTodoItemRemove(this.props.data);
  }
  render() {
    return (
      <div className="todo-item">
        <input 
         type="checkbox" 
         onClick={this.handleCheckbox} 
         defaultChecked={this.props.data.todoGroup === this.props.groupType.completed}
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
