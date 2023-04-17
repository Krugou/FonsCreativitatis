import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import {useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {useContext, useState} from 'react';
import {useEffect} from 'react';
import {useFavourite, useUser} from '../hooks/apiHooks';
import {MediaContext} from '../contexts/MediaContext';

const Single = () => {
  const [owner, setOwner] = useState({username: ''});
  const [likes, setLikes] = useState(0);
  const [userLike, setUserLike] = useState(false);
  const {user} = useContext(MediaContext);

  const {getUser} = useUser();
  const {getFavourites, postFavourite, deleteFavourite} = useFavourite();

  const {state} = useLocation();
  const file = state.file;

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
      const userToken = localStorage.getItem('userToken');
      const ownerInfo = await getUser(file.user_id, userToken);
      setOwner(ownerInfo);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchLikes = async () => {
    try {
      const likeInfo = await getFavourites(file.file_id);
      console.log(likeInfo);
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

  return (
    <>
      <Typography component="h1" variant="h3">
        {file.title}
      </Typography>
      <Card>
        <CardMedia
          controls={true}
          poster={mediaUrl + file.screenshot}
          component={componentType}
          src={mediaUrl + file.filename}
          title={file.title}
          style={{
            width: '100%',
            height: 400,
            filter: `
            brightness(${allData.filters.brightness}%)
            contrast(${allData.filters.contrast}%)
            saturate(${allData.filters.saturation}%)
            sepia(${allData.filters.sepia}%)
            `,
            backgroundImage: file.media_type === 'audio' && `url(vite.svg)`,
          }}
        />
        <CardContent>
          <Typography variant="body1">{allData.desc}</Typography>
          <Typography variant="body2">By: {owner.username}</Typography>
          <Typography variant="body2">Likes: {likes}</Typography>

          <ButtonGroup>
            <Button onClick={doLike} disabled={userLike}>
              Like
            </Button>
            <Button onClick={deleteLike} disabled={!userLike}>
              Dislike
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </>
  );
};

// TODO in the next task: add propType for location

export default Single;
