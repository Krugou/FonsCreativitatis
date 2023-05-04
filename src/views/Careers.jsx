import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import HeroImage from '../components/HeroImage';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';
import {jobList} from '../utils/jobListData';
const Careers = () => {
  const viewText = 'Careers';
  useScrollToTop();
  usePageTitle(viewText);

  return (
    <>
      <HeroImage heroText={viewText} />
      <Container maxWidth="md">
        <Box sx={{my: '4rem', fontSize: {xs: '1.5rem', md: '2rem'}}}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Careers at JAKReviews
          </Typography>
          <Typography
            variant="body1"
            sx={{mt: '2rem', mb: '2rem', fontSize: {xs: '1rem', md: '1.5rem'}}}
          >
            We're always on the lookout for passionate and talented individuals
            to join our team at JAKReviews. If you share our love for food and
            technology, and are interested in creating a platform that connects
            people through their dining experiences, we'd love to hear from you!
          </Typography>
          <Typography
            variant="h6"
            sx={{mt: '4rem', fontSize: {xs: '1.5rem', md: '2rem'}}}
          >
            Current Openings
          </Typography>
          <List sx={{fontSize: {xs: '1rem', md: '1.5rem'}, mt: '2rem'}}>
            {jobList.map((job, index) => (
              <ListItem key={index} sx={{py: '1rem'}}>
                <ListItemText
                  primary={job.title}
                  secondary={`Location: ${job.location}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography
            variant="body1"
            sx={{mt: '2rem', fontSize: {xs: '1rem', md: '1.5rem'}}}
          >
            To apply for any of the positions above, please send your resume,
            cover letter, and any relevant work samples to
            careers@jakreviews.com.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Careers;
