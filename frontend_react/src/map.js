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
    this.getDisasters = this.getDisasters.bind(this);
    this.getItemsList = this.getItemsList.bind(this);
    this.createMarkers = this.createMarkers.bind(this);
    this.setState = this.setState.bind(this);
  }

  async getDisasters(){
    let response = await fetch('http://localhost:5000/disaster',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    response = await response.json();
    await this.setState({disasterList: response});
  }

  async getItemsList(){
    let response = await fetch('http://localhost:5000/disasterItems',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    response = await response.json();
    //console.log(response)
    await this.setState({itemsList: response});
    //console.log(response)
  }

  async createMarkers(){
    let markerList=[]
    for (let i=0; i < this.state.disasterList.length; i++) {
      const disaster = this.state.disasterList[i];
      let marker={};
        marker.id = disaster.disaster_id;
        //get items from itemList
        marker.items_needed = this.state.itemsList[disaster.disaster_id];


        marker.type = disaster.keywords.type;
        marker.location = disaster.location;
        marker.name = disaster.name;

        let address = marker.location.city + " " 
          + marker.location.state + " " 
          + marker.location.country;
        
        let resolvedAddress = await geocodeByAddress(address);
        let {lat,lng} = await getLatLng(resolvedAddress[0]);
        //console.log(lat,lng)
        marker.lat=lat;
        marker.lng=lng;
        marker.resolvedAddress = resolvedAddress;
        marker.formatted_address = resolvedAddress[0].formatted_address;
        markerList.push(marker)
    }
    await this.setState({markerList: markerList})
  }

  async updateData(){
    await this.getDisasters();
    await this.getItemsList();
    await this.createMarkers();
    //console.log('updating disasters')
  }


  // Store the value of the current disaster?
  // this can possibly handled in the marker class
  

  async componentWillMount(){
    await this.updateData();
    this.updateDataInterval = setInterval(() => this.updateData(), 5000)
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
            items={marker.items_needed}
            isLoggedIn={this.props.isLoggedIn} 
            isAdmin = {this.props.isAdmin} 
            isDonor = {this.props.isDonor}
            isRequester = {this.props.isRequester}
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
