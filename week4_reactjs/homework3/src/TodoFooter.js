import React from 'react';
import PropTypes from 'prop-types';
import './TodoFooter.css';
import groupType from './groupType.js';

class TodoFooter extends React.Component {
  static propTypes = {
    groupType: PropTypes.number,
    currentGroupType: PropTypes.number,
    todoList: PropTypes.array,
    onClickGroupTypeButton: PropTypes.func,
    onClickClearCompleted: PropTypes.func,
  }
  handleGroupTypeButton = (currentGroupType) => {
    this.props.onClickGroupTypeButton(currentGroupType);
  }
  handleClearCompleted = () => {
    this.props.onClickClearCompleted();
  }
  render() {
    const { currentGroupType, todoList } = this.props;
    const isAll = currentGroupType === groupType.all;
    const isActive = currentGroupType === groupType.active;
    const isCompleted = currentGroupType === groupType.completed;
    const hasCompletedItem = todoList.filter(item => item.todoIsCompleted === true).length > 0 ? true : false;
    let listLength = todoList.length;
    if (isActive) {
      listLength = todoList.filter(item => item.todoIsCompleted === false).length;
    } else if (isCompleted) {
      listLength = todoList.filter(item => item.todoIsCompleted === true).length;
    }

    return (
      <div className="todo-footer">
        <div className="todo-default-group">
          <span>{listLength} items left</span>
          <div className="todo-type-group">
            <button onClick={() => this.handleGroupTypeButton(groupType.all)} className={ isAll ? 'footer-selected' : '' }>all</button>
            <button onClick={() => this.handleGroupTypeButton(groupType.active)} className={ isActive ? 'footer-selected' : '' }>active</button>
            <button onClick={() => this.handleGroupTypeButton(groupType.completed)} className={ isCompleted ? 'footer-selected' : '' }>completed</button>
          </div>
        </div>
        <button onClick={this.handleClearCompleted} className={ hasCompletedItem ? '' : 'footer-item-hide'}>clear completed</button>
      </div>
    );
  }
}

export default TodoFooter;
