import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoItem from './TodoItem.js';
import TodoFooter from './TodoFooter.js';

const groupType = {
  all: 0,
  active: 1,
  completed: 2
}

class App extends Component {
  state = {
    currentGroupType: groupType.all,
    todoId: -1,
    todoText: "",
    todoGroup: groupType.active,
    todoList: [],
    todoAllList: []
  }
  onClickAll = () => {
    const currentGroupType = groupType.all;
    const todoList = this.state.todoAllList;
    this.setState({currentGroupType, todoList});
  }
  onClickActive = () => {
    const currentGroupType = groupType.active;

    const todoList = this.state.todoAllList.filter((item) => {
      return item.todoGroup === groupType.active;
    });

    this.setState({currentGroupType, todoList});
  }
  onClickCompleted = () => {
    const currentGroupType = groupType.completed;

    const todoList = this.state.todoAllList.filter((item) => {
      return item.todoGroup === groupType.completed;
    });

    this.setState({currentGroupType, todoList});
  }
  onClickTodoItemCheckBox = (data) => {

    const targetIndex = this.state.todoAllList.findIndex((item) => {
      return item.todoId === data.todoId;
    });
    let todoAllList = this.state.todoAllList;
    if (todoAllList[targetIndex].todoGroup !== groupType.completed) {
      todoAllList[targetIndex].todoGroup = groupType.completed;
    } else if (todoAllList[targetIndex].todoGroup !== groupType.active) {
      todoAllList[targetIndex].todoGroup = groupType.active;
    }
    const todoList = todoAllList;
    this.setState({todoList, todoAllList});
  }
  onClickTodoItemRemove = (data) => {
    
    const todoAllList = this.state.todoAllList.filter((item) => {
      return item.todoId !== data.todoId;
    });
    const todoList = todoAllList;
    this.setState({todoList, todoAllList});
  }
  handleAddTodoChange = (event) => {
    const todoText = event.target.value;
    this.setState({todoText});
  }
  handleAddTodoKeyDown = (event) => {
    if (event.keyCode !== 13) {
      return;
    }
    const todoId = this.state.todoId + 1;
    let todoText = this.state.todoText;
    const todoGroup = groupType.active;
    const item = { todoId, todoText, todoGroup };
    
    todoText = "";
    let todoAllList = this.state.todoAllList;
    todoAllList.push(item);
    const todoList = todoAllList;

    this.setState({todoId, todoText, todoList, todoAllList});
  }
  render() {
    const todoInput = (
      <input 
        className="addTodo"
        type="text"
        onChange={this.handleAddTodoChange}
        onKeyDown={this.handleAddTodoKeyDown}
        value={this.state.todoText}
      />
    );
    const todoItem = this.state.todoList.map((item) => {
      return <TodoItem key={item.todoId} 
       data={item} 
       onClickTodoItemCheckBox={this.onClickTodoItemCheckBox}
       onClickTodoItemRemove={this.onClickTodoItemRemove}/>;
    });
    const todoFooter = (
      <TodoFooter key={1} 
       data={this.state}
       onClickAll={this.onClickAll}
       onClickActive={this.onClickActive}
       onClickCompleted={this.onClickCompleted} />
    );
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
