import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Rating,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import useForm from '../hooks/FormHooks';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

import HeroImage from '../components/HeroImage';
import {useMedia} from '../hooks/apiHooks';
import {mediaUrl} from '../utils/variables';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {reviewValidators} from '../utils/validators';
import {reviewForm} from '../utils/errorMessages';
const Update = (props) => {
  const {putMedia} = useMedia();
  const navigate = useNavigate();
  const {state} = useLocation();
  const viewText = 'Update';
  const file = state;
  console.log(file);
  let fileDesc;
  try {
    fileDesc = JSON.parse(file.description);
  } catch (error) {
    /* */
  }
  useScrollToTop();
  usePageTitle(viewText);
  const [restaurantRating, setRestaurantRating] = useState(
    fileDesc.stars ? fileDesc.stars : null
  );
  const [selectedImage] = useState(mediaUrl + file.thumbnails?.w640);
  const [selectedTags, setSelectedTags] = useState(
    fileDesc.tags ? fileDesc.tags : []
  );

  console.log(fileDesc);
  const initValues = {
    title: file?.title,
    review: fileDesc?.review,
    stars: fileDesc?.stars,
    website: fileDesc?.website,
    address: fileDesc?.address,
    city: fileDesc?.city,
  };

  const doUpdate = async () => {
    try {
      const allData = {
        desc: inputs.description,
      };
      const data = {
        title: inputs.title,
        description: JSON.stringify(allData),
      };
      console.log(data, allData);
      /*
      const userToken = localStorage.getItem('userToken');
      const updateResult = await putMedia(file?.file_id, data, userToken);
      console.log('doUpdate', updateResult);
      navigate('/');
      */
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (event) => {
    const {
      target: {value},
    } = event;
    setSelectedTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    console.log(selectedTags);
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doUpdate,
    initValues
  );
  const tagNames = [
    'Burgers',
    'Child friendly',
    'Chinese food',
    'Cozy',
    'Date restaurant',
    'Fast food',
    'Indian food',
    'Kebab restaurant',
    'Nightclub',
    'Pizzeria',
    'Romantic',
    'Vegan food',
    'Vegetarian food',
  ];
  console.log(selectedTags);
  return (
    <>
      <HeroImage heroText={viewText} />
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            <img
              src={selectedImage}
              alt="preview"
              style={{width: '30%', border: '1px solid black'}}
            />
          </Grid>
          <Grid item container direction="column" xs={12} md={8} lg={6}>
            <TextValidator
              onChange={handleInputChange}
              type="text"
              name="title"
              fullWidth
              margin="normal"
              label="Restaurant's Name"
              validators={reviewValidators.title}
              errorMessages={reviewForm.title}
              value={inputs.title}
            />
            <TextValidator
              onChange={handleInputChange}
              name="review"
              label="Review"
              fullWidth
              margin="normal"
              validators={reviewValidators.review}
              errorMessages={reviewForm.review}
              multiline
              value={inputs.review}
              minRows={6}
            />
            <TextField
              onChange={handleInputChange}
              name="address"
              label="Restaurant's Address"
              margin="normal"
              multiline
              value={inputs.address}
            />
            <TextField
              onChange={handleInputChange}
              name="city"
              label="Restaurant's City"
              margin="normal"
              multiline
              value={inputs.city}
            />
            <TextField
              onChange={handleInputChange}
              name="website"
              label="Link to Restaurant's Website"
              margin="normal"
              multiline
              value={inputs.website}
            />
            <Typography component="legend">Select rating:</Typography>
            <Rating
              name="rating"
              onChange={(event, value) => {
                setRestaurantRating(value);
              }}
              precision={0.5}
              value={restaurantRating}
            />
            <FormControl sx={{mt: 2, width: 300}}>
              <InputLabel id="demo-multiple-checkbox-label">
                Add Categories
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedTags}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {tagNames.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={selectedTags.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" fullWidth sx={{mt: 3}}>
              Update Review
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
};

Update.propTypes = {};

export default Update;
