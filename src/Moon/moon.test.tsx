import { render, screen } from '@testing-library/react';
import { Moon } from './moon';
import { NavalMoonAPI } from '../navalApi.types';

test('renders moon component with correct outer color', () => {
  const moonData = {
    properties: {
      data: {
        fracillum: '50',
        curphase: 'Waxing Crescent'
      }
    }
  };
  render(<Moon moonData={moonData as NavalMoonAPI} />);
  const outerBox = screen.getByTestId('outer-box');
  expect(outerBox).toHaveStyle({ backgroundColor: 'rgb(230, 230, 230)' });
});

test('renders moon component with correct inner color', () => {
  const moonData = {
    properties: {
      data: {
        fracillum: '50',
        curphase: 'Waxing Crescent'
      }
    }
  };
  render(<Moon moonData={moonData as NavalMoonAPI} />);
  const innerBox = screen.getByTestId('inner-box');
  expect(innerBox).toHaveStyle({ backgroundColor: 'rgb(51, 51, 51)' });
});

test('renders moon component with correct diameter', () => {
  const moonData = {
    properties: {
      data: {
        fracillum: '50',
        curphase: 'Waxing Crescent'
      }
    }
  };
  render(<Moon moonData={moonData as NavalMoonAPI} />);
  const outerBox = screen.getByTestId('outer-box');
  expect(outerBox).toHaveStyle({ height: '200px', width: '200px' });
});
