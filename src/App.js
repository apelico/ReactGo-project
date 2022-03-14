import { useState, useRef, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef();

  useEffect(() => {
    //const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    //if(storedTodos) setTodos(storedTodos)

    fetch('/api/getTodoList', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json()).then(data => {
      const storedTodos = data;
      if(storedTodos) setTodos(storedTodos)
    })

  }, [])

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e) {
    const name = todoNameRef.current.value

    if (name === '') return

    setTodos(prevTodos => {
      var newTodo = { id: uuidv4(), name: name, status: false}

      fetch('/api/addTodo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      })

      return [...prevTodos, newTodo]
    })
    todoNameRef.current.value = null
  }

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.status = !todo.status

    fetch('/api/updateTodo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })

    setTodos(newTodos)
  }

  function deleteTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)

    console.log("Delte")

    fetch('/api/deleteTodo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })

    newTodos.pop(todo)

    setTodos(newTodos)
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.status)
    setTodos(newTodos)
  }

  return (
    <>
    <div>Testing stuff 2020</div>
    <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    <input ref={todoNameRef} type='text' />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Remove Todos</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
    
  )
}

export default App;
