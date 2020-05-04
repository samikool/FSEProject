import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import Main from '../main';


it('renders main page without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Main/>, div)
});
