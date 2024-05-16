import './moon.scss';
import { Moon as MoonAPIData } from '../moonApi.types';

const MOON_DEFAULTS = {
  diameter: 200,
  shadowColor: "#333333",
  lightColor: "#e6e6e6",
  earthshine: 0.1,
  blur: 1
}

export const Moon = ({ moonData }: {moonData: MoonAPIData}) => {
  /**
   * Calculates the phase of the moon based on the provided moon data.
   * @returns An object containing the diameter for the overlay and the color for the outer and.
   */
  const setPhase = () => {
    const percentIlluminated = parseInt(moonData.illumination) / 100
    const isWaxing = moonData.stage === 'waxing';
    if (percentIlluminated < 0.5) {
      return {
        illumination: isWaxing ? percentIlluminated : percentIlluminated * -1,
        outer: MOON_DEFAULTS.lightColor,
        inner:  MOON_DEFAULTS.shadowColor, 
      };
    } else {
      return {
        illumination: isWaxing ? 1 - percentIlluminated : 1 - percentIlluminated * -1,
        outer: MOON_DEFAULTS.shadowColor,
        inner:  MOON_DEFAULTS.lightColor, 
      };
    }
  }

  /**
   * Calculates the inner radius and offset of the moon based on the given illumination.
   * @param illumination The illumination value of the moon.
   * @returns An object containing the inner radius (d) and offset (o) of the moon.
   */
  const calcInner = (illumination: number) => {
    const n = ((1-Math.abs(illumination)) * MOON_DEFAULTS.diameter/2) || 0.01;
    const innerRadius = n/2 + MOON_DEFAULTS.diameter * MOON_DEFAULTS.diameter / (8 * n);

    return {
      d: innerRadius * 2,
      o: illumination > 0 ? (MOON_DEFAULTS.diameter / 2 - n) : -2 * innerRadius + MOON_DEFAULTS.diameter / 2  + n
    }
  }

  const phase = setPhase();
  const innerDiameter = calcInner(phase.illumination * 2);
  const blurredDiameter = innerDiameter.d - MOON_DEFAULTS.blur;
  const blurredOffset = innerDiameter.o - MOON_DEFAULTS.blur / 2;
  const innerColor = phase.inner;
  const outerColor = phase.outer;

  const outerBoxStyles = {
    height: `${MOON_DEFAULTS.diameter}px`,
    width: `${MOON_DEFAULTS.diameter}px`,
    backgroundColor: outerColor,
    borderRadius: `${MOON_DEFAULTS.diameter/2}px`,
  } as React.CSSProperties;

  const innerBoxStyles = {
    backgroundColor: innerColor,
    borderRadius: `${ blurredDiameter/2 }px`,
    height: `${ blurredDiameter * 1 }px`,
    width: `${ blurredDiameter * 1 }px`,
    left: `${ blurredOffset }px`,
    top: `${ ((MOON_DEFAULTS.diameter-blurredDiameter)/2) }px`,
    boxShadow: `0px 0px ${ MOON_DEFAULTS.blur }px ${ MOON_DEFAULTS.blur }px ${ innerColor }`,
    opacity: 1 - MOON_DEFAULTS.earthshine,
  } as React.CSSProperties;

  return (
    <div className="moon-wrapper">
      <div className="outer" style={outerBoxStyles}>
        <div className="inner" style={innerBoxStyles}></div>
      </div>
    </div>
  );
}