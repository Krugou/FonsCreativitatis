import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import usePageTitle from '../hooks/usePageTitle';

const Careers = () => {
  usePageTitle('Careers');
  const jobList = [
    {
      title: 'Full-Stack Developer',
      location: 'Remote',
    },
    {
      title: 'Content Writer',
      location: 'Remote',
    },
    {
      title: 'Digital Marketing Specialist',
      location: 'Remote',
    },
    {
      title: 'UI/UX Designer',
      location: 'Remote',
    },
    {
      title: 'Community Manager',
      location: 'Remote',
    },
  ];

  return (
    <Container maxWidth="md">
      <Box sx={{my: 4}}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Careers at JAKReviews
        </Typography>
        <Typography variant="body1" sx={{mt: 2}}>
          We're always on the lookout for passionate and talented individuals to
          join our team at JAKReviews. If you share our love for food and
          technology, and are interested in creating a platform that connects
          people through their dining experiences, we'd love to hear from you!
        </Typography>
        <Typography variant="h6" sx={{mt: 4}}>
          Current Openings
        </Typography>
        <List>
          {jobList.map((job, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={job.title}
                secondary={`Location: ${job.location}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="body1" sx={{mt: 2}}>
          To apply for any of the positions above, please send your resume,
          cover letter, and any relevant work samples to careers@jakreviews.com.
        </Typography>
      </Box>
    </Container>
  );
};

export default Careers;
