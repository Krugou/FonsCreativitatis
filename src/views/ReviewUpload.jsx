import {
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
import React, {useState} from 'react';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {useNavigate} from 'react-router-dom';
import useForm from '../hooks/FormHooks';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

import ErrorAlert from '../components/ErrorAlert';
import HeroImage from '../components/HeroImage';
import {useMedia, useTags} from '../hooks/apiHooks';
import {reviewForm} from '../utils/errorMessages';
import {reviewValidators} from '../utils/validators';
import {appId} from '../utils/variables';
const ReviewUpload = (props) => {
  const viewText = 'Review Upload';
  useScrollToTop();
  usePageTitle(viewText);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [restaurantRating, setRestaurantRating] = useState(null);
  const [selectedImage, setSelectedImage] = useState('./valtteri.png');
  const [selectedTags, setSelectedTags] = useState([]);
  const [alert, setAlert] = useState('');
  // https://placehold.co/600x400?text=Choose+Media
  const {postMedia} = useMedia();
  const {postTag} = useTags();
  const initValues = {
    title: '',
    review: '',
    website: '',
    address: '',
    city: '',
  };
  /*
  const filterInitValues = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
  };
*/
  const doUpload = async () => {
    try {
      const data = new FormData();
      data.append('title', inputs.title);
      const mediaData = {
        review: inputs.review,
        stars: restaurantRating,
        website: inputs.website,
        address: inputs.address,
        city: inputs.city,
        tags: [...selectedTags],
        // filters: filterInputs,
      };
      data.append('description', JSON.stringify(mediaData));
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
      // Upload selected tags
      selectedTags.forEach(async (selectedTag) => {
        const uploadSelectedTagsResult = await postTag(
          {
            file_id: uploadResult.file_id,
            tag: selectedTag,
          },
          userToken
        );
        // console.log(uploadSelectedTagsResult);
      });

      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      setAlert(error.message);
    }
  };

  const handleFileChange = (event) => {
    event.persist();
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setSelectedImage(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doUpload,
    initValues
  );

  /*
  const {inputs: filterInputs, handleInputChange: handleFilterChange} = useForm(
    null,
    filterInitValues
  );
  */

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

  const handleChange = (event) => {
    const {
      target: {value},
    } = event;
    setSelectedTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <>
      {alert && <ErrorAlert onClose={() => setAlert('')} alert={alert} />}
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
            <Button
              variant="outlined"
              component="label"
              sx={{ml: 2, height: 'fit-content'}}
            >
              Upload Image
              <input
                onChange={handleFileChange}
                type="file"
                name="file"
                accept="image/*"
                hidden
              />
            </Button>
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
              Add Review
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
};

ReviewUpload.propTypes = {};

export default ReviewUpload;
