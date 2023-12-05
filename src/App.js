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
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleTextChange(inputtedText){
    this.setState({inputText:inputtedText});
  }

  createNewTodo(event){
    // this.setState({inputText: event.target.value});
    let newText = document.getElementById('new-todo-text').value;
    event.preventDefault();
    let self = this;
    let data = {
      text: newText,
    };
    let stringed = JSON.stringify(data);
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200){
        self.setState({
          todos: [...self.state.todos, JSON.parse(this.responseText)]
        })
      }
    }
    req.open("POST", apiUrl, true);
    req.setRequestHeader("x-api-key", apiKey);
    req.setRequestHeader("Content-type", "application/json");
    req.send(stringed);
    console.log(this.state.todos);
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
  handleComplete(event){
    // console.log("here");  
  let request = new XMLHttpRequest();
  let self = this;
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const label = event.target.parentElement.querySelector('.todoText');
      label.style.opacity = event.target.checked ? '.2' : '1'; 
      const responseData = JSON.parse(this.responseText);

      self.setState({ completed: responseData.completed });
    }
  }

  //  console.log(apiUrl+"/" +event.target.parentElement.dataset.todoId);
  let data = {
  completed: event.target.checked,
  }

  request.open("PUT", apiUrl+"/" +event.target.parentElement.id, true);
  request.setRequestHeader("x-api-key", apiKey);
  request.setRequestHeader("Content-type", "application/json");

  request.send(JSON.stringify(data));
}
// handleComplete(event){
//     let handleID = event.target.parentElement.id;
//     console.log(handleID);
//     console.log(this.readyState);
//     console.log(this.status);

//     event.preventDefault();
//     let request = new XMLHttpRequest();
//     let self = this;
//     request.onreadystatechange = function () {
//        if (this.readyState === 4 && this.status === 200) {
//         const label = event.target.parentElement.childNodes[0];
//         console.log(this.responseType);
//         label.style.opacity = event.target.checked ? '.2' : '1'; 
//         const responseData = JSON.parse(this.responseText);

//         self.setState({ completed: responseData.completed });
//        }
//     }

//    request.open("PUT", apiUrl+"/" + handleID, true);
//    request.setRequestHeader("x-api-key", apiKey);
//    request.setRequestHeader("Content-type", "application/json");
//    let data = {
//       completed: event.target.checked,
//     }

//     request.send(JSON.stringify(data));
//   }
  
  handleDelete(e) {
    e.preventDefault();
    let delId = e.target.parentElement.id;
    let request = new XMLHttpRequest();
    let self = this;
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            const updatedTodos = self.state.todos.filter(todo => todo.id !== delId);
            self.setState({ todos: updatedTodos });
        }
    }

    request.open("DELETE", apiUrl+"/" + delId, true);
    request.setRequestHeader("x-api-key", apiKey);
    request.setRequestHeader("Content-type", "application/json");

    request.send();
  }


  render(){
    return (
      <div className="entirePage">
        <NewTodo  createNewTodo={this.createNewTodo}/>
        <div id="todo-list">
          {
            this.state.todos.map((todo) =>
              <Todo handleDelete={this.handleDelete} handleComplete={this.handleComplete} key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} todos={this.state.todos} remove={this.removeDeleted}/>
            )
          }
        </div>
      </div> 
     
    );
  }
}

export default App;
