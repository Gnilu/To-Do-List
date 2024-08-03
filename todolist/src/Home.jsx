import React, { useState, useEffect } from 'react'
import Create from './Create'
import './App.css'
import axios from 'axios'
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs';


function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err));
    }, [])

    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    const handleEdit = (id) => {
        if (!id) return;
        axios.put('http://localhost:3001/update/' +id)
        .then(result => {
            setTodos(todos.map(todo =>
                todo._id === id ? {...todo, done: !todo.done}: todo
            ));
        })
        .catch(err => console.log(err));
    }

    const handleDelete =(id) => {
        if(!id) return;
        axios.delete('http://localhost:3001/delete/' +id)
        .then(result => {
            setTodos(todos.filter(todo => todo._id !==id))
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='home'>
        <h2>Todo List</h2>
        <Create  onAdd={addTodo}/>
        {
            todos.length === 0 
            ?
            <div><h2>No Record</h2></div>
            : 
            todos.map((todo,index) => (
                <div className='task' key={index}>
                    <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                        {todo.done ?
                        <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                    : <BsCircleFill className='icon'/>
                    }
                    </div>
                    <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                    
                    
                    <div>
                    <span><BsFillTrashFill className='icon' 
                            onClick={() => handleDelete(todo._id)}/></span>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Home