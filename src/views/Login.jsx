import {Button, Grid} from '@mui/material';
import React from 'react';
import HeroImage from '../components/HeroImage';
import LoginForm from '../components/LoginForm';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

const Login = (props) => {
  const viewText = 'Login';
  useScrollToTop();
  usePageTitle(viewText);
  return (
    <>
      <HeroImage heroText={viewText} />
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
      </Grid>
    </>
  );
};

export default Login;
