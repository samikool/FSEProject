import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import DisasterMarker from './disasterMarker';
import PropTypes from 'prop-types';
import { Marker, GoogleMap, LoadScript  } from '@react-google-maps/api';
import PlacesAutoComplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

// const onLoad = marker => {
//   console.log('marker: ', marker);
// };

// const position = {
//   lat:0.955413,
//   lng:0.337844
// };
// const mapContainerStyle = {
//   height: "400px",
//   width: "800px"
// };

// const center = {
//   lat: 0,
//   lng: -180
// };


class SimpleMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      disasterName: "",
      lat: "",
      lng: "",
      center: "",
      zoom: this.props.zoom,
      hover: false,
      currentPosition: false,
      infoBox: false,
      markerList: [],
      disasterList: []
    };
  }

  async getDisasters(){
    let response = await fetch('http://localhost:5000/disasters',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    response = await response.json();
    await this.setState({disasterList: response})
  }

  async createMarkers(){
    let markerList=[]
    for (let i=0; i < this.state.disasterList.length; i++) {
      const disaster = this.state.disasterList[i];
      let marker={};
        marker.id = disaster.disaster_id;
        marker.items_needed = disaster.keywords.items_need;
        marker.type = disaster.keywords.type;
        marker.location = disaster.location;
        marker.name = disaster.name;

        let address = marker.location.city + " " 
          + marker.location.state + " " 
          + marker.location.country;
        
        let resolvedAddress = await geocodeByAddress(address);
        let {lat,lng} = await getLatLng(resolvedAddress[0]);
        console.log(lat,lng)
        marker.lat=lat;
        marker.lng=lng;
        marker.resolvedAddress = resolvedAddress;
        marker.formatted_address = resolvedAddress[0].formatted_address;
        markerList.push(marker)
    }
    await this.setState({markerList: markerList})
  }

  // Store the value of the current disaster?
  // this can possibly handled in the marker class
  

  async componentDidMount(){
    await this.getDisasters();
    await this.createMarkers();
    //this.forceUpdate();
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '93vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_API_KEY
          }}
          defaultCenter={{lat: 20, lng: 0}}
          defaultZoom={1}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
          yesIWantToUseGoogleMapApiInternals
        >
        {this.state.markerList.map((marker)=>{
          return(
          <DisasterMarker 
            lat={marker.lat}
            lng={marker.lng}
            disaster={marker}
          />
          )
        })
        }
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
