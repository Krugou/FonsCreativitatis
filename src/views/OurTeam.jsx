import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import usePageTitle from '../hooks/usePageTitle';

const teamMembers = [
  {
    name: 'Joonas Lamminmäki',
    role: 'CEO & Co-founder',
  },
  {
    name: 'Aleksi Nokelainen',
    role: 'CTO & Co-founder',
  },
  {
    name: 'Kaarle Häyhä',
    role: 'CMO & Co-founder',
  },
];
const OurTeam = () => {
  usePageTitle('Our Team');
  return (
    <Container maxWidth="lg">
      <Box sx={{my: 4}}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Our Team
        </Typography>
        <Typography variant="h6" component="p" align="center" gutterBottom>
          Meet the creators of JAKReviews
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{width: 96, height: 96}}>
                      {member.name[0]}
                    </Avatar>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {member.role}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default OurTeam;
