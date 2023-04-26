import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

const OurFooter = () => {
  return (
    <footer style={{backgroundColor: 'background.paper', padding: '24px'}}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              About Us
            </Typography>
            <List>
              <ListItem disableGutters>
                <RouterLink to="/aboutus" style={{textDecoration: 'none'}}>
                  Who We Are
                </RouterLink>
              </ListItem>
              <ListItem disableGutters>
                <RouterLink to="/ourteam" style={{textDecoration: 'none'}}>
                  Our Team
                </RouterLink>
              </ListItem>
              <ListItem disableGutters>
                <RouterLink to="/contactus" style={{textDecoration: 'none'}}>
                  Contact Us
                </RouterLink>
              </ListItem>
              <ListItem disableGutters>
                <RouterLink to="/careers" style={{textDecoration: 'none'}}>
                  Careers
                </RouterLink>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Legal
            </Typography>
            <List>
              <ListItem disableGutters>
                <RouterLink
                  to="/privacypolicy"
                  style={{textDecoration: 'none'}}
                >
                  Privacy Policy
                </RouterLink>
              </ListItem>
              <ListItem disableGutters>
                <RouterLink
                  to="/termsofservice"
                  style={{textDecoration: 'none'}}
                >
                  Terms of Service
                </RouterLink>
              </ListItem>
              <ListItem disableGutters>
                <RouterLink to="/sitemap" style={{textDecoration: 'none'}}>
                  Site Map
                </RouterLink>
              </ListItem>
              <ListItem disableGutters>
                <RouterLink
                  to="/nearbyrestaurants"
                  style={{textDecoration: 'none'}}
                >
                  Site Map
                </RouterLink>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Connect with Us
            </Typography>
            <div>
              <IconButton
                aria-label="Facebook"
                size="large"
                component="a"
                href="https://www.facebook.com/jakreviews"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                size="large"
                component="a"
                href="https://twitter.com/jakreviews"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                size="large"
                component="a"
                href="https://www.instagram.com/jakreviews"
              >
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
