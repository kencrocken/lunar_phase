import { useCallback, useEffect, useState } from 'react';
import { FaGithub } from "react-icons/fa";

import { Moon } from './Moon/moon';
import { Starfield } from './Starfield/starfield';
import { Loader } from './Loader/loader';
import type { Moon as MoonAPIData, MoonApi } from './moonApi.types';
import './App.scss';
import { useGeolocation } from './Hooks/useGeolocation';

function App() {
  const [fetchingData, setFetchingData] = useState<boolean>(true);
  const [moonData, setMoonData] = useState<MoonAPIData>();
  const [moonError, setMoonError] = useState<string>();

  const { coords, error: locationError } = useGeolocation();

  /**
   * Fetches moon data from the API based on the provided coordinates.
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
      const result: MoonApi = await response.json();
      setMoonData(result.moon); 
      setFetchingData(false);
    } catch (error: any) {
      console.error(error);
      setMoonError(error.message);
      setFetchingData(false);
    }
  }, [coords]);

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
        { fetchingData && (
          <Loader />
        )}
        {!fetchingData && (
          <>
            {!Boolean(moonError) && moonData && (
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
                  <p>Your current Latitude &amp; Longitude:</p>
                  <p className="position coords">
                      <span className="latitude">{coords.latitude}, </span> {' '}
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
        <div>
          <a href="https://github.com/kencrocken/lunar_phase" className="github-link" aria-label="View source on GitHub">
            <FaGithub />
          </a>
        </div>
      </div>
    </>
  );
}

export default App;

