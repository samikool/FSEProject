import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../main';


it('renders main page without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Main/>, div)
});
