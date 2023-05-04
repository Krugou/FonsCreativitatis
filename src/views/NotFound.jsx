import {Box, Button, Container, Grid, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import HeroImage from '../components/HeroImage';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

const NotFound = () => {
  const viewText = 'Page Not Found';
  useScrollToTop();
  usePageTitle(viewText);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <HeroImage heroText={viewText} />
      <Container maxWidth="sm">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing={2}
          sx={{
            pt: {xs: '1.5em', md: '3rem'},
            pb: {xs: '1.5em', md: '3rem'},
          }}
        >
          <Grid item>
            <Typography variant="h1" align="center" sx={{fontSize: '4rem'}}>
              404
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" align="center" sx={{fontSize: '1.5rem'}}>
              {`Sorry, the ${viewText.toLowerCase()} you are looking for could not be found.`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center">
              {`Please check the URL and try again, or click the button below to go back to the ${viewText.toLowerCase()} page.`}
            </Typography>
          </Grid>
          <Grid item>
            <Box textAlign="center" mt={{xs: '1em', md: '2em'}}>
              <Button
                component={Link}
                to="/"
                variant="contained"
                sx={{fontSize: '1.2rem', padding: '0.8rem 2rem'}}
              >
                Go Back to Home
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default NotFound;
