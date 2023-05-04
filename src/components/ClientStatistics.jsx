import {Box, CircularProgress, Grid, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {
  useAuthentication,
  useComments,
  useFavourite,
  useMedia,
  useTags,
} from '../hooks/ApiHooks';
import {appId, generalUser} from '../utils/variables';
const ClientStatistics = ({targetId}) => {
  const [mediaCount, setMediaCount] = useState(null);
  const [favoritesCount, setFavoritesCount] = useState(null);
  const [commentsCount, setCommentsCount] = useState(null);

  const {getAllFiles} = useMedia();
  const {getFavouritesOfUser} = useFavourite();
  const {postLogin} = useAuthentication();
  const {getTagsByFileId} = useTags();
  const {user} = useContext(MediaContext);
  const {getAllComments} = useComments();
  useEffect(() => {
    const fetchData = async () => {
      const reviewFiles = await getAllFiles(targetId);
      const reviewFilePromises = reviewFiles.map(async (file) => {
        const tags = await getTagsByFileId(file.file_id);
        const isReviewFile = tags.some((tag) => tag.tag === appId);

        return isReviewFile ? file : null;
      });

      const filteredReviewFiles = (
        await Promise.all(reviewFilePromises)
      ).filter((file) => file !== null);

      const generalUserLog = await postLogin(generalUser);

      const token = user
        ? localStorage.getItem('userToken')
        : generalUserLog.token;
      const favourites = await getFavouritesOfUser(token);
      const comments = await getAllComments(token);

      const filteredFavourites = favourites
        ? favourites.filter((favourite) => favourite.user_id === targetId)
        : [];

      const filteredComments = comments
        ? comments.filter((comment) => comment.user_id === targetId)
        : [];

      setMediaCount(filteredReviewFiles ? filteredReviewFiles.length : 0);
      setFavoritesCount(filteredFavourites ? filteredFavourites.length : 0);
      setCommentsCount(filteredComments ? filteredComments.length : 0);
    };

    fetchData();
  }, [targetId]);

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {/* Reviews count */}
      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: {xs: '1rem', sm: '2rem'},
            borderRadius: '0.5rem',
            backgroundColor: 'primary.main',
            color: 'background.paper',
            width: '100%',
            maxWidth: '100%',
            margin: {xs: '1rem 0', sm: '1rem'},
          }}
        >
          <Typography variant="h4" component="div">
            {mediaCount === null ? (
              <CircularProgress sx={{color: 'white'}} />
            ) : (
              mediaCount
            )}
          </Typography>
          <Typography variant="subtitle1">Reviews</Typography>
        </Box>
      </Grid>
      {/* Favorites count */}
      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: {xs: '1rem', sm: '2rem'},
            borderRadius: '0.5rem',
            backgroundColor: 'primary.main',
            color: 'background.paper',
            width: '100%',
            maxWidth: '100%',
            margin: {xs: '1rem 0', sm: '1rem'},
          }}
        >
          <Typography variant="h4" component="div">
            {favoritesCount === null ? (
              <CircularProgress sx={{color: 'white'}} />
            ) : (
              favoritesCount
            )}
          </Typography>
          <Typography variant="subtitle1">Favorites</Typography>
        </Box>
      </Grid>
      {/* Comments count */}
      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: {xs: '1rem', sm: '2rem'},
            borderRadius: '0.5rem',
            backgroundColor: 'primary.main',
            color: 'background.paper',
            width: '100%',
            maxWidth: '100%',
            margin: {xs: '1rem 0', sm: '1rem'},
          }}
        >
          <Typography variant="h4" component="div">
            {commentsCount === null ? (
              <CircularProgress sx={{color: 'white'}} />
            ) : (
              commentsCount
            )}
          </Typography>
          <Typography variant="subtitle1">Comments</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
ClientStatistics.propTypes = {
  targetId: PropTypes.number,
};

export default ClientStatistics;
