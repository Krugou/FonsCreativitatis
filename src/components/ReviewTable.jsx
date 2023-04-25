import {
  Box,
  FormControl,
  ImageList,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useAuthentication, useMedia} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import {generalUser} from '../utils/variables';
import ReviewCard from './ReviewCard';

const ReviewTable = ({myFilesOnly = false}) => {
  const {mediaArray, setMediaArray, deleteMedia} = useMedia(myFilesOnly);
  const windowSize = useWindowSize();
  const {postLogin} = useAuthentication();
  const [token, setToken] = useState(null);
  const [sortOption, setSortOption] = useState('Latest');
  const [loading, setLoading] = useState(true);
  const [mediaFiles, setMediaFiles] = useState([]);

  useEffect(() => {
    const fetchDefaultUserToken = async () => {
      const defaultUser = await postLogin(generalUser);

      setToken(defaultUser.token);
    };
    fetchDefaultUserToken();
  }, [postLogin]);

  const handleChange = (event) => {
    const value = event ? event.target.value : 'Latest';
    if (value === 'Oldest') {
      const sortedMedia = [...mediaArray].sort((a, b) => a.file_id - b.file_id);
      setMediaFiles(sortedMedia);
    } else if (value === 'Latest') {
      const sortedMedia = [...mediaArray].sort((a, b) => b.file_id - a.file_id);
      setMediaFiles(sortedMedia);
    } else if (value === 'Highest star') {
      const sortedMedia = [...mediaArray].sort((a, b) => {
        try {
          return (
            JSON.parse(b.description).stars - JSON.parse(a.description).stars
          );
        } catch (error) {
          console.log(error);
        }
      });
      setMediaFiles(sortedMedia);
    }
    setSortOption(value);
  };

  useEffect(() => {
    handleChange();
  }, [mediaArray]);

  return (
    <>
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" component="h2">
          {sortOption} Reviews:
        </Typography>
        <FormControl>
          <Typography variant="sort-by" sx={{ml: 1}}>
            Sort By:
          </Typography>
          <Select value={sortOption} onChange={handleChange}>
            <MenuItem value="Latest">Latest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
            <MenuItem value="Highest star">Highest Star</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <ImageList
        cols={windowSize.width > 768 ? 4 : 2}
        gap={24}
        component={Box}
        mt={3}
      >
        {mediaFiles.map((item, index) => {
          return (
            <ReviewCard
              key={index}
              file={item}
              deleteMedia={deleteMedia}
              defaultUserToken={token}
            />
          );
        })}
      </ImageList>
    </>
  );
};

ReviewTable.propTypes = {
  myFilesOnly: PropTypes.bool,
};

export default ReviewTable;
