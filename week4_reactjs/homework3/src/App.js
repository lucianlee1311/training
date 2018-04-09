import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoItem from './TodoItem.js';
import TodoFooter from './TodoFooter.js';

const groupType = {
  all: 0,
  active: 1,
  completed: 2,
};

class App extends Component {
  state = {
    currentGroupType: groupType.all,
    hasCompletedItem: false,
    todoId: -1,
    todoText: '',
    todoGroup: groupType.active,
    todoList: [],
    todoAllList: [],
  }
  onClickAll = () => {
    const currentGroupType = groupType.all;
    const todoList = this.state.todoAllList;
    this.setState({ currentGroupType, todoList });
  }
  onClickActive = () => {
    const currentGroupType = groupType.active;
    const todoList = this.filterTodoListByGroupType(this.state.todoAllList, groupType.active, true);
    this.setState({ currentGroupType, todoList });
  }
  onClickCompleted = () => {
    const currentGroupType = groupType.completed;
    const todoList = this.filterTodoListByGroupType(this.state.todoAllList, groupType.completed, true);
    this.setState({ currentGroupType, todoList });
  }
  onClickClearCompleted = () => {
    const todoAllList = this.filterTodoListByGroupType(this.state.todoAllList, groupType.completed, false);
    let todoList = Object.assign([], todoAllList);
    if (this.state.currentGroupType !== groupType.all) {
      todoList = this.filterTodoListByGroupType(todoList, this.state.currentGroupType, true);
    }
    const hasCompletedItem = false;
    this.setState({ hasCompletedItem, todoList, todoAllList });
  }
  onClickTodoItemCheckBox = (data) => {
    const targetIndex = this.state.todoAllList.findIndex(item => item.todoId === data.todoId);
    const todoAllList = this.state.todoAllList;
    if (todoAllList[targetIndex].todoGroup !== groupType.completed) {
      todoAllList[targetIndex].todoGroup = groupType.completed;
    } else if (todoAllList[targetIndex].todoGroup !== groupType.active) {
      todoAllList[targetIndex].todoGroup = groupType.active;
    }

    let hasCompletedItem = false;
    const list = this.filterTodoListByGroupType(todoAllList, groupType.completed, true);
    if (list.length > 0) {
      hasCompletedItem = true;
    }

    let todoList = Object.assign([], todoAllList);
    if (this.state.currentGroupType !== groupType.all) {
      todoList = this.filterTodoListByGroupType(todoList, this.state.currentGroupType, true);
    }
    this.setState({ hasCompletedItem, todoList, todoAllList });
  }
  onClickTodoItemRemove = (data) => {
    const todoAllList = this.state.todoAllList.filter(item => item.todoId !== data.todoId);

    let todoList = Object.assign([], todoAllList);
    if (this.state.currentGroupType !== groupType.all) {
      todoList = this.filterTodoListByGroupType(todoList, this.state.currentGroupType, true);
    }
    this.setState({ todoList, todoAllList });
  }
  filterTodoListByGroupType = (list, type, isEqual) => {
    const todoList = list.filter((item) => {
      if (isEqual) {
        return item.todoGroup === type;
      }
      return item.todoGroup !== type;
    });
    return todoList;
  }
  handleAddTodoChange = (event) => {
    const todoText = event.target.value;
    this.setState({ todoText });
  }
  handleAddTodoKeyDown = (event) => {
    if (event.keyCode !== 13) {
      return;
    }
    const todoId = this.state.todoId + 1;
    let todoText = this.state.todoText;
    const todoGroup = groupType.active;
    const item = { todoId, todoText, todoGroup };

    todoText = '';
    const todoAllList = this.state.todoAllList;
    todoAllList.push(item);

    let todoList = Object.assign([], todoAllList);
    if (this.state.currentGroupType !== groupType.all) {
      todoList = this.filterTodoListByGroupType(todoList, this.state.currentGroupType, true);
    }
    this.setState({ todoId, todoText, todoList, todoAllList });
  }
  render() {
    const todoInput = (
      <input
        className="todo-input"
        type="text"
        placeholder="What needs to be done?"
        onChange={this.handleAddTodoChange}
        onKeyDown={this.handleAddTodoKeyDown}
        value={this.state.todoText} />);

    const todoItem = this.state.todoList.map(item => (<TodoItem key={item.todoId} 
       data={item} 
       onClickTodoItemCheckBox={this.onClickTodoItemCheckBox}
       onClickTodoItemRemove={this.onClickTodoItemRemove}
       groupType={groupType} />));
    
    const todoFooter = (
      <TodoFooter
        key={1}
        data={this.state}
        onClickAll={this.onClickAll}
        onClickActive={this.onClickActive}
        onClickCompleted={this.onClickCompleted}
        onClickClearCompleted={this.onClickClearCompleted}
        groupType={groupType} />);
    
    return (
      <div className="App">
        {todoInput}
        {todoItem}
        {todoFooter}
      </div>
    );
  }
}

export default App;
