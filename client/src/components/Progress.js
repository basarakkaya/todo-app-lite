import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

import { useProgress } from '../contexts/progressContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

const Progress = () => {
  const classes = useStyles();
  const [progress] = useProgress();

  return progress && <LinearProgress className={classes.root} />;
};

export default Progress;
