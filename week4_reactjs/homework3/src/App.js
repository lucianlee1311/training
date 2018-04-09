import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import groupType from './groupType.js';
import TodoItem from './TodoItem.js';
import TodoFooter from './TodoFooter.js';

class App extends Component {
  state = {
    currentGroupType: groupType.all,
    todoText: "",
    todoList: [],
  }
  onClickGroupTypeButton = (currentGroupType) => {
    this.setState({ currentGroupType });
  }
  onClickClearCompleted = () => {
    const todoList = this.state.todoList.filter(item => item.todoGroup !== groupType.completed);
    this.setState({ todoList });
  }
  onClickTodoItemCheckBox = (targetTodoId) => {
    const targetIndex = this.state.todoList.findIndex(item => item.todoId === targetTodoId);
    let todoGroup;
    if (this.state.todoList[targetIndex].todoGroup !== groupType.completed) {
      todoGroup = groupType.completed;
    } else if (this.state.todoList[targetIndex].todoGroup !== groupType.active) {
      todoGroup = groupType.active;
    }
    this.state.todoList[targetIndex] = {...this.state.todoList[targetIndex], todoGroup: todoGroup };
    this.setState({ todoList: [...this.state.todoList] });
  }
  onClickTodoItemRemove = (targetTodoId) => {
    const todoList = this.state.todoList.filter(item => item.todoId !== targetTodoId);
    this.setState({ todoList });
  }
  handleAddTodoChange = (event) => {
    const todoText = event.target.value;
    this.setState({ todoText });
  }
  handleAddTodoKeyDown = (event) => {
    if (event.keyCode !== 13) {
      return;
    }
    const todoId = Math.random();
    let todoText = this.state.todoText;
    const todoGroup = groupType.active;
    const item = { todoId, todoText, todoGroup };
    todoText = "";
    const todoList = this.state.todoList;
    this.setState({ todoText, todoList: [...todoList, item] });
  }
  render() {
    const todoItem = this.state.todoList
      .filter((item) => {
        if (this.state.currentGroupType === groupType.all) {
          return true;
        }
        return item.todoGroup === this.state.currentGroupType;
      })
      .map(item => (<TodoItem key={item.todoId} 
        data={item} 
        onClickTodoItemCheckBox={this.onClickTodoItemCheckBox}
        onClickTodoItemRemove={this.onClickTodoItemRemove} />));
    
    return (
      <div className="App">
        {(<input
          className="todo-input"
          type="text"
          placeholder="What needs to be done?"
          onChange={this.handleAddTodoChange}
          onKeyDown={this.handleAddTodoKeyDown}
          value={this.state.todoText} />)}
        {todoItem}
        {(<TodoFooter
          onClickGroupTypeButton={this.onClickGroupTypeButton}
          onClickClearCompleted={this.onClickClearCompleted}
          currentGroupType={this.state.currentGroupType}
          todoList={this.state.todoList} />)}
      </div>
    );
  }
}

export default App;
