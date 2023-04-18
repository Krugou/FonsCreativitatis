import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
  Slider,
  TextField,
} from '@mui/material';
import useForm from '../hooks/FormHooks';
import {useMedia, useTags} from '../hooks/apiHooks';
import {useNavigate} from 'react-router-dom';
import {appId} from '../utils/variables';

const Upload = (props) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    'https://media.mw.metropolia.fi/wbma/uploads/81656b38be55c675abac021df9186eb2.png'
  );
  // https://placehold.co/600x400?text=Choose+Media
  const {postMedia} = useMedia();
  const {postTag} = useTags();
  const initValues = {
    title: '',
    description: '',
  };

  const filterInitValues = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
  };

  const doUpload = async () => {
    try {
      const data = new FormData();
      data.append('title', inputs.title);
      const allData = {
        desc: inputs.description,
        filters: filterInputs,
      };

      data.append('description', JSON.stringify(allData));
      data.append('file', file);
      const userToken = localStorage.getItem('userToken');
      const uploadResult = await postMedia(data, userToken);
      const tagResult = await postTag(
        {
          file_id: uploadResult.file_id,
          tag: appId,
        },
        userToken
      );
      console.log('doUpload', tagResult);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFileChange = (event) => {
    event.persist();
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setSelectedImage(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doUpload,
    initValues
  );

  const {inputs: filterInputs, handleInputChange: handleFilterChange} = useForm(
    null,
    filterInitValues
  );
  console.log('upload', inputs);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} container justifyContent="center" mt={3}>
        <img
          src={selectedImage}
          alt="preview"
          style={{width: '30%', border: '1px solid black'}}
        />
      </Grid>
      <Grid item container direction="column" xs={12} md={8} lg={6}>
        <TextField
          onChange={handleInputChange}
          type="text"
          name="title"
          margin="normal"
          label="Review Title"
          value={inputs.title}
        />
        <TextField
          onChange={handleInputChange}
          name="description"
          label="Review"
          margin="normal"
          multiline
          value={inputs.description}
        ></TextField>
        <Rating name="restaurant-rating" defaultValue={0} precision={0.5} />

        <Button variant="outlined" component="label" sx={{mt: 2}}>
          Upload File
          <input
            onChange={handleFileChange}
            type="file"
            name="file"
            accept="image/*,video/*,audio/*"
            hidden
          />
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{mt: 3}}
          onClick={handleSubmit}
        >
          Add Review
        </Button>
      </Grid>
    </Grid>
  );
};

Upload.propTypes = {};

export default Upload;
