import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import ClientStatistics from '../components/ClientStatistics';
import HeroImage from '../components/HeroImage';

import ReviewTable from '../components/ReviewTable';
import {MediaContext} from '../contexts/MediaContext';
import UserIdContext from '../contexts/UserIdContext';
import {doFetch, useAuthentication, useTags, useUser} from '../hooks/ApiHooks';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';
import {baseUrl, generalUser, mediaUrl} from '../utils/variables';
const ReviewerProfile = () => {
  const viewText = 'Reviewer Profile';
  useScrollToTop();
  usePageTitle(viewText);
  const {id} = useContext(UserIdContext);
  const {user} = useContext(MediaContext);
  const {getTag} = useTags();
  const {getUser} = useUser();
  const {postLogin} = useAuthentication();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const generalUserLog = await postLogin(generalUser);

        const token = user
          ? localStorage.getItem('userToken')
          : generalUserLog.token;

        const userMediaUrl = `${baseUrl}media/user/${id}`;
        const userMediaOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const userMedia = await doFetch(userMediaUrl, userMediaOptions);

        const userMediaWithThumbnails = await Promise.all(
          userMedia.map(async (file) => {
            const ownerInfo = await getUser(file.user_id, token);
            file['owner'] = ownerInfo;
            const data = await doFetch(baseUrl + 'media/' + file.file_id);
            return {
              ...file,
              thumbnails: data.thumbnails,
            };
          })
        );

        setUserData(userMediaWithThumbnails);
      } catch (e) {
        // console.log(e.message);
      }
    };

    getUserData();
  }, [id]);

  const [avatar, setAvatar] = useState('https://placekitten.com/300');

  useEffect(() => {
    const getProfilePic = async () => {
      try {
        if (id) {
          const file = await getTag('avatarJAK_' + id);
          setAvatar(mediaUrl + file[0].filename);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getProfilePic();
  }, [id, getTag]);
  return (
    <>
      <HeroImage heroText={viewText} />

      <Container
        sx={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          borderRadius: '0.125rem',
          p: {xs: '1rem', sm: '2rem'},
          boxShadow: 2,
        }}
      >
        <Box
          textAlign="center"
          my={{xs: '1rem', sm: '2rem', md: '3rem'}}
          width="100%"
        >
          {userData ? (
            <>
              <Typography variant="h3" component="h1" gutterBottom>
                {userData[0].owner.username}
              </Typography>
              <Avatar
                src={avatar}
                imgProps={{
                  alt: `${userData[0].owner.username}'s profile picture`,
                }}
                sx={{
                  margin: '0 auto',
                  width: {xs: '10rem', sm: '12rem'},
                  height: {xs: '10rem', sm: '12rem'},
                  marginBottom: '1rem',
                }}
              />

              {userData && userData.length > 0 && (
                <ReviewTable userid={userData[0].user_id} />
              )}
            </>
          ) : (
            <Box my="1rem">
              <CircularProgress />
              <Typography>Loading user data...</Typography>
            </Box>
          )}
        </Box>
      </Container>
      <ClientStatistics targetId={userData ? userData[0].user_id : null} />
    </>
  );
};

export default ReviewerProfile;
