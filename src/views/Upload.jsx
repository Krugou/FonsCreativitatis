import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Slider} from '@mui/material';
import useForm from '../hooks/FormHooks';
import {useMedia, useTags} from '../hooks/apiHooks';
import {useNavigate} from 'react-router-dom';
import {appId} from '../utils/variables';

const Upload = (props) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    'https://placekitten.com/600/400'
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
    <Box>
      <img
        src={selectedImage}
        alt="preview"
        style={{
          width: 300,
          height: 200,
          filter: `brightness(${filterInputs.brightness}%) contrast(${filterInputs.contrast}%) saturate(${filterInputs.saturation}%) sepia(${filterInputs.sepia}%)`,
        }}
      />
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          type="text"
          name="title"
          value={inputs.title}
        />
        <textarea
          onChange={handleInputChange}
          name="description"
          value={inputs.description}
        ></textarea>
        <input
          onChange={handleFileChange}
          type="file"
          name="file"
          accept="image/*,video/*,audio/*"
        />
        <Button type="submit">Upload</Button>
      </form>
      <Slider
        name="brightness"
        min={0}
        max={200}
        step={1}
        valueLabelDisplay="auto"
        value={filterInputs.brightness}
        onChange={handleFilterChange}
      />
      <Slider
        name="contrast"
        min={0}
        max={200}
        step={1}
        valueLabelDisplay="auto"
        value={filterInputs.contrast}
        onChange={handleFilterChange}
      />
      <Slider
        name="saturation"
        min={0}
        max={200}
        step={1}
        valueLabelDisplay="auto"
        value={filterInputs.saturation}
        onChange={handleFilterChange}
      />
      <Slider
        name="sepia"
        min={0}
        max={100}
        step={1}
        valueLabelDisplay="auto"
        value={filterInputs.sepia}
        onChange={handleFilterChange}
      />
    </Box>
  );
};

Upload.propTypes = {};

export default Upload;
