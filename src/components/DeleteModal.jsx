import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

const DeleteModal = ({onDelete, title, toggleDelete}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
    toggleDelete();
  };
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          toggleDelete();
        }}
      >
        <DialogTitle>Delete {title}?</DialogTitle>
        <DialogContent>Are you sure you want to delete {title}?</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsOpen(false);
              toggleDelete();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteModal.propTypes = {
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleDelete: PropTypes.func.isRequired,
};
export default DeleteModal;
