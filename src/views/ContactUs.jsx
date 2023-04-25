import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import React, {useState} from 'react';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const ContactUs = () => {
  const classes = useStyles();
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
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: '0 auto',
      }}
      className={classes.form}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <TextField
        label="Message"
        multiline
        rows={4}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
      />
      <Button
        sx={{marginTop: '16px'}}
        variant="contained"
        color="primary"
        type="submit"
        className={classes.submitButton}
      >
        Submit
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Your message has been sent!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default ContactUs;
