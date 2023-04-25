import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Typography,
} from '@mui/material';

import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/apiHooks';
import {mediaUrl} from '../utils/variables';
import DeleteModal from './DeleteModal';

const ReviewCard = ({file, deleteMedia, defaultUserToken, myFilesOnly}) => {
  const [showDelete, setShowDelete] = useState(false);
  const {user, update, setUpdate} = useContext(MediaContext);
  const [owner, setOwner] = useState({username: ''});

  const {getUser} = useUser();

  const doDelete = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const deleteResult = await deleteMedia(file.file_id, token);
      console.log(deleteResult);
      setUpdate(!update);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleDelete = (event) => {
    setShowDelete(!showDelete);
  };
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
    <ImageListItem
      component={Link}
      to={showDelete ? null : '/ReviewView'}
      state={{file}}
    >
      {showDelete && (
        <DeleteModal
          toggleDelete={toggleDelete}
          title={file.title}
          onDelete={doDelete}
        />
      )}
      {myFilesOnly && (
        <IconButton
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'white',
          }}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            toggleDelete();
          }}
        >
          <DeleteIcon
            sx={{
              color: 'black',
            }}
          />
        </IconButton>
      )}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          borderRadius: '50%',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          backgroundColor: 'white',
        }}
      >
        {file.likes ? (
          <IconButton disabled>
            <FavoriteIcon fontSize="normal" sx={{color: 'red'}} />
            <Typography fontSize="1rem" color="black">
              {file.likes}
            </Typography>
          </IconButton>
        ) : (
          <IconButton disabled>
            <FavoriteIcon fontSize="normal" sx={{color: 'red'}} />
            <Typography fontSize="1rem" color="black">
              0
            </Typography>
          </IconButton>
        )}
      </Box>
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
  myFilesOnly: PropTypes.bool.isRequired,
};

export default ReviewCard;
