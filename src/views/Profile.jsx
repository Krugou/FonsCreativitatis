import {Avatar} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
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
          <h1>Profile</h1>
          <Avatar
            src={avatar}
            imgProps={{alt: `${user.username}'s profile picture`}}
          />
          <p>Username: {user.username}</p>
          <p>Full name: {user.full_name}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </>
  );
};

export default Profile;
