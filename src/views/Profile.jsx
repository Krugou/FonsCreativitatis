import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import HeroImage from '../components/HeroImage';
import {MediaContext} from '../contexts/MediaContext';
import {useTags} from '../hooks/apiHooks';
import {mediaUrl} from '../utils/variables';
import useForm from '../hooks/FormHooks';
import DeleteModal from '../components/DeleteModal';

const Profile = () => {
  const {user} = useContext(MediaContext);
  const {getTag} = useTags();
  const [file, setFile] = useState(null);

  const [avatar, setAvatar] = useState('https://placekitten.com/300');
  const [selectedImage, setSelectedImage] = useState(avatar);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getProfilePic = async () => {
    try {
      if (user) {
        const file = await getTag('avatar_' + user.user_id);
        setAvatar(mediaUrl + file.pop().filename);
        setSelectedImage(mediaUrl + file.pop().filename);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProfilePic();
  }, [user]); // jos taulukko tyhjä, ajetaan vain kerran

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const doUpload = () => {
    alert('submitattu');
    handleModalClose();
  };

  const deleteAccount = () => {
    alert('account Deleted');
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(doUpload);

  const handleFileChange = (event) => {
    console.log(event.target.files);
    event.persist();
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setSelectedImage(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <>
      <HeroImage heroText="Profile" />

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
              <Button variant="contained" onClick={handleModalOpen}>
                Edit profile
              </Button>
            </Box>
          </div>
          <Modal open={isModalOpen} onClose={handleModalClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottom: '1px solid black',
                  mb: 4,
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                  }}
                  sx={{
                    mb: 4,
                  }}
                >
                  Delete My Profile
                </Button>
              </Box>
              <Typography variant="h4">Edit Profile</Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Username"
                  name="username"
                  value={inputs?.username || ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Full Name"
                  name="full_name"
                  value={inputs?.full_name || ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  name="email"
                  value={inputs?.email || ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {avatar && (
                  <Avatar
                    src={selectedImage}
                    imgProps={{alt: `${user.username}'s profile picture`}}
                    sx={{width: '5rem', height: '5rem'}}
                  />
                )}
                <Box sx={{marginTop: '16px'}}>
                  <Button variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{marginLeft: '16px'}}
                    onClick={handleModalClose}
                    // onClick={onClose}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            </Box>
          </Modal>
        </>
      )}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
      >
        <DialogTitle>Delete your account?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete your account?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
