import React, { Component } from 'react';
import GoogleMaps from './componets/GoogleMaps';
import Clock from './Clock';
import Login from './Login';


class App extends Component {
  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div className="App">
        <h4>Welcome</h4>
        <GoogleMaps/>
        <Clock />
        <Login />
      </div>,
      document.getElementById('root')
    );
  }
}

export default App;
