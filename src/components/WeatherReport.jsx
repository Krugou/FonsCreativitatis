import {Box, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import CheckRestaurantsPrompt from './CheckRestaurantsPrompt';
const WeatherReport = ({lat, lon, hoursFromNow}) => {
  const [temp, setTemp] = useState(null);
  const [wind, setWind] = useState(null);
  const [weatherSymbol, setWeatherSymbol] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const url = `https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::harmonie::surface::point::simple&latlon=${lat},${lon}&parameters=temperature,windSpeedMS,WeatherSymbol3`;

      try {
        const response = await fetch(url);
        const xml = await response.text();
        const parser = new DOMParser();
        const xmlDOM = parser.parseFromString(xml, 'application/xml');
        const tempTarget = '[*|id="BsWfsElement.1.' + hoursFromNow + '.1"]';
        const windTarget = '[*|id="BsWfsElement.1.' + hoursFromNow + '.2"]';
        const weatherSymbolTarget =
          '[*|id="BsWfsElement.1.' + hoursFromNow + '.3"]';
        const tempValue = parseFloat(
          xmlDOM.querySelector(tempTarget)?.querySelector('ParameterValue')
            ?.textContent
        );
        const windValue = parseFloat(
          xmlDOM.querySelector(windTarget)?.querySelector('ParameterValue')
            ?.textContent
        );
        const weatherSymbolValue = parseFloat(
          xmlDOM
            .querySelector(weatherSymbolTarget)
            ?.querySelector('ParameterValue')?.textContent
        );

        if (!isNaN(tempValue)) {
          setTemp(tempValue);
        }
        if (!isNaN(windValue)) {
          setWind(windValue);
        }
        if (!isNaN(weatherSymbolValue)) {
          setWeatherSymbol(weatherSymbolValue);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeather();
  }, [lat, lon, hoursFromNow]);
  const getWeatherDescription = (weatherSymbol) => {
    switch (weatherSymbol) {
      case 1:
      case 2:
      case 3:
        return './logos/weather/cloud.png';
      case 21:
      case 22:
      case 23:
        return './logos/weather/rainy.png';
      case 31:
      case 32:
      case 33:
        return './logos/weather/rainy.png';
      case 41:
      case 42:
      case 43:
        return './logos/weather/snow.png';
      case 51:
      case 52:
      case 53:
        return './logos/weather/snow.png';
      case 61:
      case 62:
        return './logos/weather/thunder.png';
      default:
        return '';
    }
  };

  if (error) {
    return (
      <Typography variant="body1">
        Failed to fetch weather data: {error}
      </Typography>
    );
  }

  if (temp === null || wind === null || weatherSymbol === null) {
    return <Typography variant="body1">Loading weather data...</Typography>;
  }

  return (
    <Box
      sx={{
        padding: '0.5rem',
        display: 'flex',
        flexDirection: {xs: 'column', sm: 'column', md: 'row'},
        backgroundColor: 'primary.main',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {!Number.isNaN(wind) && (
        <Typography
          variant="body1"
          className="wind-info"
          sx={{
            m: {xs: '0rem', sm: '0rem', md: '0.5rem'},
            textAlign: {xs: 'center', sm: 'center', md: 'left'},
          }}
        >
          {wind.toFixed(1)} m/s
        </Typography>
      )}
      <Typography
        variant="body1"
        className="temp-info"
        sx={{
          m: {xs: '0rem', sm: '0rem', md: '0.5rem'},
          textAlign: {xs: 'center', sm: 'center', md: 'left'},
        }}
      >
        {temp.toFixed(1)} °C
      </Typography>
      <Box
        sx={{
          width: {xs: '3rem', sm: '4rem', md: '5rem'},
          height: {xs: '3rem', sm: '4rem', md: '5rem'},
          alignSelf: 'center',
          m: {xs: '0.5rem', sm: '0.5rem', md: '0.5rem'},
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={getWeatherDescription(weatherSymbol)}
          alt="Weather Icon"
          style={{maxWidth: '100%', maxHeight: '100%'}}
        />
      </Box>
      <CheckRestaurantsPrompt />
    </Box>
  );
};
WeatherReport.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  hoursFromNow: PropTypes.number.isRequired,
};

export default WeatherReport;
