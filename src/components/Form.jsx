import { Button, Paper, TextField } from '@mui/material'; //lib
import React, { useState } from 'react';

const Form = ({ addTask }) => {  //create states using useState: text and id
  const [text, setText] = useState('');
  const [id, setId] = useState(0);

  const todoCreate = (text) => { //add new task
    if (!text.trim()) return;  // avoids adding empty tasks

    const todoObj = { text: text, id: id };  // creates a object with text and id properties
    setId(id + 1);  //guarantees unique identifiers
    addTask(todoObj); //  calls the function passing an object as an argument
    setText('');  // clear the text
  };

 return ( //  returns the JSX that represents the form
    <Paper className='formContainer'>
      <div className='formContente'>
        <TextField 
          id="outlined-basic" 
          label="Tarefas" 
          variant="outlined" 
          onChange={(e) => setText(e.target.value)} 
          value={text}
          fullWidth 
          required
        />
        <Button variant="text" onClick={ () => todoCreate(text) }>Add</Button>
      </div>
    </Paper>
  );
};

export default Form;