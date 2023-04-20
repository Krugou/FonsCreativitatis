import {Box, Typography} from '@mui/material';
import React from 'react';
import MediaTable from '../components/Mediatable';
const imageUrls = [
  'krugou_fine_dining_table_view_d174b4ee-4faa-4d95-9d7e-b200757cded3.png',
  'krugou_finnish_pizza_place_filled_with_happy_people_0a69e28f-7135-4d33-b2d3-56bdbfd0ecb4.png',
  'krugou_finnish_pizza_place_filled_with_happy_people_6fd39d60-7066-490b-b87b-aecc7283801c.png',
  'krugou_finnish_pizza_place_filled_with_happy_people_17b54793-ad14-42a1-9bbf-95f36e386824.png',
  'krugou_restaurant_table_with_delicious_salad_mix_on_place_356c12f5-dd0d-40c3-8fee-d37ca27d021f (1).png',
];

const Search = () => {
  const randomImageUrl =
    imageUrls[Math.floor(Math.random() * imageUrls.length)];
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url('./heroimages/${randomImageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 400,
          padding: '100px 0',
          display: {xs: 'none', md: 'block'},
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h2" sx={{color: 'white'}}>
            Search
          </Typography>
        </Box>
      </Box>
      <Typography
        component="h1"
        variant="h2"
        sx={{display: {xs: 'block', md: 'none'}}}
      >
        Search
      </Typography>
      <MediaTable />
    </>
  );
};

export default Search;
