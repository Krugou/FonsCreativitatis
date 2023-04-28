import {Box, Container, Typography} from '@mui/material';
import React from 'react';
import HeroImage from '../components/HeroImage';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

const WhoWeAre = () => {
  const viewText = 'Who We Are';
  useScrollToTop();
  usePageTitle(viewText);

  return (
    <>
      <HeroImage heroText={viewText} />
      <Container maxWidth="md">
        <Box sx={{my: {xs: 3, md: 5}, px: {xs: 2, md: 0}}}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Who We Are
          </Typography>
          <Typography variant="body1" sx={{mt: 2}}>
            JAKReviews is a restaurant review website created by three
            passionate food lovers - Joonas Lamminmäki, Aleksi Nokelainen, and
            Kaarle Häyhä. Our mission is to provide a platform for users to find
            the best dining experiences and share their opinions on restaurants,
            cafes, and other food establishments.
          </Typography>
          <Typography variant="body1" sx={{mt: 2}}>
            We started JAKReviews as a side project during our university years,
            and it has since grown into a go-to platform for food enthusiasts.
            Our team is dedicated to ensuring the quality and accuracy of the
            reviews on our website while maintaining a friendly and supportive
            community.
          </Typography>
          <Typography variant="body1" sx={{mt: 2}}>
            Our ultimate goal is to help people discover amazing food and
            celebrate the diverse culinary scene around the world. We believe
            that sharing experiences and connecting with others through food can
            bring people together and create lasting memories.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default WhoWeAre;
