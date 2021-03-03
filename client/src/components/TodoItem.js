import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { DateTimePicker } from '@material-ui/pickers';

import DeleteIcon from '@material-ui/icons/Delete';
import ScheduleIcon from '@material-ui/icons/Schedule';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    padding: 8,
  },
  verticalCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    '& > *': {
      margin: 4,
    },
  },
  input: {
    fontSize: '1.5rem',
    cursor: 'pointer',
    '&:hover': { borderBottom: '1px solid #e0e0e0' },
  },
  completed: {
    textDecoration: 'line-through',
    color: theme.palette.text.secondary,
  },
}));

const TodoItem = ({
  todo: { _id, text, completedDate, dueDate, order },
  onEdit,
  onToggleComplete,
  onSetDue,
  onDelete,
}) => {
  const classes = useStyles();
  const [textVal, setTextVal] = useState(text);
  const [readOnly, setReadOnly] = useState(true);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  const onDateChange = (date) => {
    setSelectedDate(date);
    onSetDue(_id, dayjs(date).format());
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <div className={classes.verticalCenter}>
          <Checkbox
            checked={Boolean(completedDate)}
            onChange={() => onToggleComplete(_id)}
          />
        </div>
        <form
          className={classes.content}
          onSubmit={(e) => {
            e.preventDefault();
            onEdit(_id, textVal);
            setReadOnly(true);
          }}
        >
          <TextField
            fullWidth
            value={textVal}
            inputProps={{
              readOnly,
              maxLength: 140,
            }}
            InputProps={{
              disableUnderline: readOnly,
              classes: {
                input: `${classes.input} ${completedDate && classes.completed}`,
              },
            }}
            onFocus={() => setReadOnly(false)}
            onChange={(e) => setTextVal(e.target.value)}
            onBlur={() => {
              onEdit(_id, textVal);
              setReadOnly(true);
            }}
            error={!textVal || textVal.length === 140}
            {...(!readOnly
              ? {
                  helperText: `${textVal.length}/140`,
                }
              : {})}
          />
          <DateTimePicker
            open={isDatePickerOpen}
            onOpen={() => setIsDatePickerOpen(true)}
            onClose={() => setIsDatePickerOpen(false)}
            value={selectedDate}
            onChange={onDateChange}
            TextFieldComponent={() => null}
          />
          {dueDate && (
            <Chip
              icon={<ScheduleIcon />}
              label={dayjs(dueDate).format('DD MMM YY, HH:mm')}
              onClick={() => setIsDatePickerOpen(true)}
              onDelete={() => onSetDue(_id, null)}
              variant='outlined'
              color={dayjs().isBefore(dayjs(dueDate)) ? 'primary' : 'secondary'}
            />
          )}
        </form>
        <div className={classes.verticalCenter}>
          {!dueDate && (
            <IconButton onClick={() => setIsDatePickerOpen(true)}>
              <ScheduleIcon />
            </IconButton>
          )}
          <IconButton onClick={() => onDelete(_id, order)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Paper>
    </Grid>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completedDate: PropTypes.string,
    dueDate: PropTypes.string,
  }),
  onEdit: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onSetDue: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
