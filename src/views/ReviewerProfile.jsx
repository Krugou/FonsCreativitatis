import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import HeroImage from '../components/HeroImage';
import {MediaContext} from '../contexts/MediaContext';
import UserIdContext from '../contexts/UserIdContext';
import {doFetch, useAuthentication} from '../hooks/ApiHooks';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

import {useTags} from '../hooks/ApiHooks';
import {baseUrl, generalUser, mediaUrl} from '../utils/variables';
const ReviewerProfile = () => {
  const viewText = 'Profile';
  useScrollToTop();
  usePageTitle(viewText);
  const {id} = useContext(UserIdContext);
  const {getTag} = useTags();
  const {user, update, setUpdate} = useContext(MediaContext);

  const {postLogin} = useAuthentication();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const generalUserLog = await postLogin(generalUser);

      const token = user
        ? localStorage.getItem('userToken')
        : generalUserLog.token;
      try {
        // Fetch user details
        const userDetailsUrl = `${baseUrl}users/${id}`;
        const userDetailsOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        };
        const userDetails = await doFetch(userDetailsUrl, userDetailsOptions);

        // Fetch user media
        const userMediaUrl = `${baseUrl}media/user/${id}`;
        const userMediaOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const userMedia = await doFetch(userMediaUrl, userMediaOptions);

        // Remove duplicate titles
        const uniqueData = userMedia.reduce((acc, item) => {
          if (
            acc.findIndex(
              (existingItem) => existingItem.title === item.title
            ) === -1
          ) {
            acc.push(item);
          }
          return acc;
        }, []);

        // Combine user details and user media data
        const data = {
          ...userDetails,
          userMedia: uniqueData,
        };

        setUserData(data);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserData();
  }, [id]);
  const [avatar, setAvatar] = useState('https://placekitten.com/300');
  const getProfilePic = async () => {
    try {
      if (id) {
        const file = await getTag('avatarJAK_' + id);
        console.log(file);
        setAvatar(mediaUrl + file[0].filename);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getProfilePic();
  }, [id]);
  return (
    <>
      <HeroImage heroText={viewText} />
      <Container
        maxWidth="sm"
        sx={{
          marginTop: '2rem',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          borderRadius: '0.125rem',
          p: {xs: '1rem', sm: '2rem'},
          boxShadow: 2,
        }}
      >
        <Box textAlign="center" my={{xs: '1rem', sm: '2rem', md: '3rem'}}>
          {userData ? (
            <>
              <Typography variant="h3" component="h1" gutterBottom>
                {userData.username}
              </Typography>
              <Avatar
                src={avatar}
                imgProps={{alt: `${userData.username}'s profile picture`}}
                sx={{
                  width: {xs: '10rem', sm: '12rem'},
                  height: {xs: '10rem', sm: '12rem'},
                  marginBottom: '1rem',
                }}
              />
              <Box
                mt={{xs: '0.5rem', sm: '1rem', md: '1.5rem'}}
                px={{xs: '1rem', sm: '2rem', md: '3rem'}}
              >
                {userData.userMedia.map((item) => (
                  <Box
                    key={item.title}
                    mb={{xs: '0.5rem', sm: '1rem', md: '1.5rem'}}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{textDecoration: 'none', color: 'inherit'}}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </>
          ) : (
            <Box my="1rem">
              <CircularProgress />
              <Typography>Loading user data...</Typography>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default ReviewerProfile;
