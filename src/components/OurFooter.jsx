import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import {Button, Container, Grid, IconButton, Typography} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';

const OurFooter = () => {
  const navigate = useNavigate();

  return (
    <footer style={{backgroundColor: 'background.paper', padding: '24px'}}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              About Us
            </Typography>
            <ul>
              <li>
                <Button onClick={() => navigate('/aboutus')} color="inherit">
                  Who We Are
                </Button>
              </li>
              <li>
                <Button onClick={() => navigate('/ourteam')} color="inherit">
                  Our Team
                </Button>
              </li>
              <li>
                <Button onClick={() => navigate('/contactus')} color="inherit">
                  Contact Us
                </Button>
              </li>
              <li>
                <Button onClick={() => navigate('/careers')} color="inherit">
                  Careers
                </Button>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Legal
            </Typography>
            <ul>
              <li>
                <Button
                  onClick={() => navigate('/privacypolicy')}
                  color="inherit"
                >
                  Privacy Policy
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => navigate('/termsofservice')}
                  color="inherit"
                >
                  Terms of Service
                </Button>
              </li>
              <li>
                <Button onClick={() => navigate('/sitemap')} color="inherit">
                  Site Map
                </Button>
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
