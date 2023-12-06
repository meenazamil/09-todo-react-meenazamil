import React, { Component } from 'react';
import './Todo.css';
// import Todo from './Todo'
// const apiKey = "fc5271-401de2-efb177-2beee1-c931c4";
// const apiUrl = "https://cse204.work/todos";

class Todo extends Component {
  constructor(props){
    super(props);

  }


  render(){
    return (
      <div id={this.props.id} className="todo">
          <input onChange={this.props.handleComplete} className="checkboxclass" type="checkbox" checked={this.props.completed}></input>
          <p className="todoText">{this.props.text}</p>
          <button onClick={this.props.handleDelete} className="deleteButton">Delete</button>
      </div>
    );  
  }
}

export default Todo;
