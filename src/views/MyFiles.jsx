import {Typography} from '@mui/material';
import React from 'react';
import HeroImage from '../components/HeroImage';
import HomeTable from '../components/HomeTable';

const MyFiles = () => {
  return (
    <>
      <HeroImage heroText="MyFiles" />
      <Typography component="h1" variant="h2">
        My Files
      </Typography>
      <HomeTable myFilesOnly={true} />
    </>
  );
};

export default MyFiles;
