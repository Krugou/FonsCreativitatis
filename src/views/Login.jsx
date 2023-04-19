import React, {useState} from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button, Grid, Typography} from '@mui/material';

const Login = (props) => {
  const [formToggle, setFormToggle] = useState(true);
  const toggle = () => {
    setFormToggle(!formToggle);
  };

  return (
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
        {formToggle ? <LoginForm /> : <RegisterForm toggle={toggle} />}
      </Grid>
      <Grid item xs={6}>
        <p>{formToggle ? 'First time here?' : 'or'}</p>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={toggle}> {formToggle ? 'Register' : 'Login'}</Button>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {};

export default Login;
