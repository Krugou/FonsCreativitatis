import {Typography} from '@mui/material';
import React from 'react';
import HeroImage from '../components/HeroImage';
import MediaTable from '../components/Mediatable';

const MyFiles = () => {
  return (
    <>
      <HeroImage heroText="MyFiles" />
      <Typography component="h1" variant="h2">
        My Files
      </Typography>
      <MediaTable myFilesOnly={true} />
    </>
  );
};

export default MyFiles;
