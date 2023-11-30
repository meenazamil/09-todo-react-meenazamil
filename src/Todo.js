import logo from './logo.svg';
import './Todo.css';
// import Todo from './Todo'

function Todo() {
  return (
        <li id="1234" className="todo">
            <input className="checkboxclass" type="checkbox"></input>
            <label className="todoText">testing</label>
            <button className="deleteButton">Delete</button>
        </li>
  );
}

export default Todo;
