import TuneIcon from '@mui/icons-material/Tune';
import {Box, TextField, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import React, {useContext, useState} from 'react';
import HeroImage from '../components/HeroImage';
import SearchTable from '../components/SearchTable';
import {MediaContext} from '../contexts/MediaContext';
import {doFetch, useAuthentication, useTags} from '../hooks/ApiHooks';
import {appId, baseUrl, generalUser} from '../utils/variables';
const Search = () => {
  const {user, update, setUpdate} = useContext(MediaContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {postLogin} = useAuthentication();
  const {getTagsByFileId} = useTags();
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

    const tagsList = await Promise.all(
      result.map(async (item) => {
        const tags = await getTagsByFileId(item.file_id);
        return tags;
      })
    );
    result.forEach((item, index) => {
      item.tags = tagsList[index];
    });
    const filteredResult = result.filter(
      (item) => item.tags.filter((tag) => tag.tag === appId).length > 0
    );

    // remove tag "mastersoftheuniverse" String from filteredResult
    filteredResult.forEach((item) => {
      item.tags = item.tags.filter((tag) => tag.tag !== appId);
    });

    const filteredResultWithThumbnail = await Promise.all(
      filteredResult.map(async (file) => {
        const data = await doFetch(baseUrl + 'media/' + file.file_id);
        return {
          ...file,
          thumbnails: data.thumbnails,
        };
      })
    );

    // console log stringify filteredResultWithThumbnail
    console.log(JSON.stringify(filteredResultWithThumbnail));

    // invert order of filteredResult
    filteredResultWithThumbnail.reverse();
    return filteredResultWithThumbnail;
  };

  const handleSearch = async (event) => {
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

  const [typingTimeout, setTypingTimeout] = useState(0);

  const handleInputChange = (e) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTitle(e.target.value);
    // Start searching after 0.5 seconds
    setTypingTimeout(setTimeout(handleSearch(e), 800));
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

  return (
    <>
      <HeroImage heroText="Search" />
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
            onChange={handleInputChange}
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
        <SearchTable files={media} />
      </Box>
    </>
  );
};

export default Search;
