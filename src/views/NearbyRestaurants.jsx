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
import React, {useEffect, useState} from 'react';

import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

import HeroImage from '../components/HeroImage';
import {doFetch} from '../hooks/ApiHooks';
import mockYelpData from '../utils/mockData';

const NearbyRestaurants = () => {
  const viewText = 'Nearby Restaurants';
  useScrollToTop();
  usePageTitle(viewText);
  const [businesses, setBusinesses] = useState([]);
  const [location, setLocation] = useState({latitude: null, longitude: null});

  useEffect(() => {
    const fetchData = async () => {
      if (!location.latitude || !location.longitude) return;

      try {
        const proxyUrl = 'http://167.71.51.18:3000/yelp';
        const yelpUrl = `/v3/businesses/search?latitude=${location.latitude}&longitude=${location.longitude}&categories=restaurants&limit=50`;
        const response = await doFetch(proxyUrl + yelpUrl);

        setBusinesses(response.businesses);
      } catch (error) {
        console.error('Error fetching Yelp data:', error);
        // Use mock data when fetch fails
        setBusinesses(mockYelpData[0].businesses);
      }
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    const getGeolocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error getting geolocation:', error);
          },
          {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
        );
      } else {
        console.error('Geolocation not supported by this browser.');
      }
    };

    getGeolocation();
  }, []);

  const placeholderImage = 'https://via.placeholder.com/140'; // Add a placeholder image URL

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
                  image={restaurant.image_url || placeholderImage} // Use a placeholder image if there's no image_url
                  alt={restaurant.name}
                />
                <CardContent sx={{flexGrow: 1}}>
                  <Typography variant="h5" component="div" noWrap>
                    {restaurant.name}
                  </Typography>{' '}
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
