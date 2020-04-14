//resources: https://react.semantic-ui.com/modules/modal
import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { Button, Header, Image, Icon, Modal } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'
import 'semantic-ui-css/semantic.min.css';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import ThemeProvider from '@material-ui/styles/ThemeProvider'



const pinStyle={
  borderRadius: '10px',
  transform: 'translate(-50%,-50%)', //keeps markers from moving during zoom
  position: "absolute",
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
          <Modal.Header>{this.props.disaster.type} {this.props.disaster.name}</Modal.Header>
          <Modal.Content image>
            <Icon name="fire" size='massive'></Icon>
            <Modal.Description>
              <Header>
                 Info
              </Header>
              <p>
                Desciption: Brief description of the disaster
              </p>
              <p>
                Type: {this.props.disaster.type}
              </p>
              <p>
                Location: {this.props.disaster.formatted_address}
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Content>
          <ThemeProvider>
          <Box>
            {console.log(this.props.disaster)}
              <Typography variant='h6'> 
                Items Needed:
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableCell key={1}>
                      Item
                    </TableCell>
                    <TableCell key={2} align='right'>
                      Quantity Needed
                    </TableCell>
                  </TableHead>
                  <TableBody>
                    {
                      this.props.disaster.items_needed.map((item) => {
                        return(
                          <TableRow>
                            <TableCell key={1}>
                              {item}
                            </TableCell>
                            <TableCell key={2} align='right'>
                                5
                            </TableCell>
                          </TableRow>
                        ) 
                      })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              {/*Probably put a table here */}
            </Box>
            </ThemeProvider>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
