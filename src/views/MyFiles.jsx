import {Typography} from '@mui/material';
import React from 'react';
import HeroImage from '../components/HeroImage';
import ReviewTable from '../components/ReviewTable';
import usePageTitle from '../hooks/usePageTitle';
const MyFiles = () => {
  usePageTitle('My Files');
  return (
    <>
      <HeroImage heroText="MyFiles" />
      <Typography component="h1" variant="h2">
        My Files
      </Typography>
      <ReviewTable myFilesOnly={true} />
    </>
  );
};

export default MyFiles;
