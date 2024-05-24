import { FaGithub } from "react-icons/fa";

import { Moon } from "./Moon/moon";
import { Starfield } from "./Starfield/starfield";
import { Loader } from "./Loader/loader";
import type { Location } from "./moonApi.types";
import { useGeolocation } from "./Hooks/useGeolocation";
import { useMoonData } from "./Hooks/useMoonData";

import "./App.scss";


const CoordinatesDisplay = ({ coords }: { coords?: Location}) => {
  return (
    <>
      {coords && (
        <div>
          <p>Your current Latitude &amp; Longitude:</p>
          <p className="position coords">
            <span className="latitude">{coords.latitude}, </span>{" "}
            <span className="longitude">{coords.longitude}</span>
          </p>
        </div>
      )}
    </>
  );
}

function App() {
  const currentDate = new Date();
  const { coords, error: locationError } = useGeolocation();
  // 
  const { isFetching, moonData, error: moonError } = useMoonData(currentDate.toISOString().split('T')[0], coords);

  const dateFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions;

  return (
    <>
      <Starfield />
      <div className="App">
        <header className="moon-phase-header">
          <h1 className="has-text-gradient">Tonight&#39;s Lunar Phase</h1> 
        </header>
        {isFetching && <Loader />}
        {!isFetching && (
          <>
            {!Boolean(moonError) && moonData && (
              <>
                <div className="moon-phase-title has-text-gradient">
                  {moonData.properties.data.curphase}
                </div>
                <p className="percentage">
                  Percent Illuminated: {moonData.properties.data.fracillum}
                </p>
                <Moon moonData={moonData} />
              </>
            )}
            {Boolean(moonError) && <p>{moonError}</p>}
            {!Boolean(locationError) && <CoordinatesDisplay coords={coords} />}
            {Boolean(locationError) && (
              <>
                <p>{locationError}</p>
                <p>Using default location, Baltimore, MD.</p>
              </>
            )}
          </>
        )}
        <div>
          <p className="date">{currentDate.toLocaleDateString(undefined, dateFormatOptions)}</p>
          <a
            href="https://github.com/kencrocken/lunar_phase"
            className="github-link"
            aria-label="View source on GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </>
  );
}

export default App;