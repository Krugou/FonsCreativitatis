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
import {useMedia, useTags, useUser} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';
import useForm from '../hooks/FormHooks';
import {useNavigate} from 'react-router-dom';

const Profile = () => {
  const {user} = useContext(MediaContext);
  const {getTag} = useTags();
  const [file, setFile] = useState(null);

  const [avatar, setAvatar] = useState('https://placekitten.com/300');
  const [selectedImage, setSelectedImage] = useState(avatar);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {putUser} = useUser();
  const {getAllFiles, deleteMedia} = useMedia();
  const navigate = useNavigate();
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

  const deleteAccount = async () => {
    try {
      const token = localStorage.getItem('userToken');

      // TODO: DELETE AVATAR also
      // Step 1. Delete all files of the user
      const allFiles = await getAllFiles(user.user_id, token);
      console.log(allFiles);

      allFiles.forEach(async (file) => {
        await deleteMedia(file.file_id, token);
      });
      // Step 2. modify user's username and password to random stuff
      const generateRandomString = (length) => {
        let result = '';
        const characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      };

      const generateRandomEmail = () => {
        const username = generateRandomString(12); // use the previously defined function to generate a random string for the username
        const domains = [
          'gmail.com',
          'yahoo.com',
          'hotmail.com',
          'outlook.com',
        ]; // list of possible domains
        const domain = domains[Math.floor(Math.random() * domains.length)]; // pick a random domain from the list
        return `${username}@${domain}`; // return the random email address
      };
      // TODO: FIX EMAIL AOWSDJAWOIDJAIWODJAWIODJ
      const randomUsername = generateRandomString(12);
      const randomPassword = generateRandomString(12);
      const randomEmail = generateRandomEmail();

      console.log(randomUsername);
      console.log(randomPassword);
      console.log(randomEmail);

      const data = {
        username: randomUsername,
        password: randomPassword,
        email: randomEmail,
      };
      const modifyAccount = await putUser(data, token);
      console.log(modifyAccount);
      navigate('/logout');
      alert('account Deleted');
    } catch (error) {
      alert(error.message);
    }
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
                width: {xs: '80%', sm: '70%', md: '50%'},
                maxHeight: '90vh',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '6px',
                },
                borderRadius: '20px',
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
                  label="New username"
                  name="username"
                  value={inputs?.username || ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  sx={{mt: 3}}
                />
                <TextField
                  label="New full name"
                  name="full_name"
                  value={inputs?.full_name || ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  sx={{mt: 3}}
                />
                <TextField
                  label="New email"
                  name="email"
                  value={inputs?.email || ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  sx={{mt: 3}}
                />
                <Box sx={{position: 'relative'}}>
                  <Button
                    variant="outlined"
                    component="label"
                    htmlFor="fileInput"
                    sx={{
                      borderRadius: '20px',
                      borderColor: 'primary.main',
                      '&:hover': {borderColor: 'primary.dark'},
                    }}
                  >
                    Upload Avatar
                  </Button>
                  <input
                    type="file"
                    id="fileInput"
                    name="fileInput"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{display: 'none'}}
                  />
                </Box>

                {avatar && (
                  <Avatar
                    src={selectedImage}
                    imgProps={{alt: `${user.username}'s profile picture`}}
                    sx={{width: '5rem', height: '5rem', mt: 3}}
                  />
                )}
                <Box sx={{mt: 3}}>
                  <Button variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ml: 2}}
                    onClick={handleModalClose}
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
          <Button onClick={deleteAccount} color="error" disabled>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
