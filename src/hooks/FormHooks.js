import {useState} from 'react';

const useForm = (callback, initState) => {
  // tekee alussa staten, jonka alkuarvo on initState
  const [inputs, setInputs] = useState(initState);
  console.log(inputs);
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };
  const handleInputChange = (event) => {
    event.presist && event.persist();
    setInputs((inputs) => {
      return {
        ...inputs,
        [event.target.name]: event.target.value,
      };
    });
  };
  return {inputs, handleSubmit, handleInputChange};
};

export default useForm;
