import TuneIcon from '@mui/icons-material/Tune';
import {Box, TextField, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import React, {useContext, useEffect, useState} from 'react';
import MediaTable from '../components/Mediatable';
import {MediaContext} from '../contexts/MediaContext';
import {useAuthentication, useMedia} from '../hooks/ApiHooks';
import imageUrls from '../utils/auxiliaryContent';
import {baseUrl, generalUser} from '../utils/variables';

const Search = () => {
  const {user, update, setUpdate} = useContext(MediaContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {postLogin} = useAuthentication();

  const searchMedia = async (title, description) => {
    const url = `${baseUrl}media/search`;
    const generalUserLog = await postLogin(generalUser);

    const token = user
      ? localStorage.getItem('userToken')
      : generalUserLog.token;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({title, description}),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result = await response.json();
    return result;
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await searchMedia(title, description);
      setMedia(result);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

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
  const [randomImageUrl, setRandomImageUrl] = useState('');

  useEffect(() => {
    const getRandomImageUrl = () => {
      const randomIndex = Math.floor(Math.random() * imageUrls.home.length);
      return imageUrls.home[randomIndex];
    };

    setRandomImageUrl(getRandomImageUrl());
  }, []);

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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center ',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            sx={{m: 2}}
            name="search"
            label="search"
            margin="normal"
            multiline
            onChange={(event) => setTitle(event.target.value)}
          />
          <Button sx={{m: 2}} variant="contained " onClick={handleSearch}>
            Search
          </Button>
        </Box>
        <Button sx={{m: 2}} onClick={handleOpen} variant="contained">
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
      <Box
        sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
      >
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {media.length > 0 && (
          <ul>
            {media.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        )}
      </Box>
    </>
  );
};

export default Search;
