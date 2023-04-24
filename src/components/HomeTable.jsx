import {Box, ImageList, Typography} from '@mui/material';
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

  useEffect(() => {
    const fetchDefaultUserToken = async () => {
      const defaultUser = await postLogin(generalUser);

      setToken(defaultUser.token);
    };
    fetchDefaultUserToken();
  }, [postLogin]);

  return (
    <>
      <Typography variant="h3" component="h2" sx={{mt: 4}}>
        Latest Reviews:
      </Typography>
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
