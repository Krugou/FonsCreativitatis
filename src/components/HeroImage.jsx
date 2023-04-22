import {Box, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import imageUrls from '../utils/auxiliaryContent';

const HeroImage = ({heroText}) => {
  console.log('🚀 ~ file: HeroImage.jsx:7 ~ HeroImage ~ heroText:', heroText);
  const [randomImageUrl, setRandomImageUrl] = useState('');

  useEffect(() => {
    const getRandomImageUrl = () => {
      const randomIndex = Math.floor(Math.random() * imageUrls.home.length);
      return imageUrls.home[randomIndex];
    };

    setRandomImageUrl(getRandomImageUrl());
  }, []);
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url('./heroimages/${randomImageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 400,
          padding: '100px 0',
          display: {xs: 'none', md: 'block'},
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h2" sx={{color: 'white'}}>
            {heroText}
          </Typography>
        </Box>
      </Box>
      <Typography
        component="h1"
        variant="h2"
        sx={{display: {xs: 'block', md: 'none'}}}
      >
        {heroText}
      </Typography>
    </>
  );
};
HeroImage.propTypes = {
  heroText: PropTypes.string.isRequired,
};

export default HeroImage;
