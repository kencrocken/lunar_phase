import { render, screen } from '@testing-library/react';
import { Moon } from './moon';
import { NavalMoonAPI } from '../Types/navalApi.types';
import { MOON_DEFAULTS } from './moon.constants';

describe('Moon Component with less than 50% illumination', () => {
  const moonData49Illumination = {
    properties: {
      data: {
        fracillum: '49',
        curphase: 'Waxing Crescent',
      },
    },
  };

  test('renders moon component with correct outer color', () => {
    render(<Moon moonData={moonData49Illumination as NavalMoonAPI} />);
    const outerBox = screen.getByTestId('outer-box');
    expect(outerBox).toHaveStyle({ backgroundColor: MOON_DEFAULTS.lightColor });
  });

  test('renders moon component with correct inner color', () => {
    render(<Moon moonData={moonData49Illumination as NavalMoonAPI} />);
    const innerBox = screen.getByTestId('inner-box');
    expect(innerBox).toHaveStyle({ backgroundColor: MOON_DEFAULTS.shadowColor });
  });
});

describe('Moon Component with greater than 50% illumination', () => {
  const moonData51Illumination = {
    properties: {
      data: {
        fracillum: '51',
        curphase: 'Waxing Crescent',
      },
    },
  };

  test('renders moon component with correct outer color', () => {
    render(<Moon moonData={moonData51Illumination as NavalMoonAPI} />);
    const outerBox = screen.getByTestId('outer-box');
    expect(outerBox).toHaveStyle({ backgroundColor: MOON_DEFAULTS.shadowColor });
  });

  test('renders moon component with correct inner color', () => {
    render(<Moon moonData={moonData51Illumination as NavalMoonAPI} />);
    const innerBox = screen.getByTestId('inner-box');
    expect(innerBox).toHaveStyle({ backgroundColor: MOON_DEFAULTS.lightColor });
  });
});

test('renders moon component with correct diameter', () => {
  const moonData = {
    properties: {
      data: {
        fracillum: '50',
        curphase: 'Waxing Crescent',
      },
    },
  };
  render(<Moon moonData={moonData as NavalMoonAPI} />);
  const outerBox = screen.getByTestId('outer-box');
  expect(outerBox).toHaveStyle({ height: '200px', width: '200px' });
});
