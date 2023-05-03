const registerValidators = {
  username: ['required', 'minStringLength:3', 'isUsernameAvailable'],
  password: ['required', 'minStringLength:5'],
  confirm: ['required', 'isPasswordMatch'],
  email: ['required', 'isEmail'],
  full_name: ['matchRegexp:^(.{2,})?$'],
};

const editValidators = {
  username: ['matchRegexp:^(.{3,})?$', 'isUsernameAvailable'],
  password: ['matchRegexp:^(.{5,})?$'],
  confirm: ['isPasswordMatch'],
  email: ['isEmail'],
  full_name: ['matchRegexp:^(.{2,})?$'],
};

const loginValidators = {
  username: ['required'],
  password: ['required'],
};

const reviewValidators = {
  title: ['required', 'minStringLength:3'],
  review: ['required', 'minStringLength:2'],
};
export {loginValidators, registerValidators, reviewValidators, editValidators};
