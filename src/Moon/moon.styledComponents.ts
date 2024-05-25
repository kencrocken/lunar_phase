import styled from 'styled-components';

const MoonWrapper = styled.div`
  position: relative;
  min-height: 225px;
`;

const OuterMoon = styled.div<{ $outerDiameter: number, $outerColor: string }>`
  position: absolute;
  left: 50%;
  border: 1px solid black;
  z-index: 1000;
  overflow: hidden;
  transform: translateX(-50%);
  ${({ $outerDiameter, $outerColor }) => `
    height: ${$outerDiameter}px;
    width: ${$outerDiameter}px;
    background-color: ${$outerColor};
    border-radius: ${$outerDiameter/2}px;
  `}
`;

const InnerMoon = styled.div<{ 
  $moonDiameter: number,
  $blurredDiameter: number,
  $blurredOffset: number,
  $innerColor: string,
  $blurDefault: number
  $earthshineDefault: number
}>`
  position: absolute;
  ${({ $moonDiameter, $blurredDiameter, $blurredOffset, $innerColor, $blurDefault, $earthshineDefault }) => `
    background-color: ${$innerColor};
    border-radius: ${$blurredDiameter/2}px;
    height: ${$blurredDiameter}px;
    width: ${$blurredDiameter}px;
    left: ${$blurredOffset}px;
    top: ${($moonDiameter-$blurredDiameter)/2}px;
    box-shadow: 0px 0px ${$blurDefault}px ${$blurDefault}px ${$innerColor};
    opacity: ${1 - $earthshineDefault};
  `}
`;

export { MoonWrapper, OuterMoon, InnerMoon };