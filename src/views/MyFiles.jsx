import {Typography} from '@mui/material';
import React from 'react';
import MediaTable from '../components/Mediatable';
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
