import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import ClientStatistics from '../components/ClientStatistics';

import React, {useContext, useEffect, useState} from 'react';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {useNavigate} from 'react-router-dom';
import HeroImage from '../components/HeroImage';
import {MediaContext} from '../contexts/MediaContext';
import {useMedia, useTags, useUser, useComments} from '../hooks/ApiHooks';
import useForm from '../hooks/FormHooks';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

import {editForm} from '../utils/errorMessages';
import {editValidators} from '../utils/validators';
import {mediaUrl} from '../utils/variables';
import ErrorAlert from '../components/ErrorAlert';
const Profile = () => {
  const viewText = 'Profile';
  useScrollToTop();
  usePageTitle(viewText);
  const {user, setUser} = useContext(MediaContext);
  const {getTag} = useTags();
  const [file, setFile] = useState(null);

  const [avatar, setAvatar] = useState('./valtteri320.png');
  const [selectedImage, setSelectedImage] = useState(avatar);
  const [avatarInfo, setAvatarInfo] = useState(avatar);
  const [alert, setAlert] = useState('');
  const {deleteCommentsByUser} = useComments();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {putUser, getCheckUser, getUserByToken} = useUser();
  const {getAllFiles, deleteMedia, postMedia} = useMedia();
  const {postTag} = useTags();
  const navigate = useNavigate();
  const getProfilePic = async () => {
    try {
      if (user) {
        const file = await getTag('avatarJAK_' + user.user_id);
        setAvatar(mediaUrl + file[0].filename);
        setSelectedImage(mediaUrl + file[0].filename);
        setAvatarInfo(file[0]);
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

  const deleteAccount = async () => {
    try {
      // TODO: DELETE AVATAR also
      // Step 1. Delete all files of the user
      const token = localStorage.getItem('userToken');
      const allFiles = await getAllFiles(user.user_id, token);
      await deleteCommentsByUser(user.user_id, token);

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

      const data = {
        username: randomUsername,
        password: randomPassword,
        email: randomEmail,
      };
      const modifyAccount = await putUser(data, token);
      navigate('/logout');
    } catch (error) {
      /* */
    }
  };
  const {inputs, setInputs, handleInputChange} = useForm();
  const modifyProfile = async () => {
    if (file) {
      try {
        const token = localStorage.getItem('userToken');
        const data = new FormData();
        data.append('title', 'Profile Avatar');
        data.append('file', file);

        // DELETE PREVIOUS Avatar before posting new one
        if (avatarInfo.file_id) {
          const deleteResponse = await deleteMedia(avatarInfo.file_id, token);
        }

        const uploadFile = await postMedia(data, token);
        await postTag(
          {
            file_id: uploadFile.file_id,
            tag: 'avatarJAK_' + user.user_id,
          },
          token
        );
        handleModalClose();
        getProfilePic();
        setFile(null);
      } catch (error) {
        setAlert(error.message);
      }
    }
    if (inputs) {
      try {
        const withoutConfirm = {...inputs};
        delete withoutConfirm.confirm;

        for (const [key, value] of Object.entries(withoutConfirm)) {
          if (value === '') delete withoutConfirm[key];
        }
        const token = localStorage.getItem('userToken');
        await putUser(withoutConfirm, token);
        handleModalClose();
        const user = await getUserByToken(token);
        setUser(user);
        setInputs(null);
      } catch (error) {
        /* */
      }
    }
  };

  const handleFileChange = (event) => {
    event.persist();
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setSelectedImage(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      return value === inputs?.password || inputs?.password === undefined;
    });
    ValidatorForm.addValidationRule('isUsernameAvailable', async (value) => {
      if (value !== '') {
        return await getCheckUser(inputs?.username);
      }
      return true;
    });
  }, [inputs]); // Päivittää useeffectin kun inputs muuttuu

  const onCancel = () => {
    setInputs(null);
    handleModalClose();
    setFile(null);
    setSelectedImage(avatar);
  };

  return (
    <>
      {alert && <ErrorAlert onClose={() => setAlert(null)} alert={alert} />}

      <HeroImage heroText={viewText} />

      {user && (
        <>
          <Container
            sx={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'background.paper',
              borderRadius: '0.125rem',
              p: {xs: '1rem', sm: '2rem'},
              boxShadow: 2,
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Typography
                  variant="h4"
                  sx={{
                    marginBottom: '1rem',
                    color: 'text.primary',
                    fontWeight: 'bold',
                    fontSize: {xs: '2rem', sm: '2.5rem', md: '3rem'},
                  }}
                >
                  {user.username}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  src={avatar}
                  imgProps={{alt: `${user.username}'s profile picture`}}
                  sx={{
                    width: {xs: '10rem', sm: '12rem'},
                    height: {xs: '10rem', sm: '12rem'},
                    marginBottom: '1rem',
                  }}
                />
              </Grid>

              {user.full_name && (
                <Grid item>
                  <Typography variant="subtitle1">{user.full_name}</Typography>
                </Grid>
              )}
              <Grid item>
                <Typography variant="subtitle1">{user.email}</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: '1rem',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: {xs: '0.9rem', sm: '1rem'},
                  }}
                  onClick={handleModalOpen}
                >
                  Edit profile
                </Button>
              </Grid>
            </Grid>
          </Container>
          <ClientStatistics targetId={user.user_id} />
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
              <ValidatorForm onSubmit={modifyProfile}>
                <TextValidator
                  label="New username"
                  name="username"
                  value={inputs?.username || ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  sx={{mt: 3}}
                  validators={editValidators.username}
                  errorMessages={editForm.username}
                />
                <TextValidator
                  label="New password"
                  name="password"
                  type="password"
                  value={inputs?.password || ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  sx={{mt: 3}}
                  validators={editValidators.password}
                  errorMessages={editForm.password}
                />
                <TextValidator
                  fullWidth
                  margin="normal"
                  name="confirm"
                  type="password"
                  label="Confirm Password"
                  onChange={handleInputChange}
                  value={inputs?.confirm || ''}
                  validators={editValidators.confirm}
                  errorMessages={editForm.confirm}
                />
                <TextValidator
                  label="New email"
                  name="email"
                  type="email"
                  value={inputs?.email || ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  validators={editValidators.email}
                  errorMessages={editForm.email}
                  sx={{mt: 3}}
                />
                <TextValidator
                  label="New full name"
                  name="full_name"
                  value={inputs?.full_name || ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  sx={{mt: 3}}
                  validators={editValidators.full_name}
                  errorMessages={editForm.full_name}
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
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              </ValidatorForm>
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
