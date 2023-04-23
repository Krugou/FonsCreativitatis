import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

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
        return 'Pilvistä';
      case 21:
      case 22:
      case 23:
        return 'Sadekuuroja';
      case 31:
      case 32:
      case 33:
        return 'Vesisadetta';
      case 41:
      case 42:
      case 43:
        return 'Lumikuuroja';
      case 51:
      case 52:
      case 53:
        return 'Lumisadetta';
      case 61:
      case 62:
        return 'Ukkoskuuroja';
      default:
        return '';
    }
  };
  if (error) {
    return <p>Failed to fetch weather data: {error}</p>;
  }

  if (temp === null || wind === null || weatherSymbol === null) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className="weather-report">
      {!Number.isNaN(wind) && (
        <p className="wind-info">{wind.toFixed(1)} m/s</p>
      )}
      <p className="temp-info">{temp.toFixed(1)} °C</p>
      <p>{getWeatherDescription(weatherSymbol)}</p>
    </div>
  );
};
WeatherReport.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  hoursFromNow: PropTypes.number.isRequired,
};

export default WeatherReport;
