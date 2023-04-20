import TuneIcon from '@mui/icons-material/Tune';
import {Box, TextField, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import React, {useState} from 'react';
import MediaTable from '../components/Mediatable';
import imageUrls from '../utils/auxiliaryContent';

const Search = () => {
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
  const randomImageUrl =
    imageUrls.home[Math.floor(Math.random() * imageUrls.home.length)];
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url('./heroimages/${randomImageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 400,
          padding: '100px 0',
          display: {xs: 'none', md: 'block'},
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h2" sx={{color: 'white'}}>
            Search
          </Typography>
        </Box>
      </Box>
      <Typography
        component="h1"
        variant="h2"
        sx={{display: {xs: 'block', md: 'none'}}}
      >
        Search
      </Typography>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <TextField name="search" label="search" margin="normal" multiline />
        <Button onClick={handleOpen} variant="contained">
          <TuneIcon />
        </Button>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{p: 3, backgroundColor: 'white'}}>
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
      <MediaTable />
    </>
  );
};

export default Search;
