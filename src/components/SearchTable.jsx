import {Box, ImageList} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useAuthentication} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import {generalUser} from '../utils/variables';
import ReviewCard from './ReviewCard';

const SearchTable = ({myFilesOnly = false, files}) => {
  const windowSize = useWindowSize();
  const {postLogin} = useAuthentication();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchDefaultUserToken = async () => {
      const defaultUser = await postLogin(generalUser);

      setToken(defaultUser.token);
    };
    fetchDefaultUserToken();
  }, [postLogin]);
  const columns = () => {
    if (windowSize.width > 1200) return 4;
    if (windowSize.width > 768) return 3;
    if (windowSize.width > 480) return 2;
    return 1;
  };
  return (
    <ImageList cols={columns()} gap={24} component={Box} mt={3}>
      {files.map((item, index) => {
        try {
          // console.log(JSON.parse(item.description));
        } catch (error) {
          // console.log(error.message);
        }

        return <ReviewCard key={index} file={item} defaultUserToken={token} />;
      })}
    </ImageList>
  );
};

SearchTable.propTypes = {
  files: PropTypes.array.isRequired,
  myFilesOnly: PropTypes.bool,
};

export default SearchTable;
