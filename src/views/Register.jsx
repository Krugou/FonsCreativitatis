import {Button, Grid} from '@mui/material';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import HeroImage from '../components/HeroImage';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  const navigate = useNavigate();
  const toggle = () => {
    navigate('/login');
  };

  return (
    <>
      <HeroImage heroText="Register" />
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
          <RegisterForm toggle={toggle} />
        </Grid>
        <Grid item xs={6}>
          <p>First time here?</p>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={toggle}>Login</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
