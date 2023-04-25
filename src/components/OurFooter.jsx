import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import {Container, IconButton} from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-black">
      <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Site Map</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Connect with Us:</li>
            <li>
              <IconButton aria-label="Facebook">
                <FacebookIcon sx={{color: 'black'}} />
              </IconButton>
              <IconButton aria-label="Twitter">
                <TwitterIcon sx={{color: 'black'}} />
              </IconButton>
              <IconButton aria-label="Instagram">
                <InstagramIcon sx={{color: 'black'}} />
              </IconButton>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
