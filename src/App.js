import logo from './logo.svg';
import './App.css';
import Todo from './Todo.js'
import NewTodo from './NewTodo';

function App() {
  // const [todos, setTodos] = useStates();
  
  return (
    <div className="entirePage">
      <NewTodo/>
      <div id="todo-list">
        <Todo/>
      </div>
    </div>
   
  );
}

export default App;
