// TODO: learn how to use linting and configure it

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap} from 'react-google-maps';

class GoogleMaps extends Component {
  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        // Iowa City
        defaultCenter={{
          lat: 41.6611111,
          lng: -91.53
        }}
        defaultZoom={12}
      >
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{
            height: `500px`,
            width: '500px'
          }}/>}
          mapElement={<div style={{ height: `100%` }}/>}
        />
      </div>
    );
  }
}

export default GoogleMaps;
