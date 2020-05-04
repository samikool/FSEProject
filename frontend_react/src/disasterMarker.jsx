//resources: https://react.semantic-ui.com/modules/modal
import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { Header, Image, Icon, Modal } from 'semantic-ui-react'
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
import Grid from '@material-ui/core/Grid'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import theme from './theme.js'
import Button from '@material-ui/core/Button'
import { TablePagination } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import authorize from './authorize'
import DonateForm from './donateForm'
import RequestForm from './requestForm'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'


const getToken = require('./authorize').getToken;

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
      "setIsShown":false,
      page:0,
      rowsPerPage:5,
      items: {},
      donateOpen: false,
      requestOpen: false,
      showDonateSnackbar: false,
      showRequestSnackbar:false,
      totalItemsDonated: 0,
      num_requested: 0,
    };

    this.handleDonateOpen = this.handleDonateOpen.bind(this);
    this.handleDonateClose = this.handleDonateClose.bind(this);
    this.handleRequestOpen = this.handleRequestOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.renderDonate = this.renderDonate.bind(this);
    this.renderRequest = this.renderRequest.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleDonateSnackbarClose = this.handleDonateSnackbarClose.bind(this)
    this.handleRequestSnackbarClose = this.handleRequestSnackbarClose.bind(this)
  }

  async handleDonateSnackbarClose(){
    this.setState({
      showDonateSnackbar: false,
      totalItemsDonated: 0,
    })
  }

  async handleRequestSnackbarClose(){
    this.setState({
      showRequestSnackbar: false,
      num_requested: 0,
    })
  }

  async handleDonateOpen(){
    //authorize to make sure token up to date
    this.setState(
      {donateOpen: true}
    )
    return;
  }

  async handleDonateClose(totalItemsDonated){
    if(totalItemsDonated>0){
      this.setState(
        {
          donateOpen: false,
          showDonateSnackbar: true,
          totalItemsDonated: totalItemsDonated,
        }
      )
    }else{
      this.setState({
        donateOpen:false,
      })
    }
  }

  async handleRequestOpen(){
    this.setState({
      requestOpen: true
    })
    return;
  }

  async handleRequestClose(num_requested){
    if(num_requested > 0){
      this.setState(
        {
          requestOpen: false,
          showRequestSnackbar: true,
          num_requested: num_requested
        }
      )
    }else{
      this.setState({
        requestOpen: false,
      })
    }
    
  }

  async handleChangePage(event, newPage){
    await this.setState({page: newPage})
  };

  async handleChangeRowsPerPage(event)
  {
    this.setState({page: 0, rowsPerPage: event.target.value})
  };


  renderDonate(){
    if(!this.props.isLoggedIn){
      return(
        <Typography variant='h6'> 
          Sign up today so you can start donating to people in need!
        </Typography>
      )
    }

    if(this.props.isDonor){
      return(
        <Button onClick={this.handleDonateOpen} variant="contained" color='primary'>
          <Typography variant="button"> Donate </Typography>
        </Button>
      )
    }

    return(
      <Button disabled variant="contained" color='primary'>
        <Typography variant="button"> Donate </Typography>
      </Button>
    )

    
  }

  renderRequest(){
    if(!this.props.isLoggedIn){
      return
    }

    if(this.props.isRequester){
      return(
          <Button onClick={this.handleRequestOpen} variant="contained" color='primary'>
            <Typography variant="button"> Request </Typography>
          </Button>
      )
    }

    return(
      <Button disabled variant="contained" color='primary'>
        <Typography variant="button"> Request </Typography>
      </Button>
    )
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
          <Box>
            <Snackbar 
              open={this.state.showDonateSnackbar} 
              autoHideDuration={7500} 
              onClose={this.handleDonateSnackbarClose}

            >
              <Alert 
                onClose={this.handleDonateSnackbarClose}
                variant='filled'
                elevation={6} 
                severity="success">
                Thank you for your donation of {this.state.totalItemsDonated} items!
              </Alert> 
            </Snackbar>
            <Snackbar
              open={this.state.showRequestSnackbar} 
              autoHideDuration={7500} 
              onClose={this.handleRequestSnackbarClose}
            >
              <Alert 
                onClose={this.handleRequestSnackbarClose}
                variant='filled'
                elevation={6} 
                severity="success">
                Your {this.state.num_requested} items have been requested. They will be delivered as soon as they are ready. 
              </Alert> 
            </Snackbar>
          </Box>
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
          <ThemeProvider theme={theme}>

              <Typography variant='h6'> 
                Items Needed:
              </Typography>
              
              <Box maxHeight='55vh' overflow='auto'>
              <TableContainer >
                <Table stickyHeader={true}>
                  <TableHead >
                    <TableRow>
                      <TableCell>
                        Item
                      </TableCell>
                      <TableCell align='right'>
                        Quantity Needed
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {!this.props.items ? null:
                    <TableBody>
                    {
                      Object.keys(this.props.items)
                      //.slice(
                      //  this.state.page * this.state.rowsPerPage, 
                      //  this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                      .map(key => {
                        //console.log(this.props.disaster.items_needed[key].name)
                        //console.log(this.props.disaster.items_needed[key].num_needed)
                        let itemName = this.props.items[key].name
                        itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
                        let numNeeded = this.props.items[key].num_needed
                        return(
                          <TableRow key={key}>
                            <TableCell>
                              {itemName}
                            </TableCell>
                            <TableCell align='right'>
                              {numNeeded}
                            </TableCell>
                          </TableRow>
                        ) 
                      })
                    }
                    </TableBody>
                  }
                </Table>
              </TableContainer>
              </Box>
      
            
            <Box pt={2} >
              <Grid container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid item>
                  {this.renderDonate()}
                  <DonateForm 
                    open={this.state.donateOpen} 
                    onClose={this.handleDonateClose} 
                    items={this.props.items}
                    disaster_id={this.props.disaster.id}
                  />
                </Grid>
                <Grid item>
                  {this.renderRequest()}
                  <RequestForm 
                    open={this.state.requestOpen} 
                    onClose={this.handleRequestClose}   
                    items={this.props.items}
                    disaster_id={this.props.disaster.id}
                  />
                </Grid>
              </Grid>
              </Box>
            </ThemeProvider>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
