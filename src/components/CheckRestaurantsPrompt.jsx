import {Box, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const CheckRestaurantsPrompt = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible((prevState) => !prevState);
    };

    const randomInterval = Math.random() * 2000 + 1000;
    const timer = setInterval(toggleVisibility, randomInterval);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      visibility={visible ? 'visible' : 'hidden'}
    >
      <Link to="/nearbyrestaurant" style={{textDecoration: 'none'}}>
        <Typography variant="h4">
          Hey, you can check nearby restaurants in here!
        </Typography>
      </Link>
    </Box>
  );
};

export default CheckRestaurantsPrompt;
