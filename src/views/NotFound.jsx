import {Box, Button, Container, Grid, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
const NotFound = () => {
  usePageTitle('Page Not Found');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={2}
        minHeight="100vh"
      >
        <Grid item>
          <Typography variant="h1" align="center">
            404
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4" align="center">
            Page Not Found
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" align="center">
            Sorry, the page you are looking for could not be found.
          </Typography>
        </Grid>
        <Grid item>
          <Box textAlign="center">
            <Button component={Link} to="/" variant="contained">
              Go Back Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
