import React, {useEffect, useState} from 'react';
import WeatherReport from './WeatherReport';

function FetchWeather() {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setCoords({lat: latitude, lon: longitude});
      },
      (error) => {
        console.error(error);
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
}

export default FetchWeather;
