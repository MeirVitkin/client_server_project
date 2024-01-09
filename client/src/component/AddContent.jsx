import {useState} from 'react'
import axios from 'axios'


const AddContent = ({fetchTodos}) => {
  const [newTodo, setNewTodo] = useState('');
  const { id, username, website, name } = JSON.parse(localStorage.getItem('currentUser'))

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (newTodo.trim() !== '') {
          const todoToAdd = {
            title: newTodo
          };
          try {
            await axios.post(
                `http://localhost:8000/todos/${id}` ,todoToAdd,
                {
                  headers:{
                      Authorization:`${username}:${website}`   
                  }
               }
               
               
            )
           setNewTodo('');
          } catch (error) {
            console.error('Error adding todo:', error);
          }
        }
        fetchTodos();
      };
  return (
    <form className='addTodoForm' onSubmit={handleAddTodo}>
          <input
            className='addTodo'
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder='Add todo...'
          />
          <button className='addTodoSubmit' type="submit">Add Todo</button>
    </form>
  )
}

export default AddContent