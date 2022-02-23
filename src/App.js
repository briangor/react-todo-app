import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList.js';
import { v4 as uuidv4 } from 'uuid';
import './styles/App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  let updatedTodos = []

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))  
  },[todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      updatedTodos = [...prevTodos, { id: uuidv4(), name: name, complete: false}]
      
      return updatedTodos
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handleKeyPress(event) {
    if(event.key === 'Enter'){
      handleAddTodo()
    }
  }

  return (
    <>
      <div className="content">
        <label className="title">Todo</label><br/>
        <input ref={todoNameRef} type="text" className="input" onKeyPress={handleKeyPress} />
        <br/>
        <button onClick={handleAddTodo} className="add">Add Todo</button>
        <button onClick={handleClearTodos} className="clear">Clear Completed</button>
        <div className="status-msg">{todos.filter(todo => !todo.complete).length} left to do</div>
        <TodoList todoList={todos} toggleTodo={toggleTodo}/>
      </div>
    </>
  )
}

export default App;
