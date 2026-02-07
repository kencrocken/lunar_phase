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

import type { UpcomingPhases } from './Types/moonApi.types';
import { NextPhasesWrapper, PhaseItem, PhaseName, PhaseDate } from './App.styledComponents';

const DisplayMoonPhase = ({ phaseName, illumination, upcomingPhases }: { phaseName: string, illumination: string, upcomingPhases: UpcomingPhases }) => {
  const phasesList = [
    { name: 'New Moon', ...upcomingPhases.new_moon.next },
    { name: 'First Quarter', ...upcomingPhases.first_quarter.next },
    { name: 'Full Moon', ...upcomingPhases.full_moon.next },
    { name: 'Last Quarter', ...upcomingPhases.last_quarter.next },
  ].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className="moon-phase-container">
      <div className="moon-phase-current">
        <MoonPhaseTitle>{titleCase(phaseName)}</MoonPhaseTitle>
        <Moon phaseName={phaseName} illumination={illumination} />
        <p>Percent Illuminated: {illumination}</p>
      </div>
      <NextPhasesWrapper>
        {phasesList.map((phase) => (
          <PhaseItem key={phase.name}>
            <PhaseName>{phase.name}</PhaseName>
            <PhaseDate>{new Date(phase.datestamp).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric'
            })}</PhaseDate>
            <PhaseDate>{new Date(phase.datestamp).toLocaleTimeString(undefined, {
              hour: 'numeric',
              minute: '2-digit'
            })}</PhaseDate>
          </PhaseItem>
        ))}
      </NextPhasesWrapper>
    </div>
  );
};

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
        <span>
          <span style={{ display: 'inline-block', padding: '0 10px' }}>
            ·</span> Lat: {coords.latitude}, Long: {coords.longitude}
        </span>
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
        
        {!moonError && moonData && <DisplayMoonPhase phaseName={moonData.moon.phase_name} illumination={moonData.moon.illumination} upcomingPhases={moonData.moon.detailed.upcoming_phases} />}
        <p>{currentDate.toLocaleDateString(undefined, dateFormatOptions)}
            {!locationError && coords && <DisplayCoordinates coords={coords} />}
          </p>
        {moonError && <p>{moonError}</p>}
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
