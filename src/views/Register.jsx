import {Button, Grid} from '@mui/material';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import HeroImage from '../components/HeroImage';
import RegisterForm from '../components/RegisterForm';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

const Register = () => {
  const viewText = 'Register';
  useScrollToTop();
  usePageTitle(viewText);
  const navigate = useNavigate();
  const toggle = () => {
    navigate('/login');
  };

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
          <RegisterForm toggle={toggle} />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            sx={{
              borderRadius: '20px',
              width: '15em',
            }}
            type="submit"
            variant="contained"
            onClick={toggle}
          >
            {' '}
            or go to Login page
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
