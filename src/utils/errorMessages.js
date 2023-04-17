const registerForm = {
  username: [
    'this field is required',
    'username must be atleast 3 characters',
    'username is not available',
  ],
  password: ['this field is required', 'password must be atleast 5 characters'],
  confirm: ['this field is required', 'passwords do not match'],
  email: ['this field is required', 'email is not valid'],
  full_name: ['full name is invalid '],
};

const loginForm = {
  username: ['this field is required'],
  password: ['this field is required'],
};
export {registerForm, loginForm};
