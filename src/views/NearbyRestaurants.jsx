import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React, {useState} from 'react';

import usePageTitle from '../hooks/usePageTitle';
import mockYelpData from '../utils/mockData';
const NearbyRestaurants = () => {
  usePageTitle('Nearby Restaurants');
  const {businesses} = mockYelpData[0];

  return (
    <Container>
      <Grid container spacing={4}>
        {businesses.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={restaurant.image_url}
                alt={restaurant.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {restaurant.name}
                </Typography>
                <Box mt={1}>
                  {restaurant.categories.map((category) => (
                    <Chip
                      key={category.alias}
                      label={category.title}
                      variant="outlined"
                      size="small"
                      style={{marginRight: '5px', marginBottom: '5px'}}
                    />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Rating: {restaurant.rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {restaurant.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {restaurant.location.display_address.join(', ')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {restaurant.display_phone}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NearbyRestaurants;
