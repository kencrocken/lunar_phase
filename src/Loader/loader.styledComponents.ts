import styled, { css, keyframes } from 'styled-components';

const colors = [
  '#FFE629',
  '#18A6D1',
  '#CCC205',
  '#54D3D3',
  '#9776C1',
  '#ED4545',
  '#FF9100',
  '#65B730',
  '#FF6136',
  '#AD7745',
  '#FF71A0'
];

const generateAnimation = (index: number) => keyframes`
  0% {
    background-color: ${colors[index % colors.length]};
  }
  ${Array.from({ length: 11 }, (_, i) => 
    `${(100/11)*i}% {
      background-color: ${colors[Math.floor(Math.random() * colors.length)]};
    }`
  ).join('')}
  100% {
    background-color: ${colors[Math.floor(Math.random() * colors.length)]};
  }
`;

const Box = styled.div<{index: number}>`
  height: 10px;
  width: 10px;
  float: left;
  animation: ${({ index }) => css`${generateAnimation(index)} 5s linear infinite alternate`};
`;

const ColorWrap = styled.div`
  max-width: 70px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  div:last-child {
    margin-bottom: 25px;
    &:after {
      content: '';
      display: block;
      height: 0;
      clear: both;
    }
  }
`;

export { Box, ColorWrap };