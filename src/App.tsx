import { FaGithub } from 'react-icons/fa';
import { ColorfulLoader } from '@kencrocken/colorful-loader';

import { Moon } from './Moon/moon';
import { Starfield } from './Starfield/starfield';

import { GlobalStyle, Wrapper, AppTitle, AppFooter, MoonPhaseTitle, RepoLink, ColorfulLoaderWrapper, GradiantButton } from './App.styledComponents';

import type { Location } from './Types/moonApi.types';
import { titleCase } from './Utils/string.utils';
import { useGeolocation } from './Hooks/useGeolocation';
import { useMoonData } from './Hooks/useMoonData';
import { useState } from 'react';

const DisplayMoonPhase = ({ phaseName, illumination}: { phaseName: string, illumination: string }) => (
  <>
    <MoonPhaseTitle>{titleCase(phaseName)}</MoonPhaseTitle>
    <Moon phaseName={phaseName} illumination={illumination} />
    <p>Percent Illuminated: {illumination}</p>
  </>
);

const LocationError = ({ locationError }: { locationError: string }) => (
  <>
    <p>{locationError}</p>
    <p>Using default location, Baltimore, MD.</p>
  </>
);

const DisplayCoordinates = ({ coords }: { coords?: Location }) => {
  return (
    <>
      {coords && (
        <div>
          <p>Your current Latitude &amp; Longitude:</p>
          <p>
            <span className="latitude">{coords.latitude}, </span> <span className="longitude">{coords.longitude}</span>
          </p>
        </div>
      )}
    </>
  );
};

const dateFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as Intl.DateTimeFormatOptions;

function App() {
  const currentDate = new Date();
  const [coords, setCoords] = useState<Location>();
  const { triggerGeolocation, isFetching: isFetchingLocation, error: locationError } = useGeolocation();
  const { triggerFetchMoonData, moonData, isFetching: isFetchingMoonData, error: moonError } = useMoonData();

  const handleTriggerGeolocation = async() => {
    try {
      const coords = await triggerGeolocation();
      setCoords(coords);
      triggerFetchMoonData(currentDate.toISOString(), coords);
    } catch (error) {
      console.error(error);
    }
  };
  const isFetching = isFetchingLocation || isFetchingMoonData;
  return (
    <>
      <GlobalStyle />
      <Starfield />
      <Wrapper>
        <header>
          <AppTitle>Tonight&#39;s Lunar Phase</AppTitle>
          <p>{currentDate.toLocaleDateString(undefined, dateFormatOptions)}</p>
        </header>
        {!coords && !isFetching && (
          <GradiantButton onClick={handleTriggerGeolocation}>Get Geolocation</GradiantButton>
        )}
        {!isFetchingLocation && isFetchingMoonData && (
          <p>Fetching moon data...</p>
        )}
        {isFetching && (
          <ColorfulLoaderWrapper>
            <ColorfulLoader />
          </ColorfulLoaderWrapper>
        )}
        {!moonError && moonData && <DisplayMoonPhase phaseName={moonData.moon.phase_name} illumination={moonData.moon.illumination} />}
        {moonError && <p>{moonError}</p>}
        {!locationError && <DisplayCoordinates coords={coords} />}
        {locationError && <LocationError locationError={locationError} />}
        <AppFooter>
          <RepoLink href="https://github.com/kencrocken/lunar_phase" aria-label="View source on GitHub">
            <FaGithub />
          </RepoLink>
        </AppFooter>
      </Wrapper>
    </>
  );
}

export default App;
