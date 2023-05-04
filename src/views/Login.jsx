import {Button, Grid} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import HeroImage from '../components/HeroImage';
import LoginForm from '../components/LoginForm';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

const Login = (props) => {
  const navigate = useNavigate();
  const viewText = 'Login';
  useScrollToTop();
  usePageTitle(viewText);
  const toggle = () => {
    navigate('/register');
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
          <LoginForm />
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
            or go to Register page
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
