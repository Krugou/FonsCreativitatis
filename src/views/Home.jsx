import { Box, Typography } from '@mui/material';
import React from 'react';
import MediaTable from '../components/Mediatable';

const Home = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url('./krugou_finnish_pizza_place_filled_with_happy_people_0a69e28f-7135-4d33-b2d3-56bdbfd0ecb4.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 400,
          padding: '100px 0',
          display: { xs: 'none', md: 'block' },
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
          <Typography component="h1" variant="h2" sx={{ color: 'white' }}>
            Home
          </Typography>
        </Box>
      </Box>
      <Typography
        component="h1"
        variant="h2"
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        Home
      </Typography>
      <MediaTable />
    </>
  );
};

export default Home;
