import './moon.scss';
import type { NavalMoonAPI } from '../navalApi.types';

const MOON_DEFAULTS = {
  diameter: 200,
  shadowColor: "rgb(230, 230, 230)",
  lightColor: "rgb(51, 51, 51)",
  earthshine: 0.1,
  blur: 3
}

export const Moon = ({ moonData }: {moonData: NavalMoonAPI}) => {
  
  /**
   * Determines the phase of the moon based on the given illumination and current phase.
   * @param percentIlluminated The illumination value of the moon.
   * @param currentPhase The current phase of the moon.
   * @returns An object containing the illumination value, outer color, and inner color of the moon.
   */
  const setPhase = (percentIlluminated: number, currentPhase: string) => {
    const isWaxing = currentPhase.toLowerCase().includes('waxing');
    if (percentIlluminated < 0.5) {
      return {
        illumination: isWaxing ? -percentIlluminated : percentIlluminated,
        outer: MOON_DEFAULTS.lightColor,
        inner:  MOON_DEFAULTS.shadowColor, 
      };
    } else {
      return {
        illumination: isWaxing ? 1 - percentIlluminated :  percentIlluminated - 1,
        outer: MOON_DEFAULTS.shadowColor,
        inner:  MOON_DEFAULTS.lightColor, 
      };
    }
  }

  /**
   * Calculates the inner diameter and offset of the moon based on the phase illumination.
   * @param phaseIllumination The illumination value of the moon.
   * @returns An object containing the diameter and offset of the inner moon.
   */
  const calcInner = (phaseIllumination: number) => {
    const diameterAdjustment = ((1-Math.abs(phaseIllumination)) * MOON_DEFAULTS.diameter/2) || 0.001; // if phaseIllumination is 0, set to 0.001 to avoid division by 0
    const innerRadius = diameterAdjustment/2 + MOON_DEFAULTS.diameter * MOON_DEFAULTS.diameter / (8 * diameterAdjustment);

    return {
      d: innerRadius * 2,
      o: phaseIllumination > 0 ? MOON_DEFAULTS.diameter / 2 - diameterAdjustment : -2 * innerRadius + MOON_DEFAULTS.diameter / 2 + diameterAdjustment
    }
  }

  const percentIlluminated = parseInt(moonData.properties.data.fracillum) / 100;
  const phase = setPhase(percentIlluminated, moonData.properties.data.curphase);
  const innerDiameter = calcInner(phase.illumination * 2);
  const blurredDiameter = innerDiameter.d - MOON_DEFAULTS.blur;
  const blurredOffset = innerDiameter.o + MOON_DEFAULTS.blur / 2;
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
    height: `${ blurredDiameter }px`,
    width: `${ blurredDiameter }px`,
    left: `${ blurredOffset }px`,
    top: `${ ((MOON_DEFAULTS.diameter-blurredDiameter)/2) }px`,
    boxShadow: `0px 0px ${ MOON_DEFAULTS.blur }px ${ MOON_DEFAULTS.blur }px ${ innerColor }`,
    opacity: 1 - MOON_DEFAULTS.earthshine,
  } as React.CSSProperties;

  return (
    <div className="moon-wrapper">
      <div data-testid="outer-box" className="outer" style={outerBoxStyles}>
        <div data-testid="inner-box" className="inner" style={innerBoxStyles}></div>
      </div>
    </div>
  );
}