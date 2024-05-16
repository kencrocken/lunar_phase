import { useCallback, useEffect, useState } from 'react';
import './App.scss';

import { Moon } from './Moon/moon';
import { Starfield } from './Starfield/starfield';



type Coordinates = {
  latitude: number,
  longitude: number
}

function App() {
  const [coords, setCoords] = useState<Coordinates>({ latitude: 0, longitude: 0 });
  const [fetchingData, setFetchingData] = useState<boolean>(true);
  const [moonData, setMoonData] = useState<any>();
  const [locationError, setLocationError] = useState<string>();
  const [moonError, setMoonError] = useState<string>();

  /**
   * Fetches moon data from the API based on the provided coordinates.
   * @returns {Promise<void>} A promise that resolves when the moon data is fetched.
   */
  const fetchMoonData = useCallback(async () => {
    const url = 'https://moon-phase.p.rapidapi.com/advanced';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_MOON_API_KEY || '',
        'X-RapidAPI-Host': 'moon-phase.p.rapidapi.com'
      },
    };
    try {
      // Default to Baltimore, MD
      const latitude = coords?.latitude ? coords.latitude : "39.0963965";
      const longitude = coords?.longitude ? coords.longitude : "-76.8590672";
      const response = await fetch(`${url}?lat=${latitude}&lon=${longitude}`, options);
      const result = await response.json();
      setMoonData(result.moon);
      setFetchingData(false);
    } catch (error: any) {
      console.error(error);
      setMoonError(error.message);
      setFetchingData(false);
    }
  }, [coords]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy : true,
        timeout            : 10000,
        maximumAge         : 0
      };
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      }, (error) => {
        setLocationError(error.message);
      }, options );
    } else {
      console.warn('not available');
      setLocationError('Geolocation not available.');
    }
  }, []);

  useEffect(() => {
    if (coords.latitude !== 0 && coords.longitude !== 0) {
      fetchMoonData();
    }
  }, [coords, fetchMoonData]);
  
  return (
    <>
      <Starfield />
      <div className="App">
        <header className="moon-phase-header">
          <h1 className="has-text-gradient">Tonight&#39;s Lunar Phase</h1>
        </header>
        {!fetchingData &&(
          <>
            {!Boolean(moonError) && (
              <>
                <div className="moon-phase-title has-text-gradient">
                  {moonData.phase_name}
                </div>
                <p className="percentage">Percent Illuminated: {moonData.illumination}</p>
                <Moon moonData={moonData} />
              </>
            )}
            {Boolean(moonError) && (
              <p>{moonError}</p>
            )}
            {!Boolean(locationError) && (
              <div>
                  <p>Your current position:</p>
                  <p className="position coords">
                      <span className="latitude"> {coords.latitude}, </span>
                      <span className="longitude">{coords.longitude}</span>
                  </p>
              </div>
            )}
            {Boolean(locationError) && (
              <>
                <p>{locationError}</p>
                <p>Using default location, Baltimore, MD.</p>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;

