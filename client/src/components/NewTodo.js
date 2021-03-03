import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { useProgress } from '../contexts/progressContext';
import { useTodo } from '../contexts/todoContext';

import { createTodo } from '../api/todo';

const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
}));

const NewTodo = () => {
  const [todos, setTodos] = useTodo();
  const [text, setText] = useState('');
  const [, setProgress] = useProgress();
  const classes = useStyles();

  const onSubmit = async (event) => {
    event.preventDefault();
    setProgress(true);
    const newTodo = await createTodo(text.trim());
    if (newTodo) {
      setTodos([...todos, newTodo]);
      setText('');
    }
    setProgress(false);
  };

  return (
    <form onSubmit={onSubmit} style={{ marginTop: 8, marginBottom: 8 }}>
      <TextField
        variant='outlined'
        value={text}
        onChange={(e) => setText(e.target.value)}
        helperText={`${text.length}/140`}
        inputProps={{
          maxLength: 140,
        }}
        InputProps={{
          classes: { input: classes.input },
        }}
        error={text.length === 140}
        fullWidth
      />
    </form>
  );
};

export default NewTodo;
