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
    <Grid container direction={'column'} alignItems="center">
      <Grid item xs={6}>
        <Typography component="h1" variant="h3">
          Login / Register
        </Typography>
      </Grid>
      <Grid item xs={6}>
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
