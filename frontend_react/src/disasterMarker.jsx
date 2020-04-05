//resources: https://react.semantic-ui.com/modules/modal
import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { Button, Header, Image, Icon, Modal } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'
import 'semantic-ui-css/semantic.min.css';


const pinStyle={
  borderRadius: '10px',
  transform: 'matrix(-1, 0, 0, 1, 10, 0)'
};


export default class DisasterMarker extends Component{
  constructor(props){
    super(props);
    this.state = {
      "isShown": false,
      "setIsShown":false
    };
  }

  async onLoad(){
    console.log("loaded")
  }
  async handleClick(){
    console.log('here');
  }

  render(){
    return(
      <div>
        <Modal size={'mini'} trigger={
          <Icon name="fire"
                size={'big'}
                style={pinStyle}
                onClick={this.handleClick}
          />}>
          <Modal.Header>Disaster</Modal.Header>
          <Modal.Content image>
            <Icon name="fire" size='massive'></Icon>
            <Modal.Description>
              <Header>
                Disaster Properties
              </Header>
              <p>
                Name: Example Name
              </p>
              <p>
                Desciption: Brief description of the disaster
              </p>
              <p>
                Type: Example Type (ie. Fire)
              </p>
              <p>
                Location: Example Location (ie. Chicago, IL)
              </p>
              <p>
                Keywords: Example Keywords
              </p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
