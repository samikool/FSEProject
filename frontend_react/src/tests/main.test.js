import React from 'react';
import { render } from '@testing-library/react';
import main from '../main';

test('renders main page', () => {
  const { getByText } = render(<main/>);
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
