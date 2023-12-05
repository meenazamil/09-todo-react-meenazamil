import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Todo from './Todo.js'
import NewTodo from './NewTodo';
// import { useEffect } from 'react/cjs/react.production.min';

const apiKey = "fc5271-401de2-efb177-2beee1-c931c4";
const apiUrl = "https://cse204.work/todos";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputText:"",
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.createNewTodo = this.createNewTodo.bind(this);
  }

  handleTextChange(inputtedText){
    this.setState({inputText:inputtedText});
  }

  createNewTodo(event){
    event.preventDefault();
    let self = this;
    let data = {
      text: this.state.inputText,
    };
    let stringed = JSON.stringify(data);
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (this.readyState === 4 && this.responseText === 200){
        self.setState({
          todos: [...self.state.todos, JSON.parse(this.responseText)]
        })
      }
    }
    req.open("POST", apiUrl, true);
    req.setRequestHeader("x-api-key", apiKey);
    req.setRequestHeader("Content-type", "application/json");
    req.send(stringed);
  }

  componentDidMount(){
    let self = this;
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        self.setState({todos: JSON.parse(this.responseText)});
      } 
    }
    request.open("GET", apiUrl, true);
    request.setRequestHeader("x-api-key", apiKey);
    // request.setRequestHeader("Content-type", "application/json");
    request.send();
  }

  render(){
    return (
      <div className="entirePage">
        <NewTodo handleTextChange={this.handleTextChange} createNewTodo={this.createNewTodo}/>
        <div id="todo-list">
          {
            this.state.todos.map((todo) =>
              <Todo key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} todos={this.state.todos} remove={this.removeDeleted}/>
            )
          }
        </div>
      </div> 
     
    );
  }
}

export default App;
