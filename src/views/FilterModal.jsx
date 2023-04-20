import TuneIcon from '@mui/icons-material/Tune';
import {Box, Button, Modal, Stack, TextField, Typography} from '@mui/material';
import {useState} from 'react';

const FilterModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <TuneIcon />
        Filter
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{p: 3}}>
          <Typography variant="h5" gutterBottom>
            Filter Results
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField name="search" label="Search" variant="outlined" />
              <TextField name="category" label="Category" variant="outlined" />
              <Button type="submit" variant="contained">
                Apply Filters
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default FilterModal;
