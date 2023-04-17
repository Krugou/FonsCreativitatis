import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Slider} from '@mui/material';
import useForm from '../hooks/FormHooks';
import {useMedia} from '../hooks/apiHooks';
import {useLocation, useNavigate} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';

const Update = (props) => {
  const {putMedia} = useMedia();
  const navigate = useNavigate();
  const {state} = useLocation();
  const file = state.file;

  const selectedImage = mediaUrl + file.filename;

  let allData = {
    desc: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };
  try {
    allData = JSON.parse(file.description);
  } catch (error) {
    /* Empty */
  }

  const initValues = {
    title: file.title,
    description: allData.desc,
  };

  const filterInitValues = allData.filters;

  const doUpdate = async () => {
    try {
      const allData = {
        desc: inputs.description,
        filters: filterInputs,
      };
      const data = {
        title: inputs.title,
        description: JSON.stringify(allData),
      };
      const userToken = localStorage.getItem('userToken');
      const updateResult = await putMedia(file.file_id, data, userToken);
      console.log('doUpdate', updateResult);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doUpdate,
    initValues
  );

  const {inputs: filterInputs, handleInputChange: handleFilterChange} = useForm(
    null,
    filterInitValues
  );

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

Update.propTypes = {};

export default Update;
