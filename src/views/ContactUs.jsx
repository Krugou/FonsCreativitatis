import {Box} from '@mui/material/';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import HeroImage from '../components/HeroImage';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const ContactUs = () => {
  const viewText = 'Contact Us';
  useScrollToTop();
  usePageTitle(viewText);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: implement logic to send form data to backend
    setOpenSnackbar(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <HeroImage heroText={viewText} />
      <Container maxWidth="sm">
        <Box
          component="form"
          sx={{
            mt: 4,
            mx: 'auto',
            p: 2,
          }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                sx={{mt: 2}}
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          sx={{
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '600px',
          }}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            Your message has been sent!
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default ContactUs;
