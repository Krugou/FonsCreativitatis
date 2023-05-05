import {Button, Typography} from '@mui/material';
import React, {useContext, useState} from 'react';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import useForm from '../hooks/FormHooks';
import {useAuthentication} from '../hooks/apiHooks';
import {loginForm} from '../utils/errorMessages';
import {loginValidators} from '../utils/validators';
import ErrorAlert from './ErrorAlert';

const LoginForm = (props) => {
  const {setUser} = useContext(MediaContext);
  const {postLogin} = useAuthentication();
  const [alert, setAlert] = useState('');

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
      navigate('/');
    } catch (error) {
      setAlert(error.message);
    }
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doLogin,
    initValues
  );

  return (
    <>
      {alert && <ErrorAlert onClose={() => setAlert(null)} alert={alert} />}

      
      <ValidatorForm onSubmit={handleSubmit} noValidate>
        <TextValidator
          fullWidth
          margin="normal"
          name="username"
          label="Username"
          onChange={handleInputChange}
          value={inputs.username}
          validators={loginValidators.username}
          errorMessages={loginForm.username}
        />
        <TextValidator
          fullWidth
          margin="normal"
          name="password"
          type="password"
          label="Password"
          onChange={handleInputChange}
          value={inputs.password}
          validators={loginValidators.password}
          errorMessages={loginForm.password}
        />
        <Button
          sx={{
            borderRadius: '20px',
            width: '10em',
          }}
          fullWidth
          type="submit"
          variant="contained"
        >
          {' '}
          Login
        </Button>
      </ValidatorForm>
    </>
  );
};
LoginForm.propTypes = {};

export default LoginForm;
