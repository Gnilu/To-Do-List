import React, { useState } from 'react'
import './App.css'
import axios from 'axios'

function Create({onAdd}) {
  const [task, setTask] =useState('');

  const handleAdd = () => {
     if (task.trim() !== ''){ 
     axios.post('http://localhost:3001/add', {task})
     .then(result => {
       onAdd(result.data);
       setTask('')
     })
     .catch(err => console.log(err))
   }
  // console.log('Task added:', task);
  // setTask('');
}
  return (
    <div className="create_form">
        <input type='text'  placeholder='Enter task' value={task} onChange={(e) => setTask(e.target.value)} />
       
        <button type='button' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create