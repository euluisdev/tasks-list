import { Container, List } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Form from '../components/Form';
import TodoItem from '../components/TodoItem';

const Home = () => {
    const [todos, setTodos] = useState([]);  //Sets the 'todos' state to store tasks

    //this adds a new task to the  'todos' state
    const addTask = (item) => {
        
        //  using current time as unique ID
        const newItem = { id: new Date().getTime(), text: item.text };
        setTodos([newItem, ...todos]);
    };

    //deletes a task based on the ID
    const deleteTask = (id) => {
        let filtered = todos.filter((item) => item.id !== id);
        setTodos(filtered);  //  Update the 'todos' status with the filtered list
    };

    //edits the  text of a task based on the ID
    const editeTask = (id, editedText) => {
        setTodos((prevTodos) =>
            prevTodos.map((newTodo) =>  //maps tasks and returns a new list with the edited task
                newTodo.id === id ? { ...newTodo, text: editedText } : newTodo
            )
        );
    };

    //effect for saving and loading data from localStorage
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        if (storedTodos.length > 0) {
            setTodos(storedTodos);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    //render
    return (
        <Container maxWidth='xs' className='container'>
            <Form addTask={addTask} />
            <List className='listLi' sx={{ marginTop: '1em' }}>

                {todos.map((item) => (

                    <div key={item.id} className='todoItem'>
                        <TodoItem editeTask={editeTask} item={item} deleteTask={deleteTask} />
                    </div>
                ))}
            </List>
        </Container>
    );
};

export default Home;