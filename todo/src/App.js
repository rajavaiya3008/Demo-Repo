import { useDispatch, useSelector } from "react-redux";
import { addTodo, handleInput } from "./redux/slices/todo";

function App() {
  const dispatch = useDispatch()
  const todoItems = useSelector(state => state.todo.todoItems)
  const currTodo = useSelector(state => state.todo.input)
  console.log('todoItems', todoItems)

  const handleTodo = (e) => {
    dispatch(handleInput(e.target.value))
  }
  const pushTodo = () => {
    dispatch(addTodo({id:3,name:currTodo}))
  }
  const logout = () => {
    dispatch({type:'LOGOUT'})
  }

  return (
    <div className="">
      <label htmlFor="todo">Todos</label>
      <input 
      type="text"
      name="todo"
      id="todo"
      value={currTodo}
      onChange={(e) => handleTodo(e)}
      />
      <button onClick={pushTodo}>Add</button>
      <button onClick={logout}>Logout</button>
      {
        todoItems?.map((item,i) => {
          return <p key={i}>{item.name}</p>
        })
      }
    </div>
  );
}

export default App;
