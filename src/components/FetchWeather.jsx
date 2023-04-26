import React, {useEffect, useState} from 'react';
import WeatherReport from './WeatherReport';

const FetchWeather = () => {
  const [coords, setCoords] = useState(null);

  const isLocationInFinland = async (latitude, longitude) => {
    const apiKey = 'dcdafb5b5bea4f45a504f9be63ebf2a1';
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const country = data.results[0].components.country;
      return country === 'Finland';
    } catch (error) {
      console.error('Error fetching location information:', error);
      return false;
    }
  };

  useEffect(() => {
    const setDefaultCoords = () => {
      setCoords({lat: 60.2052, lon: 24.6564}); // Default coordinates for Espoo
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const {latitude, longitude} = position.coords;
        if (await isLocationInFinland(latitude, longitude)) {
          setCoords({lat: latitude, lon: longitude});
        } else {
          setDefaultCoords();
        }
      },
      (error) => {
        console.error(error);
        setDefaultCoords();
      }
    );
  }, []);

  return (
    <div>
      {coords ? (
        <WeatherReport lat={coords.lat} lon={coords.lon} hoursFromNow={1} />
      ) : (
        <p>Getting your location...</p>
      )}
    </div>
  );
};

export default FetchWeather;
