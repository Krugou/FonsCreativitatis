import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const ErrorAlert = ({alert, onClose}) => {
  return (
    <Dialog open={Boolean(alert)} onClose={onClose}>
      <DialogTitle color="error">Error</DialogTitle>
      <DialogContent>{alert && <p>{alert}</p>}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorAlert;
ErrorAlert.propTypes = {
  alert: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
