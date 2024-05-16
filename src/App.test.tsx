import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders lunar phase', () => {
  render(<App />);
  const title = screen.getByText(/tonight's lunar phase/i);
  expect(title).toBeInTheDocument();
});
