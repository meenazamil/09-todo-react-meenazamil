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
        self.setState((prevState) => ({
          todos: [JSON.parse(this.responseText), ...prevState.todos],
        }));
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
  let request = new XMLHttpRequest();
  let self = this;
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {

      //as soon as we update the state, the component will re-render
      //you can't update the style here, because the component hasn't re-rendered yet
      // const label = event.target.parentElement.querySelector('.todoText');
      // label.style.opacity = event.target.checked ? '.2' : '1'; 
      const responseData = JSON.parse(this.responseText);

      //we have a list of todos stored in state
      //we need to find the todo that was updated, and remove it from the list
      //and then add the updated todo to the list
      let updateId = event.target.parentElement.id;
      const updatedTodos = self.state.todos.filter(todo => todo.id !== updateId);
      updatedTodos.push(responseData);

      self.setState({ todos: updatedTodos });
    }
  }
  let data = {
    completed: event.target.checked,
  }
  request.open("PUT", apiUrl+"/" +event.target.parentElement.id, true);
  request.setRequestHeader("x-api-key", apiKey);
  request.setRequestHeader("Content-type", "application/json");

  request.send(JSON.stringify(data));
  // console.log(event.taret.checked);

}

  
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
    const sortedTodos = this.state.todos.sort((a, b) => a.text.localeCompare(b.text));

    return (
      <div className="entirePage">
        <NewTodo  createNewTodo={this.createNewTodo}/>
        <div id="todo-list">
          {
            sortedTodos.map((todo) =>
              <Todo handleDelete={this.handleDelete} handleComplete={this.handleComplete} key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} todos={this.state.todos} remove={this.removeDeleted}/>
            )
          }
        </div>
      </div> 
     
    );
  }
}

export default App;
