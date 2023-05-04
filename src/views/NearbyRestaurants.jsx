import {
  Box,
  Button,
  Card,
  CardActions,
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

const placeholderImage = 'https://via.placeholder.com/140'; // Add a placeholder image URL

const NearbyRestaurants = () => {
  const viewText = 'Nearby Restaurants';

  useScrollToTop();
  usePageTitle(viewText);
  const [businesses, setBusinesses] = useState([]);
  const [location, setLocation] = useState({latitude: null, longitude: null});
  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data...');

      if (!location.latitude || !location.longitude) {
        console.log('Location not available');
        return;
      }

      try {
        const proxyUrl = 'https://167.71.51.18:3000/yelp';
        const yelpApiPath = '/v3/businesses/search';
        const queryParams = new URLSearchParams({
          latitude: location.latitude,
          longitude: location.longitude,
          categories: 'restaurants',
          limit: 50,
        });

        const fullUrl = `${proxyUrl}${yelpApiPath}?${queryParams.toString()}`;
        const response = await doFetch(fullUrl);

        setBusinesses(response.businesses);
        console.log('Fetched data successfully:', response.businesses);
      } catch (error) {
        console.error('Error fetching Yelp data:', error);
        // Use mock data when fetch fails
        setBusinesses(mockYelpData[0].businesses);
        console.log('Using mock data:', mockYelpData[0].businesses);
      }
    };

    if (location.latitude && location.longitude) {
      fetchData();
    }
  }, [location]);

  useEffect(() => {
    const getGeolocation = () => {
      console.log('Getting geolocation...');

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            console.log('Geolocation obtained:', position.coords);
          },
          (error) => {
            console.error('Error getting geolocation:', error);
            // Fallback to a default location if geolocation fails
            const defaultLocation = {latitude: 60.2052, longitude: 24.6564};
            setLocation(defaultLocation);
          },
          {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
        );
      } else {
        console.error('Geolocation not supported by this browser.');
        // Fallback to a default location if geolocation is not supported
        const defaultLocation = {latitude: 60.2052, longitude: 24.6564};
        setLocation(defaultLocation);
      }
    };

    getGeolocation();
  }, []);

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
                  {restaurant.description && (
                    <Typography variant="body2" color="text.secondary">
                      {restaurant.description}
                    </Typography>
                  )}
                </CardContent>
                {restaurant.website && (
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      href={restaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default NearbyRestaurants;
