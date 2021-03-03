import React from 'react';
import DayJsUtils from '@date-io/dayjs';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import progressContext from './contexts/progressContext';
import todoContext from './contexts/todoContext';

import NewTodo from './components/NewTodo';
import Progress from './components/Progress';
import TodoContainer from './components/TodoContainer';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    padding: 16,
    width: '100%',
    overflow: 'auto',
    maxHeight: '95%',
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <todoContext.TodoProvider>
      <progressContext.ProgressProvider>
        <MuiPickersUtilsProvider utils={DayJsUtils}>
          <Progress />
          <Container maxWidth='md' className={classes.container}>
            <Paper className={classes.paper}>
              <Typography variant='h1'>todo list.</Typography>
              <Typography variant='h3'>enter your todo items below.</Typography>
              <NewTodo />
              <TodoContainer />
            </Paper>
          </Container>
        </MuiPickersUtilsProvider>
      </progressContext.ProgressProvider>
    </todoContext.TodoProvider>
  );
};

export default App;
