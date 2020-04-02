import React, { Component } from 'react';
import Button from '@material-ui/core/Button'

export default class DisasterMarker extends React.Component{
  constructor(props){
    super(props);
  }

  async handleClick(){
    console.log('here');
  }

  render(){
    return(
      <div>
        <Button onClick = {this.handleClick} color="inherit">
          Marker
        </Button>
      </div>
    );
  }
}
