import {Box, ImageListItem, ImageListItemBar, Rating} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/apiHooks';
import {mediaUrl} from '../utils/variables';

const HomeRow = ({file, deleteMedia, defaultUserToken}) => {
  const {user, update, setUpdate} = useContext(MediaContext);
  const [owner, setOwner] = useState({username: ''});
  const {getUser} = useUser();
  // const doDelete = async () => {
  //   try {
  //     const sure = confirm('Are you sure?');
  //     if (sure) {
  //       const token = localStorage.getItem('userToken');
  //       const deleteResult = await deleteMedia(file.file_id, token);
  //       console.log(deleteResult);
  //       setUpdate(!update);
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };
  let stars;
  try {
    const allData = JSON.parse(file.description);
    stars = allData.stars;
    // console.log(allData, 'Alldata');
  } catch (error) {
    /* Empty */
  }
  const fetchOwner = async () => {
    try {
      const userToken = user
        ? localStorage.getItem('userToken')
        : defaultUserToken;
      const ownerInfo = await getUser(file.user_id, userToken);
      setOwner(ownerInfo);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwner();
  }, []); // jos taulukko tyhjä, ajetaan vain kerran, kun sivu ladata
  return (
    <ImageListItem component={Link} to="/single" state={{file}}>
      <img
        src={
          file.media_type !== 'audio'
            ? mediaUrl + file.thumbnails?.w640
            : 'vite.svg'
        }
        alt={file.title}
      />
      <ImageListItemBar
        title={file.title}
        subtitle={owner.username ? 'By: ' + owner.username : ''}
        actionIcon={
          <Box>
            <Rating
              name="review rating"
              value={stars}
              readOnly
              precision={0.5}
              sx={{
                '& .MuiRating-iconEmpty': {
                  color: '#fff',
                },
                mr: 1,
              }}
            />
          </Box>
        }
      />
    </ImageListItem>
  );
};

HomeRow.propTypes = {
  file: PropTypes.object.isRequired,
  deleteMedia: PropTypes.func.isRequired,
  defaultUserToken: PropTypes.any,
};

export default HomeRow;
