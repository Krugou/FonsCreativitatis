import {Avatar, Box} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useTags} from '../hooks/apiHooks';
import {mediaUrl} from '../utils/variables';

const Profile = () => {
  const {user} = useContext(MediaContext);
  const {getTag} = useTags();

  const [avatar, setAvatar] = useState('https://placekitten.com/300');

  const getProfilePic = async () => {
    try {
      if (user) {
        const file = await getTag('avatar_' + user.user_id);
        setAvatar(mediaUrl + file.pop().filename);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProfilePic();
  }, [user]); // jos taulukko tyhjä, ajetaan vain kerran
  return (
    <>
      {user && (
        <>
          <div
            style={{
              display: 'flex',
              marginTop: '10px',

              justifyContent: 'center',
              alignItems: 'start',
              height: '100vh',
            }}
          >
            <Box>
              <h1>Profile</h1>
              <Avatar
                src={avatar}
                imgProps={{alt: `${user.username}'s profile picture`}}
                sx={{width: '5rem', height: '5rem'}}
              />
              <p>Username: {user.username}</p>
              {/* if user has full name show it if not dont */}
              {user.full_name && <p>Full name: {user.full_name}</p>}
              <p>Email: {user.email}</p>
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
