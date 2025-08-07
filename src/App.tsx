import { FaGithub } from 'react-icons/fa';
import { ColorfulLoader } from '@kencrocken/colorful-loader';

import { Moon } from './Moon/moon';
import { Starfield } from './Starfield/starfield';

import { GlobalStyle, Wrapper, AppTitle, MoonPhaseTitle, RepoLink, ColorfulLoaderWrapper } from './App.styledComponents';

import type { Location, MoonApi } from './Types/moonApi.types';

import { useGeolocation } from './Hooks/useGeolocation';
import { useMoonData } from './Hooks/useMoonData';

const DisplayMoonPhase = ({ moonData }: { moonData: MoonApi }) => (
  <>
    <MoonPhaseTitle>{moonData.moon.major_phase}</MoonPhaseTitle>
    <p>Percent Illuminated: {moonData.moon.detailed.illumination_details.percentage}</p>
    <Moon moonData={moonData} />
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

const Footer = ({ currentDate }: { currentDate: Date }) => {
  const dateFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions;

  return (
    <div>
      <p>{currentDate.toLocaleDateString(undefined, dateFormatOptions)}</p>
      <RepoLink href="https://github.com/kencrocken/lunar_phase" aria-label="View source on GitHub">
        <FaGithub />
      </RepoLink>
    </div>
  );
};

function App() {
  const currentDate = new Date();
  const { coords, error: locationError } = useGeolocation();
  const { isFetching, moonData, error: moonError } = useMoonData(currentDate.toISOString().split('T')[0], coords);

  return (
    <>
      <GlobalStyle />
      <Starfield />
      <Wrapper>
        <header>
          <AppTitle>Tonight&#39;s Lunar Phase</AppTitle>
        </header>
        {isFetching ? (
          <ColorfulLoaderWrapper>
            <ColorfulLoader />
          </ColorfulLoaderWrapper>
        ) : (
          <>
            {!moonError && moonData && <DisplayMoonPhase moonData={moonData} />}
            {moonError && <p>{moonError}</p>}
            {!locationError && <DisplayCoordinates coords={coords} />}
            {locationError && <LocationError locationError={locationError} />}
          </>
        )}
        <Footer currentDate={currentDate} />
      </Wrapper>
    </>
  );
}

export default App;
