import {Box, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import imageUrls from '../utils/auxiliaryContent';

const HeroImage = ({heroText}) => {
  console.log('🚀 ~ file: HeroImage.jsx:7 ~ HeroImage ~ heroText:', heroText);
  const [randomImageUrl, setRandomImageUrl] = useState('');
  const heroTextSpacesCleared = heroText.replace(/\s/g, '');

  useEffect(() => {
    const getRandomImageUrl = (imageUrlsArray) => {
      const randomIndex = Math.floor(Math.random() * imageUrlsArray.length);
      return imageUrlsArray[randomIndex];
    };
    const imageUrlsArray =
      imageUrls[heroTextSpacesCleared.toLowerCase()] || imageUrls.default;
    setRandomImageUrl(getRandomImageUrl(imageUrlsArray));
  }, [heroText]);

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url('./heroimages/${heroTextSpacesCleared.toLowerCase()}/${randomImageUrl}')`,
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
            variant="h3"
            sx={{
              color: 'white',
              fontSize: {xs: 'h3.fontSize', md: 'h2.fontSize'},
            }}
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
