import {Box, Button, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <Box>
      <Typography variant="h1">404 - Page Not Found</Typography>
      <Typography variant="body1">
        Sorry, the page you are looking for could not be found.
      </Typography>
      <Button component={Link} to="/" variant="contained">
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFound;
