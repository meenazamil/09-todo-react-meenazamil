import logo from './logo.svg';
import './NewTodo.css';
// import Todo from './Todo'

function NewTodo() {
  return (
    <div id="formStyle">
        <form id="new-todo-form">
            <input type="text" id="new-todo-text" placeholder="What needs to be done?" name="todo"></input>
            <input type="submit" id="new-todo-submit" value="Create"></input>
        </form>
    </div>
  );
}

export default NewTodo;
