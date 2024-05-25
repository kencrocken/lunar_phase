import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders lunar phase', () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn()
      .mockImplementationOnce((success) => Promise.resolve(success({
        coords: {
          latitude: 51.1,
          longitude: 45.3
        }
      })))
  };

  Object.defineProperty(global.navigator, 'geolocation', {
    writable: true,
    value: mockGeolocation
  });

  render(<App />);
  const title = screen.getByText(/tonight's lunar phase/i);
  expect(title).toBeInTheDocument();
});
