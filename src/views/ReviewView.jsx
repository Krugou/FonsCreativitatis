import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useAuthentication} from '../hooks/ApiHooks';
import {useFavourite, useUser} from '../hooks/apiHooks';
import {generalUser, mediaUrl} from '../utils/variables';

const ReviewView = () => {
  const {postLogin} = useAuthentication();
  const [owner, setOwner] = useState({username: ''});
  const [likes, setLikes] = useState(0);
  const [userLike, setUserLike] = useState(false);
  const {user} = useContext(MediaContext);

  const {getUser} = useUser();
  const {getFavourites, postFavourite, deleteFavourite} = useFavourite();

  const {state} = useLocation();
  const file = state.file;
  // console.log(file);
  let allData = {
    desc: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };
  try {
    allData = JSON.parse(file.description);
    console.log(allData, 'Alldata');
  } catch (error) {
    /* Empty */
  }

  let componentType = 'img';

  switch (file.media_type) {
    case 'video':
      componentType = 'video';
      break;
    case 'audio':
      componentType = 'audio';
      break;
  }

  const fetchUser = async () => {
    try {
      // general user for functions that require user to be logged in backend side
      const generalUserLog = await postLogin(generalUser);
      const userToken = user
        ? localStorage.getItem('userToken')
        : generalUserLog.token;
      const ownerInfo = await getUser(file.user_id, userToken);
      setOwner(ownerInfo);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchLikes = async () => {
    try {
      const likeInfo = await getFavourites(file.file_id);
      // console.log(likeInfo);
      setLikes(likeInfo.length);
      likeInfo.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const doLike = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const data = {file_id: file.file_id};
      const likeInfo = await postFavourite(data, userToken);
      console.log(likeInfo);
      setUserLike(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteLike = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const likeInfo = await deleteFavourite(file.file_id, userToken);
      console.log(likeInfo);
      setUserLike(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // jos taulukko tyhjä, ajetaan vain kerran, kun sivu ladataan

  useEffect(() => {
    fetchLikes();
  }, [userLike]); // Ajetaan useEffect, kun userLike arvo muuttuu

  return owner.username ? (
    <>
      <Typography
        sx={{
          marginTop: '0.5em',
          marginBottom: '0.5em',
        }}
        component="h1"
        variant="h3"
      >
        {file.title}
      </Typography>
      <Card
        sx={{
          display: 'flex',
          flexDirection: {xs: 'column', sm: 'row'},
        }}
      >
        <CardMedia
          controls={true}
          poster={mediaUrl + file.screenshot}
          component={componentType}
          src={mediaUrl + file.filename}
          title={file.title}
          sx={{
            width: {md: '500px', sm: '70%', xs: '100%'},
            height: {
              lg: '400px',
              md: '400px',
              sm: '400px',
              xs: 'fit-content',
              xl: 'auto',
            },
            boxShadow: ' 0 3px 10px rgb(0 0 0 / 0.2);',
          }}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: {xs: '1.5em', sm: '3em'},
            justifyContent: 'center',
            paddingLeft: {xs: '2em', md: '2em'},
            alignItems: {md: 'unset', sm: 'unset', xs: 'center'},
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              boxShadow: ' 0 3px 10px rgb(0 0 0 / 0.2);',
              padding: '20px',
              width: {xs: '100%', sm: '75%'},
              marginTop: '1em',
            }}
          >
            {allData.tags}
          </Typography>
          <Typography
            sx={{
              fontSize: {xs: '20px', xl: '30px', md: '25px'},
            }}
            variant="body2"
          >
            Favorites: {likes}
          </Typography>

          <Rating
            sx={{
              fontSize: {xs: '20px', xl: '30px', md: '25px'},
            }}
            name="restaurant-rating"
            value={allData.stars}
            precision="0.5"
            readOnly
          />
          <FavoriteIcon
            sx={{
              fontSize: {xs: '20px', xl: '30px', md: '25px'},
            }}
            onClick={userLike ? deleteLike : doLike}
            style={
              userLike
                ? {color: 'red', display: 'block'}
                : {color: 'orange', display: 'block'}
            }
          ></FavoriteIcon>
        </CardContent>
      </Card>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography
          sx={{
            fontSize: '20px',
            boxShadow: ' 0 3px 10px rgb(0 0 0 / 0.2);',
            padding: '20px',
            width: {xs: '100%', sm: '75%'},
            marginTop: '1em',
          }}
        >
          {allData.review}
        </Typography>
        <Typography
          sx={{
            fontSize: {xs: '20px', xl: '30px', md: '25px'},
          }}
          variant="body2"
        >
          By: {owner.username}
        </Typography>
        <Button variant="contained" onClick={() => history.goBack()}>
          Back
        </Button>
      </Box>
    </>
  ) : null;
};

// TODO in the next task: add propType for location

export default ReviewView;
