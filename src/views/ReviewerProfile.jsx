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
import {MediaContext} from '../contexts/MediaContext';
import UserIdContext from '../contexts/UserIdContext';
import {doFetch, useAuthentication} from '../hooks/ApiHooks';
import {baseUrl, generalUser} from '../utils/variables';
const ReviewerProfile = () => {
  const {id} = useContext(UserIdContext);
  console.log('🚀 ~ file: ReviewerProfile.jsx ~ ReviewerProfile ~ id', id);
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

  return (
    <Container>
      <Box textAlign="center" my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Reviewer Profile
        </Typography>
        {userData ? (
          <>
            <Typography variant="h4" component="h2" gutterBottom>
              {userData.username}
            </Typography>
            <Box mt={2}>
              {userData.userMedia.map((item) => (
                <Typography
                  key={item.title}
                  variant="h6"
                  component="p"
                  gutterBottom
                >
                  {item.title}
                </Typography>
              ))}
            </Box>
          </>
        ) : (
          <Box my={2}>
            <CircularProgress />
            <Typography>Loading user data...</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ReviewerProfile;
