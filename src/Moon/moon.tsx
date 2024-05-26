import { MoonWrapper, OuterMoon, InnerMoon } from './moon.styledComponents';
import type { NavalMoonAPI } from '../navalApi.types';
import { MOON_DEFAULTS } from './moon.constants';

/**
 * Represents the Moon component.
 * Based on https://github.com/codebox/js-planet-phase
 * @param moonData The data object containing information about the moon.
 * @returns The Moon component.
 */
export const Moon = ({ moonData }: { moonData: NavalMoonAPI }) => {
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
        inner: MOON_DEFAULTS.shadowColor,
      };
    } else {
      return {
        illumination: isWaxing ? 1 - percentIlluminated : percentIlluminated - 1,
        outer: MOON_DEFAULTS.shadowColor,
        inner: MOON_DEFAULTS.lightColor,
      };
    }
  };

  /**
   * Calculates the inner diameter and offset of the moon based on the phase illumination.
   * @param phaseIllumination The illumination value of the moon.
   * @returns An object containing the diameter and offset of the inner moon.
   */
  const calcInner = (phaseIllumination: number) => {
    const diameterAdjustment = ((1 - Math.abs(phaseIllumination)) * MOON_DEFAULTS.diameter) / 2 || 0.01; // if phaseIllumination is 0, set to 0.001 to avoid division by 0
    const innerRadius = diameterAdjustment / 2 + (MOON_DEFAULTS.diameter * MOON_DEFAULTS.diameter) / (8 * diameterAdjustment);

    return {
      d: innerRadius * 2,
      o: phaseIllumination > 0 ? MOON_DEFAULTS.diameter / 2 - diameterAdjustment : -2 * innerRadius + MOON_DEFAULTS.diameter / 2 + diameterAdjustment,
    };
  };

  const percentIlluminated = parseInt(moonData.properties.data.fracillum) / 100;
  const phase = setPhase(percentIlluminated, moonData.properties.data.curphase);
  const innerDiameter = calcInner(phase.illumination * 2);
  const blurredDiameter = innerDiameter.d - MOON_DEFAULTS.blur;
  const blurredOffset = innerDiameter.o + MOON_DEFAULTS.blur / 2;
  const innerColor = phase.inner;
  const outerColor = phase.outer;

  return (
    <MoonWrapper>
      <OuterMoon data-testid="outer-box" $outerDiameter={MOON_DEFAULTS.diameter} $outerColor={outerColor}>
        <InnerMoon
          data-testid="inner-box"
          $moonDiameter={MOON_DEFAULTS.diameter}
          $blurredDiameter={blurredDiameter}
          $blurredOffset={blurredOffset}
          $innerColor={innerColor}
          $blurDefault={MOON_DEFAULTS.blur}
          $earthshineDefault={MOON_DEFAULTS.earthshine}
        />
      </OuterMoon>
    </MoonWrapper>
  );
};
