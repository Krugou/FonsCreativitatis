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
    // string to json result.description
    result.forEach((item) => {
      try {
        const parsedDescription = JSON.parse(item.description);
        Object.assign(item, parsedDescription); // merge parsedDescription with item
      } catch (error) {
        // If JSON parsing fails, assume it's a simple string and copy it to `description`
        item.description = {description: item.description};
      }
    });
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
  const filterByTag = (event) => {
    // innertext to lowercase and first uppercase letter
    let innertext = event.target.innerText.toLowerCase();
    innertext = innertext.charAt(0).toUpperCase() + innertext.slice(1);
    console.log('Target text:', innertext);
    const filtered = media.filter((item) =>
      item.tags.some((tag) => {
        console.log('Item tag:', tag.tag);
        return tag.tag === innertext;
      })
    );
    console.log('Filtered media:', filtered);
    setMedia(filtered);
  };
  const filterByCity = (event) => {
    // innertext to lowercase and first uppercase letter
    let innertext = event.target.innerText.toLowerCase();
    innertext = innertext.charAt(0).toUpperCase() + innertext.slice(1);
    console.log('Target text:', innertext);
    const filtered = media.filter((item) => item.city === innertext);
    console.log('Filtered media:', filtered);
    setMedia(filtered);
  };
  const filterByRestaurants = (event) => {
    const innertext = event.target.innerText
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    console.log('Target text:', innertext);
    const filtered = media.filter((item) => item.title === innertext);
    console.log('Filtered media:', filtered);
    setMedia(filtered);
  };

  const resetMedia = () => {
    searchMedia(title, description).then((result) => {
      setMedia(result);
    });
  };
  const uniqueTags = [
    ...new Set(media.flatMap((item) => item.tags.map((tag) => tag.tag))),
  ];
  const uniqueCities = [...new Set(media.map((item) => item.city))];
  const uniqueRestaurants = [...new Set(media.map((item) => item.title))];
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
          }}
        >
          {' '}
          <Typography variant="h5" gutterBottom>
            Filter by restaurants
          </Typography>
          <Box
            sx={{
              marginRight: '10px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {uniqueRestaurants.map((tag) => (
              <Button onClick={filterByRestaurants} key={tag}>
                {tag}
              </Button>
            ))}
          </Box>
          <Typography variant="h5" gutterBottom>
            Filter by Tags
          </Typography>
          <Box
            sx={{
              marginRight: '10px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {uniqueTags.map((tag) => (
              <Button onClick={filterByTag} key={tag}>
                {tag}
              </Button>
            ))}
          </Box>
          <Typography variant="h5" gutterBottom>
            Filter by Cities
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {uniqueCities.map((city) => (
              <Button onClick={filterByCity} key={city}>
                {city}
              </Button>
            ))}
          </Box>
          <Button onClick={resetMedia}>Reset</Button>
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
