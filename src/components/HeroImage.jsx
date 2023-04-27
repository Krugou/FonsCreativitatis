import {Box, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import imageUrls from '../utils/auxiliaryContent';

const HeroImage = ({heroText}) => {
  const [randomImageUrl, setRandomImageUrl] = useState('');

  useEffect(() => {
    const getRandomImageUrl = (imageUrlsArray) => {
      const randomIndex = Math.floor(Math.random() * imageUrlsArray.length);
      return imageUrlsArray[randomIndex];
    };

    const imageUrlsArray =
      imageUrls[heroText.toLowerCase()] || imageUrls.default;
    setRandomImageUrl(getRandomImageUrl(imageUrlsArray));
  }, [heroText]);

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url('./heroimages/${randomImageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: {xs: '11rem', sm: '13.75rem', md: '19.25rem'},
          padding: {xs: '1.65rem 0', md: '3.3rem 0'},
          display: 'block',
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
          <Typography
            component="h1"
            variant={{xs: 'h3', md: 'h2'}}
            sx={{color: 'white'}}
          >
            {heroText}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

HeroImage.propTypes = {
  heroText: PropTypes.string.isRequired,
};

export default HeroImage;
