import {
  Box,
  Button,
  CircularProgress,
  ImageListItem,
  ImageListItemBar,
  Rating,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/apiHooks';
import {mediaUrl} from '../utils/variables';

const ReviewCard = ({file, deleteMedia, defaultUserToken}) => {
  const {user, update, setUpdate} = useContext(MediaContext);
  const [owner, setOwner] = useState({username: ''});

  const {getUser} = useUser();
  /*
  const doDelete = async () => {
    try {
      const sure = confirm('Are you sure?');
      if (sure) {
        const token = localStorage.getItem('userToken');
        const deleteResult = await deleteMedia(file.file_id, token);
        console.log(deleteResult);
        setUpdate(!update);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  */
  let stars;
  try {
    const allData = JSON.parse(file.description);
    stars = allData.stars;
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
  }, [file]);
  /*
   <Button component={Link} variant="contained" onClick={doDelete}>
        Delete
      </Button>
  */
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    if (file.media_type !== 'audio') {
      image.src = mediaUrl + file.thumbnails?.w640;
    } else {
      image.src = 'vite.svg';
    }
    image.onload = () => setIsImageLoaded(true);
    return () => {
      image.onload = null;
    };
  }, [file.media_type, file.thumbnails]);

  if (!isImageLoaded) {
    return (
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ImageListItem component={Link} to="/ReviewView" state={{file}}>
      <img
        src={
          file.media_type !== 'audio'
            ? mediaUrl + file.thumbnails?.w640
            : 'vite.svg'
        }
        alt={file.title}
      />
      <ImageListItemBar
        sx={{
          display: 'flex',
          flexDirection: {xs: 'column', md: 'row'},
          justifyContent: 'space-between',
        }}
        title={file.title}
        subtitle={owner.username ? 'By: ' + owner.username : ''}
        actionIcon={
          <Box>
            <Rating
              name="review rating"
              value={stars ? stars : 0}
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

ReviewCard.propTypes = {
  file: PropTypes.object.isRequired,
  deleteMedia: PropTypes.func.isRequired,
  defaultUserToken: PropTypes.any,
};

export default ReviewCard;
