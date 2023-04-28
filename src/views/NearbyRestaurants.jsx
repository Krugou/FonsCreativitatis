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

import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

import HeroImage from '../components/HeroImage';
import mockYelpData from '../utils/mockData';

const NearbyRestaurants = () => {
  const viewText = 'Nearby Restaurants';
  useScrollToTop();
  usePageTitle(viewText);
  const {businesses} = mockYelpData[0];

  return (
    <>
      <HeroImage heroText={viewText} />
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{marginTop: '2em'}}>
          {businesses.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
              <Card
                sx={{
                  minHeight: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={restaurant.image_url}
                  alt={restaurant.name}
                />
                <CardContent sx={{flexGrow: 1}}>
                  <Typography variant="h5" component="div" noWrap>
                    {restaurant.name}
                  </Typography>
                  <Box mt={1} sx={{minHeight: '3em'}}>
                    {restaurant.categories.map((category) => (
                      <Chip
                        key={category.alias}
                        label={category.title}
                        variant="outlined"
                        size="small"
                        sx={{marginRight: '5px', marginBottom: '5px'}}
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
    </>
  );
};

export default NearbyRestaurants;
