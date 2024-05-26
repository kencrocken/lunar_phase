import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, #root {
    height: 100vh;
  }

  body {
    background: radial-gradient(ellipse at bottom, #1b2735 0, #090a0f 100%);
    overflow: hidden;
    font-family: 'Lato', sans-serif;
    color: white;
    text-align: center;
    padding: 0;
    margin: 0;
  }

  #root {
    position: relative;
    margin: 0 auto;
    max-width: 1300px;
    overflow: hidden;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
`;

const gradient = `  
  background: -webkit-linear-gradient(white, #38495a);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent; 
`;

const AppTitle = styled.h1`
  ${gradient}
  letter-spacing: 0.75px;
`;

const MoonPhaseTitle = styled.div`
  ${gradient}
  font-weight: 300;
  font-size: 1.5rem;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px #38495a;
`;

const RepoLink = styled.a`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s;
  &:hover {
    color: white;
  }
`;
export { GlobalStyle, Wrapper, AppTitle, MoonPhaseTitle, RepoLink }