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
import HomeRow from './HomeRow';
const HomeTable = ({myFilesOnly = false}) => {
  const {mediaArray, deleteMedia} = useMedia(myFilesOnly);
  const windowSize = useWindowSize();
  const {postLogin} = useAuthentication();
  const [token, setToken] = useState(null);
  const [sortOption, setSortOption] = useState('Latest');

  useEffect(() => {
    const fetchDefaultUserToken = async () => {
      const defaultUser = await postLogin(generalUser);

      setToken(defaultUser.token);
    };
    fetchDefaultUserToken();
  }, [postLogin]);
  const handleChange = (event) => {
    setSortOption(event.target.value);
  };
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
            <MenuItem value="Most-liked">Most Liked</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <ImageList
        cols={windowSize.width > 768 ? 4 : 2}
        gap={24}
        component={Box}
        mt={3}
      >
        {mediaArray.map((item, index) => {
          // console.log(item);
          // try {
          // console.log(JSON.parse(item.description));
          // } catch (error) {}

          // console.log(item.description);

          return (
            <HomeRow
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

HomeTable.propTypes = {
  myFilesOnly: PropTypes.bool,
};

export default HomeTable;
