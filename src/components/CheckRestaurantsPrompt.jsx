import {Box, Paper, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const CheckRestaurantsPrompt = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    const handleSuccess = (position) => {
      setVisible(true);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      visibility={visible ? 'visible' : 'hidden'}
    >
      <Link to="/nearbyrestaurants" style={{textDecoration: 'none'}}>
        <Paper
          elevation={5}
          sx={{
            padding: '0.5rem',
            cursor: 'pointer',
            transition: 'all .3s',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          <Typography variant="body1" fontSize="1.1rem" fontWeight="500">
            Restaurants
          </Typography>
        </Paper>
      </Link>
    </Box>
  );
};

export default CheckRestaurantsPrompt;
