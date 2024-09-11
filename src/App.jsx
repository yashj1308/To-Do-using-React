import { useState, useEffect } from 'react'
import {Todoprovider } from "./context"
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

  const [todos, setTodos] = useState([])

  const addTodo = (todo)=>{
    setTodos((prev)=>[{id: Date.now(), ...todo}, ...prev])
  }

  const updatedTodo = (id, todo)=>{
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id)=>{
    setTodos((prev) => prev.filter((todo)=>todo.id!==id))
  }

  const toggleComplete = (id)=>{
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id===id? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(() => {
    const todosData = localStorage.getItem("todos");
    try {
      const todos = todosData ? JSON.parse(todosData) : [];
      if (todos && Array.isArray(todos) && todos.length > 0) {
        setTodos(todos);
      }
    } catch (error) {
      console.error("Failed to parse todos from localStorage:", error);
    }
  }, []);
  
  
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <Todoprovider value={{todos, addTodo, updatedTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#212121] min-h-screen py-8">
        <div className=" bg-[#333333] w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
              {/* Todo form goes here */} 
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((todo)=>(
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo}/>
                </div>
              ))}
            </div>
        </div>
      </div>
    </Todoprovider>
  )
}

export default App
