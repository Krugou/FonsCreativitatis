import React from 'react';
import MediaTable from '../components/Mediatable';
import {Typography} from '@mui/material';
const MyFiles = () => {
  return (
    <>
      <Typography component="h1" variant="h2">
        My Files
      </Typography>
      <MediaTable myFilesOnly={true} />
    </>
  );
};

export default MyFiles;
