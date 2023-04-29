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

const NearbyRestaurants = () => {
  const viewText = 'Nearby Restaurants';

  useScrollToTop();
  usePageTitle(viewText);
  const [businesses, setBusinesses] = useState([]);
  const [location, setLocation] = useState({latitude: null, longitude: null});

  useEffect(() => {
    const [fakeRestaurantAdded, setFakeRestaurantAdded] = useState(false);

    const fetchData = async () => {
      if (!location.latitude || !location.longitude) return;

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
      } catch (error) {
        console.error('Error fetching Yelp data:', error);
        // Use mock data when fetch fails
        setBusinesses(mockYelpData[0].businesses);
      }
    };

    useEffect(() => {
      if (!fakeRestaurantAdded) {
        const fakeRestaurant = {
          id: 'fake-restaurant',
          name: 'API Activation Required',
          image_url: '',
          categories: [],
          rating: 0,
          price: '',
          location: {
            display_address: [],
          },
          display_phone: '',
          website: 'https://167.71.51.18:3000/',
          description:
            'To enable the live Yelp data, please visit the provided website link. Once you have done so, refresh the page to see updated restaurant listings.',
        };

        // Add fake restaurant only once
        if (
          !mockYelpData[0].businesses.some(
            (business) => business.id === fakeRestaurant.id
          )
        ) {
          mockYelpData[0].businesses.unshift(fakeRestaurant);
          setFakeRestaurantAdded(true);
        }
      }
    }, [fakeRestaurantAdded]);

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
