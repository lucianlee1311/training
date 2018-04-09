import React from 'react';
import PropTypes from 'prop-types';
import './TodoFooter.css';

class TodoFooter extends React.Component {
  static propTypes = {
    groupType: PropTypes.number,
    data: PropTypes.shape({
      currentGroupType: PropTypes.string,
      hasCompletedItem: PropTypes.boolean,
      todoList: PropTypes.array,
    }),
    onClickAll: PropTypes.func,
    onClickActive: PropTypes.func,
    onClickCompleted: PropTypes.func,
    onClickClearCompleted: PropTypes.func,
  }
  handleAll = () => {
    this.props.onClickAll();
  }
  handleActive = () => {
    this.props.onClickActive();
  }
  handleCompleted = () => {
    this.props.onClickCompleted();
  }
  handleClearCompleted = () => {
    this.props.onClickClearCompleted();
  }
  render() {
    const isAll = this.props.data.currentGroupType === this.props.groupType.all;
    const isActive = this.props.data.currentGroupType === this.props.groupType.active;
    const isCompleted = this.props.data.currentGroupType === this.props.groupType.completed;
    const hasCompletedItem = this.props.data.hasCompletedItem;

    return (
      <div className="todo-footer">
        <div className="todo-default-group">
          <span>{this.props.data.todoList.length} items left</span>
          <div className="todo-type-group">
            <button onClick={this.handleAll} className={ isAll ? 'footer-selected' : ''}>all</button>
            <button onClick={this.handleActive} className={ isActive ? 'footer-selected' : ''}>active</button>
            <button onClick={this.handleCompleted} className={ isCompleted ? 'footer-selected' : ''}>completed</button>
          </div>
        </div>
        <button onClick={this.handleClearCompleted} className={ hasCompletedItem ? 'footer-item-show' : 'footer-item-hide'}>clear completed</button>
      </div>
    );
  }
}

export default TodoFooter;
