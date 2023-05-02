import {Typography} from '@mui/material';
import React from 'react';
import HeroImage from '../components/HeroImage';
import ReviewTable from '../components/ReviewTable';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

const MyReviews = () => {
  const viewText = 'My Reviews';
  useScrollToTop();
  usePageTitle(viewText);
  return (
    <>
      <HeroImage heroText={viewText} />

      <ReviewTable myFilesOnly={true} />
    </>
  );
};

export default MyReviews;
