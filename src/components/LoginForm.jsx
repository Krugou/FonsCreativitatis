import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import useForm from '../hooks/FormHooks';
import {useAuthentication} from '../hooks/apiHooks';
import {useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {Button, TextField} from '@mui/material';
import {loginValidators} from '../utils/validators';
import {loginForm} from '../utils/errorMessages';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';

const LoginForm = (props) => {
  const {setUser} = useContext(MediaContext);
  const {postLogin} = useAuthentication();
  const navigate = useNavigate();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      const loginResult = await postLogin(inputs);
      localStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doLogin,
    initValues
  );

  return (
    <>
      <ValidatorForm onSubmit={handleSubmit} noValidate>
        <TextValidator
          fullWidth
          margin="dense"
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
          value={inputs.username}
          validators={loginValidators.username}
          errorMessages={loginForm.username}
        />
        <TextValidator
          fullWidth
          margin="dense"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
          value={inputs.password}
          validators={loginValidators.password}
          errorMessages={loginForm.password}
        />
        <Button fullWidth sx={{mt: 1}} type="submit" variant="contained">
          {' '}
          Login
        </Button>
      </ValidatorForm>
    </>
  );
};
LoginForm.propTypes = {};

export default LoginForm;
