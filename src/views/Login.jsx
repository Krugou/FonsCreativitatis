import {Button, Grid} from '@mui/material';
import React from 'react';
import HeroImage from '../components/HeroImage';
import LoginForm from '../components/LoginForm';

const Login = (props) => {
  return (
    <>
      <HeroImage heroText="Login" />
      <Grid
        sx={{
          marginTop: '5em',
        }}
        container
        direction={'column'}
        alignItems="center"
      >
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4em',
            textAlign: 'center',
          }}
          item
          xs={6}
        >
          <LoginForm />
        </Grid>
        <Grid item xs={12}>
          <Button> Login </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
