import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import UserIdContext from '../contexts/UserIdContext';
import {useAuthentication} from '../hooks/ApiHooks';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

import HeroImage from '../components/HeroImage';
import {useFavourite, useUser, useComments} from '../hooks/apiHooks';
import {generalUser, mediaUrl} from '../utils/variables';
const ReviewView = () => {
  const {postLogin} = useAuthentication();
  const [owner, setOwner] = useState({username: ''});
  const [likes, setLikes] = useState(0);
  const [userLike, setUserLike] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isCommentValid, setIsCommentValid] = useState(true);
  const {postComment, getComments, deleteComment} = useComments();
  const {user} = useContext(MediaContext);
  const {getUser} = useUser();
  const {postFavourite, deleteFavourite, getLikes} = useFavourite();
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
    const likeInfo = await getLikes(file.file_id);
    setLikes(likeInfo.length);
    likeInfo.forEach((like) => {
      like.user_id === user.user_id && setUserLike(true);
    });
  };

  const doLike = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const data = {file_id: file.file_id};
      const likeInfo = await postFavourite(data, userToken);
      setUserLike(true);
    } catch (error) {
      // console.log(error.message);
    }
  };

  const deleteLike = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const likeInfo = await deleteFavourite(file.file_id, userToken);
      setUserLike(false);
    } catch (error) {
      // console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // jos taulukko tyhjä, ajetaan vain kerran, kun sivu ladataan

  useEffect(() => {
    fetchLikes();
  }, [userLike]); // Ajetaan useEffect, kun userLike arvo muuttuu
  const {setId} = useContext(UserIdContext);

  const navigate = useNavigate();

  const reviewerProfile = () => {
    setId(file.user_id);
    navigate(`/reviewerprofile`);
  };

  const viewText = 'Review View';
  useScrollToTop();
  usePageTitle(viewText, file.title);
  // add https:// to allData.website
  if (allData.website && !allData.website.includes('http')) {
    allData.website = 'https://' + allData.website;
  }

  const fetchComments = async () => {
    const commentInfo = await getComments(file.file_id);
    setComments(commentInfo);
  };

  const validateComment = () => {
    setIsCommentValid(commentText.length >= 5);
  };

  const addComment = async () => {
    if (!user) {
      // User is not logged in, redirect to the login page
      navigate('/login');
      return;
    }

    validateComment();

    if (isCommentValid && commentText.length >= 5) {
      try {
        const userToken = localStorage.getItem('userToken');
        const commentInfo = await postComment(
          file.file_id,
          commentText,
          userToken
        );
        setCommentText('');
        // Refresh comments
        fetchComments();
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const userToken = localStorage.getItem('userToken');
      await deleteComment(commentId, userToken);
      // Refresh comments
      fetchComments();
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchCommentUsers = async () => {
    try {
      const fetchedCommentUsers = {};

      for (const comment of comments) {
        const userInfo = await getUser(comment.user_id);
        fetchedCommentUsers[comment.comment_id] = userInfo;
      }

      setCommentUsers(fetchedCommentUsers);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchCommentUser = async (comment) => {
    try {
      const generalUserLog = await postLogin(generalUser);
      const userToken = user
        ? localStorage.getItem('userToken')
        : generalUserLog.token;
      const userInfo = await getUser(comment.user_id, userToken);
      return userInfo.username;
    } catch (error) {
      console.error(error.message);
      return 'Unknown User';
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    fetchCommentUsers();
  }, [comments]);

  const AsyncUsername = ({comment}) => {
    const [username, setUsername] = useState('Loading...');

    const handleUsernameClick = () => {
      setId(comment.user_id);
      navigate(`/ReviewerProfile`);
    };

    useEffect(() => {
      const fetchUsername = async () => {
        const fetchedUsername = await fetchCommentUser(comment);
        setUsername(fetchedUsername);
      };

      fetchUsername();
    }, [comment]);

    return <span onClick={handleUsernameClick}>{username}</span>;
  };

  return (
    <>
      {owner.username ? (
        <>
          <HeroImage heroText={viewText} />
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
              marginBottom: '1em',
              gap: '1em',
            }}
          >
            <CardMedia
              controls={true}
              poster={mediaUrl + file.screenshot}
              component={componentType}
              src={mediaUrl + file.filename}
              title={file.title}
              sx={{
                width: {md: '400px', sm: '70%', xs: '100%'},
                height: {
                  lg: '400px',
                  md: '400px',
                  sm: '400px',
                  xs: '300px',
                  xl: '400px',
                },
                boxShadow: '0 3px 10px rgb(0 0 0 / 0.2);',
              }}
            />
            <CardContent
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: {xs: '1em', sm: '1em'},
                justifyContent: 'center',
                paddingLeft: {xs: '2em', md: '2em'},
                alignItems: {md: 'center', sm: 'center', xs: 'center'},
              }}
            >
              <Typography
                sx={{
                  fontSize: {xs: '14px', sm: '16px', md: '18px'},
                  fontWeight: 'bold',
                  marginBottom: '0.25em',
                }}
              >
                City: {allData.city}
              </Typography>
              <Typography
                sx={{
                  fontSize: {xs: '14px', sm: '16px', md: '18px'},
                  fontWeight: 'bold',
                  marginBottom: '0.25em',
                }}
              >
                Address: {allData.address}
              </Typography>
              <Typography
                sx={{
                  fontSize: {xs: '14px', sm: '16px', md: '18px'},
                  fontWeight: 'bold',
                  marginBottom: '0.25em',
                }}
              >
                Website:{' '}
                <Link
                  href={allData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {allData.website}
                </Link>
              </Typography>
              <Box
                sx={{
                  fontSize: '20px',
                  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2);',
                  padding: '20px',
                  width: {xs: '100%', sm: '75%'},
                  marginTop: '1em',
                }}
              >
                {allData.tags.length === 0 ? (
                  <Typography>No Tags</Typography>
                ) : (
                  <>
                    {allData.tags.map((tag) => (
                      <Typography
                        key={tag}
                        sx={{
                          backgroundColor: 'black',
                          color: 'white',
                          borderRadius: '4px',
                          padding: '0.2em 0.5em',
                          margin: '0.2em',
                          display: 'inline-block',
                        }}
                      >
                        {tag}
                      </Typography>
                    ))}
                  </>
                )}
              </Box>
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
                precision={0.5}
                readOnly
              />
              <FavoriteIcon
                className="review-favorite-button"
                sx={{
                  fontSize: {xs: '20px', xl: '30px', md: '25px'},
                }}
                onClick={userLike ? deleteLike : doLike}
                style={
                  userLike
                    ? {color: 'red', display: 'block', cursor: 'pointer'}
                    : {color: 'pink', display: 'block', cursor: 'pointer'}
                }
              ></FavoriteIcon>
            </CardContent>
          </Card>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {xs: 'column', sm: 'row'},
              justifyContent: 'center',
              gap: {xs: '1em', sm: '0'},
            }}
          >
            <Typography
              sx={{
                fontSize: '20px',
                boxShadow: '0 3px 10px rgb(0 0 0 / 0.2);',
                padding: '20px',
                width: {xs: '100%', sm: '75%'},
                marginTop: '1em',
              }}
            >
              {allData.review}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '8px',
                fontSize: {xs: '20px', xl: '30px', md: '25px'},
                boxShadow: '0 3px 10px rgb(0 0 0 / 0.2);',
                padding: '20px',
                width: {xs: '100%', sm: '25%'},
                marginTop: '1em',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={reviewerProfile}
                sx={{
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: {xs: '0.9rem', sm: '1rem'},
                }}
              >
                By: {owner.username}
              </Button>
            </Box>
          </Box>
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Comments
            </Typography>
            {comments.map((comment) => (
              <Card key={comment.comment_id} elevation={2} sx={{mb: 2}}>
                <CardContent>
                  <Button variant="subtitle2" gutterBottom>
                    {comment.user_id ? (
                      <AsyncUsername comment={comment} />
                    ) : (
                      'Unknown User'
                    )}
                  </Button>
                  <Typography variant="body2">{comment.comment}</Typography>
                  {user &&
                    comment.user_id === user.user_id && ( // Check if user is defined before accessing user.user_id
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteComment(comment.comment_id)}
                        sx={{mt: 1}}
                      >
                        Delete
                      </Button>
                    )}
                </CardContent>
              </Card>
            ))}
            <Box mt={2}>
              <TextField
                name="commentText"
                label="Add a comment"
                variant="outlined"
                error={!isCommentValid}
                helperText={!isCommentValid && 'Comment must be at least 5 characters long'}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </Box>
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={addComment}>
                Post Comment
              </Button>
            </Box>
          </Box>
        </>
      ) : null}
    </>
  );
};

// TODO in the next task: add propType for location

export default ReviewView;
