import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useProgress } from '../contexts/progressContext';
import { useTodo } from '../contexts/todoContext';

import TodoItem from './TodoItem';

import {
  deleteTodo,
  getAllTodos,
  setDueDate,
  toggleTodoComplete,
  updateTodoText,
} from '../api/todo';

// Todo container can filter todos by their states

const TodoContainer = () => {
  const [todos, setTodos] = useTodo();
  const [, setProgress] = useProgress();
  const [filter, setFilter] = useState('all');
  const [displayTodos, setDisplayTodos] = useState([]);

  useEffect(() => {
    let todosArr = [];
    switch (filter) {
      case 'complete':
        todosArr = todos.filter((todo) => todo.completedDate);
        break;
      case 'incomplete':
        todosArr = todos.filter((todo) => !todo.completedDate);
        break;
      case 'late':
        todosArr = todos.filter(
          (todo) => todo.dueDate && !dayjs().isBefore(dayjs(todo.dueDate))
        );
        break;
      case 'all':
      default:
        todosArr = todos;
        break;
    }

    setDisplayTodos(todosArr);
  }, [filter, todos, setDisplayTodos]);

  const fetchTodos = async () => {
    setProgress(true);

    const todoList = await getAllTodos();

    setTodos(todoList);
    setProgress(false);
  };

  const onEdit = async (id, text) => {
    setProgress(true);

    const newTodo = await updateTodoText(id, text.trim());
    if (newTodo) {
      const sanitizedTodos = [...todos];
      sanitizedTodos.splice(newTodo.order, 1);

      setTodos([...sanitizedTodos, newTodo]);
    }
    setProgress(false);
  };

  const onToggleComplete = async (id) => {
    setProgress(true);

    const newTodo = await toggleTodoComplete(id);
    if (newTodo) {
      const sanitizedTodos = [...todos];
      sanitizedTodos.splice(newTodo.order, 1);

      setTodos([...sanitizedTodos, newTodo]);
    }
    setProgress(false);
  };

  const onSetDue = async (id, dueDate = null) => {
    setProgress(true);

    const newTodo = await setDueDate(id, dueDate);
    if (newTodo) {
      const sanitizedTodos = [...todos];
      sanitizedTodos.splice(newTodo.order, 1);

      setTodos([...sanitizedTodos, newTodo]);
    }
    setProgress(false);
  };

  const onDelete = async (id, order) => {
    setProgress(true);

    const success = await deleteTodo(id);

    if (success) {
      const sanitizedTodos = [...todos];
      sanitizedTodos.splice(order, 1);

      setTodos([...sanitizedTodos]);
    }
    setProgress(false);
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      {displayTodos.length === 0 && (
        <Grid item xs={12}>
          <Typography variant='h5' align='center'>
            you have no items to do.
          </Typography>
        </Grid>
      )}
      {displayTodos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onEdit={onEdit}
          onToggleComplete={onToggleComplete}
          onSetDue={onSetDue}
          onDelete={onDelete}
        />
      ))}
      {todos.length > 0 && (
        <>
          <Button
            color={filter === 'all' ? 'primary' : 'default'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            color={filter === 'complete' ? 'primary' : 'default'}
            onClick={() => setFilter('complete')}
          >
            Complete
          </Button>
          <Button
            color={filter === 'incomplete' ? 'primary' : 'default'}
            onClick={() => setFilter('incomplete')}
          >
            Incomplete
          </Button>
          <Button
            color={filter === 'late' ? 'primary' : 'default'}
            onClick={() => setFilter('late')}
          >
            Late
          </Button>
        </>
      )}
    </Grid>
  );
};

export default TodoContainer;
