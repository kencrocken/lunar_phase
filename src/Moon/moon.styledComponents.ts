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
  height: ${(props) => props.$outerDiameter}px;
  width: ${(props) => props.$outerDiameter}px;
  background-color: ${(props) => props.$outerColor};
  border-radius: ${(props) => props.$outerDiameter/2}px;
`;

const InnerMoon = styled.div<{ 
  $moonDiameter: number,
  $innerDiameter: number,
  $blurredDiameter: number,
  $blurredOffset: number,
  $innerColor: string,
  $blurDefault: number
  $earthshineDefault: number
}>`
  position: absolute;
  background-color: ${(props) =>props.$innerColor};
  border-radius: ${(props) => props.$blurredDiameter/2}px;
  height: ${(props) => props.$blurredDiameter}px;
  width: ${(props) =>  props.$blurredDiameter}px;
  left: ${(props) =>  props.$blurredOffset}px;
  top: ${(props) => (props.$moonDiameter-props.$blurredDiameter)/2}px;
  box-shadow: 0px 0px ${({$blurDefault}) => $blurDefault }px ${({$blurDefault}) => $blurDefault }px ${({$innerColor}) => $innerColor };
  opacity: ${(props) => 1 - props.$earthshineDefault};
`;

export { MoonWrapper, OuterMoon, InnerMoon };