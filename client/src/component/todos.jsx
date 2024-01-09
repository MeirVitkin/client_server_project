import React, { useEffect, useState } from 'react'
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import UpdateContent from './UpdateContent';
import AddContent from './AddContent';
import axios from 'axios'
import Home from './home';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [editing, setEditing] = useState(null);

    const { id, username, website } = JSON.parse(localStorage.getItem('currentUser'))
    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/todos/${id}`,
                {
                    headers:{
                        Authorization:`${username}:${website}`   
                    }
                 }
            )
            setTodos(data);
        } catch (e) {
            console.log(e);
        }

    }
    const handleCheck = async (todoId) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/todos/check/${id}?id=${todoId}`,null,
                {
                    headers:{
                        Authorization:`${username}:${website}`   
                    }
                 }
            )
            fetchTodos()
        } catch (error) {

        }
    };
    const handleDelete = async (todoId) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/todos/${id}?id=${todoId}`,
                {
                    headers:{
                        Authorization:`${username}:${website}`   
                    }
                 }
            )
            fetchTodos()
        } catch (error) {

        }
    };
    const handleUpdate = async (todo) => {
        setEditing(editing => (editing ? null : todo));
    };
    const handleUpdateContent = async (updatedTodo) => {
        const editTodoTitle = {
            id: updatedTodo.id,
            title: updatedTodo.title,
        }
        await axios.put(
            `http://localhost:8000/todos/edit/${id}`,
             editTodoTitle,
             {
                headers:{
                    Authorization:`${username}:${website}`   
                }
             }
        )
        fetchTodos()
        setEditing(null)
    };


    return (
        <div className='todoContainer'>
            <Home/>
            <h2>Todos</h2>
            <AddContent
                fetchTodos={fetchTodos}
             />
            {todos.map((todo, index) => (
                <div className='todoBox' key={index}>
                    <input
                        type="checkbox"
                        className='checkBox'
                        checked={todo.completed}
                        onChange={() => handleCheck(todo.id)}
                    />
                    <h3>Note.{todo.id}</h3>
                    {editing && editing.id === todo.id ? (
                        <UpdateContent
                            todo={todo}
                            onUpdate={handleUpdateContent}
                        />
                    ) : (
                        <div
                            className='updateContentClick'
                        >
                            <div style={(todo.completed) ? { textDecoration: 'line-through' } : null}>{todo.title}</div>
                        </div>
                    )}
                    <div className='todosIcons'>
                        <FaEdit
                            className='editIcon'
                            onClick={() => handleUpdate(todo)}
                            role="button"
                            tabIndex="0"
                            aria-label={`Edit`}
                        />
                        <FaTrashAlt
                            className='trashIcon'
                            onClick={() => handleDelete(todo.id)}
                            role="button"
                            tabIndex="0"
                            aria-label={`Delete`}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Todos