import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './TodosPage.css';
import Todo from '../Components/Todo'

export default function TodosPage() {
    const [todos, setTodos] = useState([]);
    const todoNameRef = useRef();

    useEffect(() => {
        fetch('/api/getTodoList', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }).then(response => response.json()).then(data => {
            const storedTodos = data;
            if(storedTodos) setTodos(storedTodos)
          })
    }, [])

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

  return (
    <>
      <div className='todoContainer'>
        <p>CRUD todo list</p>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        <input ref={todoNameRef} type='text' placeholder='Insert Text' />
        <button onClick={handleAddTodo}>Add Todo</button>
        <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      </div>
    </>
  )
}

const TodoList=({todos, toggleTodo, deleteTodo}) => {
  return (
    todos.map(todo => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo} todo={todo} />
    })
  )
}
