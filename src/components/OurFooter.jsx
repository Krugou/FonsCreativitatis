import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import {Container, Grid, IconButton, Link, Typography} from '@mui/material';
import React from 'react';

const OurFooter = () => {
  return (
    <footer style={{bgcolor: 'background.paper', py: 3}}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              About Us
            </Typography>
            <ul>
              <li>
                <Link href="#">Who We Are</Link>
              </li>
              <li>
                <Link href="#">Our Team</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Legal
            </Typography>
            <ul>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms of Service</Link>
              </li>
              <li>
                <Link href="#">Site Map</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Connect with Us
            </Typography>
            <div>
              <IconButton aria-label="Facebook" size="large">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" size="large">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="Instagram" size="large">
                <InstagramIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{mt: 3}}
        >
          © MoneyTeam LLC JAK Productions
        </Typography>
      </Container>
    </footer>
  );
};

export default OurFooter;
