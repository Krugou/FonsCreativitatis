import {Box, Typography} from '@mui/material';
import React from 'react';
import MediaTable from '../components/Mediatable';
import imageUrls from '../utils/auxiliaryContent';

const Home = () => {
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
            Home
          </Typography>
        </Box>
      </Box>
      <Typography
        component="h1"
        variant="h2"
        sx={{display: {xs: 'block', md: 'none'}}}
      >
        Home
      </Typography>
      <MediaTable />
    </>
  );
};

export default Home;
