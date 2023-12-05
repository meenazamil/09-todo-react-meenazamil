import logo from './logo.svg';
import React, { Component } from 'react';
import './NewTodo.css';


class NewTodo extends Component{
  constructor(props){
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state={
      inputText: "",
    }
  }
  
  handleTextChange(event){
    this.setState({inputText: event.target.value});
    this.props.handleTextChange(event.target.value);
  }

  render() {
    return (
      <div id="formStyle">
          <form id="new-todo-form">
              <input type="text" id="new-todo-text" placeholder="What needs to be done?" onChange={this.handleTextChange} name="todo" required></input>
              <input onClick={this.props.createNewTodo} type="submit" id="new-todo-submit" value="Create"></input>
          </form>
      </div>
    );
  }
}


export default NewTodo;
