import styled, { css, keyframes } from 'styled-components';

//  Stars based on https://codepen.io/saransh/pen/BKJun/

const generateBoxShadow = (n: number) => {
  let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  for (let i = 2; i <= n; i++) {
  value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  }
  return value;
};

const starAnimation = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
`;

const Stars = styled.div<{size: number, shadowCount: number}>`
  background: transparent;
  &:after {
    content: " ";
    position: absolute;
    background: transparent;
  }
  ${({ size, shadowCount }: {size: number, shadowCount: number}) => css`
    width: ${size}px;
    height: ${size}px;
    box-shadow: ${generateBoxShadow(shadowCount)};
    animation: ${starAnimation} ${size * 50}s linear infinite;
    &:after {
      postion: absolute;
      top: 2000px;
      width: ${size}px;
      height: ${size}px;
      box-shadow: ${generateBoxShadow(shadowCount)};
    }
  `}
`;

export { Stars };
