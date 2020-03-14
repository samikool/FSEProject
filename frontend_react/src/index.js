// eslint-disable-next-line max-classes-per-file
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Clock from './Clock';
import Login from './Login';
import GoogleMaps from './componets/GoogleMaps';

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <div style={{ padding: 10 }}>
    <h4>Welcome</h4>
    <GoogleMaps/>
    <Clock />
    <Login />
  </div>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
