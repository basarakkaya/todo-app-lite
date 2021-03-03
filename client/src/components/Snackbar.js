import React from 'react';

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackbar = ({ message, open, onClose, type = 'info' }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    if (onClose) onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      {...(onClose ? { onClose } : {})}
      message={message}
    >
      <Alert severity={type} {...(onClose ? { onClose: handleClose } : {})}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
