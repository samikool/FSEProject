import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Button from '@material-ui/core/Button';

 
const AnyReactComponent = () => 
<div>
    <Button onClick = {SimpleMap.handleClick} color="inherit">Marker</Button>
</div>;
 
class SimpleMap extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

   handleClick(event){
    console.log('here');
    this.props.history.push('/disaster')
  }
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '93vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAkAmnr11Ra89mVHvrmRHu0WG1GhfKuBlg'}}
          defaultCenter={{lat: 20, lng: 0}}
          defaultZoom={1}
          yesIWantToUseGoogleMapApiInternals
        >    
            <AnyReactComponent
                lat={0.955413}
                lng={0.337844}
            />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;