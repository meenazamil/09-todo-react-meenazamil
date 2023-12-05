import React, { Component } from 'react';
import './Todo.css';
// import Todo from './Todo'
const apiKey = "fc5271-401de2-efb177-2beee1-c931c4";
const apiUrl = "https://cse204.work/todos";

class Todo extends Component {
  constructor(props){
    super(props);

    // this.state = {
    //   // text:props.text,
    //   // id:props.id,
    //   // completed:props.completed,
    //   // todos:props.todos,
    // }
    // this.handleDelete = this.handleDelete.bind(this);
    // this.handleComplete = this.handleComplete.bind(this);
  }

//   handleComplete(event){
//         // console.log("here");  
//    let request = new XMLHttpRequest();
//     let self = this;
//    request.onreadystatechange = function () {
//        if (this.readyState === 4 && this.status === 200) {
//         const label = event.target.parentElement.querySelector('.todoText');
//         label.style.opacity = event.target.checked ? '.2' : '1'; 
//         const responseData = JSON.parse(this.responseText);

//         self.setState({ completed: responseData.completed });
//        }
//    }

//   //  console.log(apiUrl+"/" +event.target.parentElement.dataset.todoId);
//   let data = {
//     completed: event.target.checked,
// }

//    request.open("PUT", apiUrl+"/" +this.props.id, true);
//    request.setRequestHeader("x-api-key", apiKey);
//    request.setRequestHeader("Content-type", "application/json");

//     request.send(JSON.stringify(data));
//   }
  
//   handleDelete() {
//   // let url = apiUrl + this.state.id;
//   let request = new XMLHttpRequest();
//   let self = this;
//   request.onreadystatechange = function () {
//       if (this.readyState === 4 && this.status === 200) {
//           console.log(this.responseText);
//           const updatedTodos = self.state.todos.filter(todo => todo.id !== self.state.id);
//           self.setState({ todos: updatedTodos });
//       }
//   }

//   console.log(apiUrl+"/" +this.state.id);
//   request.open("DELETE", apiUrl+"/" +this.state.id, true);
//   request.setRequestHeader("x-api-key", apiKey);
//   request.setRequestHeader("Content-type", "application/json");

//   request.send();
//   }

  render(){
    // let cc = '';
    // if(this.props.completed === true){
    //   cc = "completed";
    // }
    return (
      <div id={this.props.id} className="todo">
          <input onChange={this.props.handleComplete} className="checkboxclass" type="checkbox" checked={this.props.checked}></input>
          <p className="todoText">{this.props.text}</p>
          <button onClick={this.props.handleDelete} className="deleteButton">Delete</button>
      </div>
    );  
  }
}

export default Todo;
