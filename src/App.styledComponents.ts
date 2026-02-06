import styled, { createGlobalStyle } from 'styled-components';
import { lightenHex } from './Utils/color.utils';

export const gradientBackground = `
  transition: --radial-bkgd-start-color 0.5s ease-in-out, --radial-bkgd-end-color 0.5s ease-in-out;
  background-image: radial-gradient(ellipse at bottom, var(--radial-bkgd-start-color) 0, var(--radial-bkgd-end-color) 100%);
`;

const GlobalStyle = createGlobalStyle`
  @property --radial-bkgd-start-color {
    syntax: '<color>';
    initial-value: #1b2735;
    inherits: false;
  }

  @property --radial-bkgd-end-color {
    syntax: '<color>';
    initial-value: #090a0f;
    inherits: false;
  }

  :root {
    --radial-bkgd-start-color: #1b2735;
    --radial-bkgd-end-color: #090a0f;
  }
  body, #root {
    height: 100vh;
  }

  body {
    ${gradientBackground}
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

const ColorfulLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const gradientText = `  
  background: linear-gradient(white, #38495a);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent; 
`;

const GradiantButton = styled.button`
  ${gradientBackground}
  border: 2px solid #38495a;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
  color: white;
  transition: --radial-bkgd-start-color 0.2s ease-in-out, --radial-bkgd-end-color 0.2s ease-in-out;
  &:hover {
    --radial-bkgd-start-color: ${lightenHex('#1b2735', 8)};
    --radial-bkgd-end-color: ${lightenHex('#090a0f', 8)};
    ${gradientBackground}
  }
`;

const AppTitle = styled.h1`
  ${gradientText}
  letter-spacing: 0.75px;
`;

const MoonPhaseTitle = styled.div`
  ${gradientText}
  font-weight: 300;
  font-size: 1.75rem;
  letter-spacing: 1.1px;
`;

const AppFooter = styled.div`
  margin-top: 20px;
`;

const RepoLink = styled.a`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s;
  &:hover {
    color: white;
  }
`;

export { 
  GlobalStyle, 
  Wrapper, 
  AppTitle, 
  AppFooter,
  MoonPhaseTitle, 
  RepoLink, 
  ColorfulLoaderWrapper, 
  GradiantButton 
}