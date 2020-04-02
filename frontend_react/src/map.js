import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import DisasterMarker from './disasterMarker';
import PropTypes from 'prop-types';
import { Marker, GoogleMap, LoadScript  } from '@react-google-maps/api';

const onLoad = marker => {
  console.log('marker: ', marker);
}

const position = {
  lat:0.955413,
  lng:0.337844
}
const mapContainerStyle = {
  height: "400px",
  width: "800px"
}

const center = {
  lat: 0,
  lng: -180
}


class SimpleMap extends Component {
  constructor(props){
    super(props);
    console.log(process.env)
  }

  // Store the value of the current disaster?
  // this can possibly handled in the marker class
  state = {
    disasterName: "",
    lat: "",
    lng: "",
    center: "",
    zoom: this.props.zoom,
    hover: false,
    currentPosition: false,
    infoBox: false
  }

  static defaultProps = {
    center: {lat: 40.73, lng: -73.93}, 
    zoom: 12
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '93vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_API_KEY}}
          defaultCenter={{lat: 20, lng: 0}}
          defaultZoom={1}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
          yesIWantToUseGoogleMapApiInternals
        >
        <DisasterMarker
            lat={0.955413}
            lng={0.337844}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
