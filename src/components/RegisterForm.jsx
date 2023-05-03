import {Button, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import useForm from '../hooks/FormHooks';
import {useUser} from '../hooks/apiHooks';
import {registerForm} from '../utils/errorMessages';
import {registerValidators} from '../utils/validators';
import ErrorAlert from './ErrorAlert';

const RegisterForm = ({toggle}) => {
  const {postUser, getCheckUser} = useUser();
  const [alert, setAlert] = useState('');

  const initValues = {
    username: '',
    password: '',
    confirm: '',
    email: '',
    full_name: '',
  };

  const doRegister = async () => {
    try {
      const withoutConfirm = {...inputs};
      delete withoutConfirm.confirm;
      await postUser(withoutConfirm);
      toggle();
    } catch (error) {
      setAlert(error.message);
    }
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doRegister,
    initValues
  );

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      /*
      if (value !== inputs.password) {
        return false;
      }
      return true;
      */
      return value === inputs.password;
    });
    ValidatorForm.addValidationRule('isUsernameAvailable', async (value) => {
      return await getCheckUser(inputs.username);
    });
  }, [inputs]); // Päivittää useeffectin kun inputs muuttuu

  return (
    <>
      {alert && <ErrorAlert onClose={() => setAlert(null)} alert={alert} />}

      <Typography component="h1" variant="h3">
        Register
      </Typography>
      <ValidatorForm onSubmit={handleSubmit} noValidate>
        <TextValidator
          fullWidth
          margin="normal"
          name="username"
          label="Username"
          onChange={handleInputChange}
          value={inputs.username}
          validators={registerValidators.username}
          errorMessages={registerForm.username}
        />
        <TextValidator
          fullWidth
          margin="normal"
          name="password"
          type="password"
          label="Password"
          onChange={handleInputChange}
          value={inputs.password}
          validators={registerValidators.password}
          errorMessages={registerForm.password}
        />
        <TextValidator
          fullWidth
          margin="normal"
          name="confirm"
          type="password"
          label="Confirm Password"
          onChange={handleInputChange}
          value={inputs.confirm}
          validators={registerValidators.confirm}
          errorMessages={registerForm.confirm}
        />
        <TextValidator
          fullWidth
          margin="normal"
          name="email"
          type="email"
          label="Email"
          onChange={handleInputChange}
          value={inputs.email}
          validators={registerValidators.email}
          errorMessages={registerForm.email}
        />
        <TextValidator
          fullWidth
          margin="normal"
          name="full_name"
          label="Full name"
          onChange={handleInputChange}
          value={inputs.full_name}
          validators={registerValidators.full_name}
          errorMessages={registerForm.full_name}
        />
        <Button
          fullWidth
          sx={{
            borderRadius: '20px',
            width: '15em',
          }}
          type="submit"
          variant="contained"
        >
          {' '}
          Register Account
        </Button>
      </ValidatorForm>
    </>
  );
};

RegisterForm.propTypes = {
  toggle: PropTypes.func,
};

export default RegisterForm;
