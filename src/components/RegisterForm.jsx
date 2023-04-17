import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import useForm from '../hooks/FormHooks';
import {useUser} from '../hooks/apiHooks';
import {Button} from '@mui/material';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {registerForm} from '../utils/errorMessages';
import {registerValidators} from '../utils/validators';

const RegisterForm = ({toggle}) => {
  const {postUser, getCheckUser} = useUser();

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
      const userResult = postUser(withoutConfirm);
      alert(userResult.message);
      toggle();
    } catch (error) {
      alert(error.message);
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
      <ValidatorForm onSubmit={handleSubmit} noValidate>
        <TextValidator
          fullWidth
          margin="dense"
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
          value={inputs.username}
          validators={registerValidators.username}
          errorMessages={registerForm.username}
        />
        <TextValidator
          fullWidth
          margin="dense"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
          value={inputs.password}
          validators={registerValidators.password}
          errorMessages={registerForm.password}
        />
        <TextValidator
          fullWidth
          margin="dense"
          name="confirm"
          type="password"
          placeholder="Confirm Password"
          onChange={handleInputChange}
          value={inputs.confirm}
          validators={registerValidators.confirm}
          errorMessages={registerForm.confirm}
        />
        <TextValidator
          fullWidth
          margin="dense"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleInputChange}
          value={inputs.email}
          validators={registerValidators.email}
          errorMessages={registerForm.email}
        />
        <TextValidator
          fullWidth
          margin="dense"
          name="full_name"
          placeholder="Full name"
          onChange={handleInputChange}
          value={inputs.full_name}
          validators={registerValidators.full_name}
          errorMessages={registerForm.full_name}
        />
        <Button fullWidth sx={{mt: 1}} type="submit" variant="contained">
          {' '}
          Register
        </Button>
      </ValidatorForm>
    </>
  );
};

RegisterForm.propTypes = {
  toggle: PropTypes.func,
};

export default RegisterForm;
