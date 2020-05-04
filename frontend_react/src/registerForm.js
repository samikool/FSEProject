import React from 'react'
import Box from '@material-ui/core/Box'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import theme from './theme.js'
import PlacesAutoComplete, {geocodeByAddress} from 'react-places-autocomplete'
import Checkbox from '@material-ui/core/Checkbox'
import * as yup from 'yup';
//import { validate } from 'indicative/validator';


export default class RegisterForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      verifyPassword: '',
      streetAddress: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      autoFillAddress: '',
      donorChecked: false,
      requesterChecked: false,
      emailInUse: false,
    };
    this.autoComplete = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  async handlePlaceSelect(suggestion){
    // console.log(suggestion)
    let response = await geocodeByAddress(suggestion);
    // console.log(response)
    // console.log(response[0])
    // console.log(response[0].address_components)

    //house number and street
    let streetAddress = response[0].formatted_address.split(',')[0];
    this.setState({streetAddress: streetAddress});

    let addressParts=response[0].address_components;
    addressParts.forEach(part => {
      //console.log(part)
      part.types.forEach(type => {
        //city
        if(type==="locality"){
          this.setState(
            {
              city: part.long_name
            })
        }
        //state
        else if(type === "administrative_area_level_1"){
          this.setState(
            {
              state: part.long_name
            })
        }
        //zipcode
        else if(type === "postal_code"){
          this.setState(
            {
              zipcode: part.long_name
            })
        }
        //country
        else if(type === "country"){
          this.setState(
            {
              country: part.long_name
            })
        }
      })
    });

    this.handleAddress(streetAddress)
  }

  async handleAddress(event){
    await this.setState({
      autoFillAddress: event
    })
  }

  async handleCheck(event){
    await this.setState({
      [event.target.name]: event.target.checked
    })
  }

  async handleChange(event){
    const name = event.target.id;
    const value = event.target.value;
    await this.setState({
      [name]: value
    })
  }

  async validate(){
    let schema = yup.object().shape({
      first_name: yup.string().required("First name is required"),
      last_name: yup.string().required("Last name is required"),
      email: yup.string().email("Not a valid email").required("E-Mail is required."),
      password: yup.string().min(6).required("Password must contain six characters.")
    })
  }

  async handleRegister(){

    let isValid = this.validate();

    let response = await fetch("http://localhost:5000/register", {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          streetAddress: this.state.streetAddress,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          country: this.state.country,
          donor: this.state.donorChecked,
          requester: this.state.requesterChecked,
        })
    })

    //if register successful, probably try to login then reload window
    response = await response.json();
    console.log(response)
    if(response.success){  
      this.props.onClose(null,null,true);
    }else{
      this.setState({emailInUse: true})
    }
  }

  render(){
    return(
      <ThemeProvider theme={theme}>
        <Box height={'100%'} width={'100%'}>
          <Dialog open={this.props.open} onClose={this.props.onClose}>
              <Box pl={2} pt={2}>
                <Typography variant='h3' color="primary">
                  Register
                </Typography>
              </Box>
            <DialogContent>
              <Box>
                <Typography>
                  We just need some basic information before you can start helping us save the world
                </Typography>
              </Box>
              <Box pt={1}>
                <Typography color="primary" variant='h5'>
                  Account Info
                </Typography>
              </Box>

              <Box pt={1}>
                <Grid container spacing={1}>
                  <Grid item>
                    <TextField
                      id="firstName"
                      autoFocus={true}
                      required
                      variant="outlined"
                      label="First Name"
                      type="text"
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="lastName"
                      required
                      variant="outlined"
                      label="Last Name"
                      type="text"
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box pt={2}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    {!this.state.emailInUse 
                    ?  <TextField
                        id="email"
                        required
                        variant="outlined"
                        label="Email"
                        type="email"
                        fullWidth={true}
                        onChange={this.handleChange}
                      />
                    : <TextField
                        id="email"
                        required
                        variant="outlined"
                        label="Email is already in use"
                        type="email"
                        fullWidth={true}
                        onChange={this.handleChange}
                        error={true}
                      />
                     
                    }
                    
                  </Grid>
                </Grid>
              </Box>
              <Box pt={2}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <TextField
                      id="password"
                      required
                      helperText="Minimum 6 characters"
                      variant="outlined"
                      label="Password"
                      type="password"
                      fullWidth={true}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="verifyPassword"
                      required
                      variant="outlined"
                      label="Verify Password"
                      type="password"
                      fullWidth={true}
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box pt={2}>

                <Typography color="primary" variant="h5">
                  Address
                </Typography>

              </Box>
              <Box pt={1}>
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <PlacesAutoComplete
                      value={this.state.autoFillAddress}
                      onChange={this.handleAddress}
                      onSelect={this.handlePlaceSelect}
                    >
                      {({getInputProps, suggestions, getSuggestionItemProps, loading}) =>
                        (
                          <Box>
                            <Box>
                              <FormControl fullWidth  variant="outlined">
                                <InputLabel htmlFor="streetAddress">
                                  Street Address
                                </InputLabel>
                                <OutlinedInput {...getInputProps()}
                                               id="streetAddress"
                                               autoComplete="none"
                                               labelWidth={94}
                                />
                              </FormControl>
                            </Box>
                            <Box pt={1}>
                              <Grid container spacing={1} direction="column">
                                {suggestions.map((suggestion) => {
                                  const color=suggestion.active ? "primary.light" : "#fff";
                                  return (
                                    <Grid item {...getSuggestionItemProps(suggestion, {color})}>
                                      <Box bl={1} bgcolor={color}>
                                        {suggestion.description}
                                      </Box>
                                    </Grid>
                                  );

                                })}
                              </Grid>
                            </Box>
                          </Box>
                        )
                      }
                    </PlacesAutoComplete>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="city"
                      value={this.state.city}
                      disabled={false}
                      variant="outlined"
                      label="City"
                      type="text"
                      fullWidth={true}
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box pt={2}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <TextField
                      id="state"
                      value={this.state.state}
                      disabled={false}
                      variant="outlined"
                      label="State"
                      type="text"
                      fullWidth={true}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="zipcode"
                      value={this.state.zipcode}
                      disabled={false}
                      variant="outlined"
                      label="Zipcode"
                      type="text"
                      fullWidth={true}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      id="country"
                      value={this.state.country}
                      disabled={false}
                      variant="outlined"
                      label="Country"
                      type="text"
                      fullWidth={true}
                      onChange={this.handleChange}
                    />
                  </Grid>

                </Grid>
              </Box>
              <Box pt={1}>
                <Typography color="primary" variant="h5">
                  User Type
                </Typography>
              </Box>
              <Box pt={1}>
                <Typography>
                  We need to know whether you plan on requesting items, donating items, or both
                </Typography>
              </Box>
              <Box pt={1}>
                <Grid container>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="donorChecked"
                          checked={this.state.donorChecked}
                          onChange={this.handleCheck}
                          color="primary"
                        />
                      }
                      label="Donor"
                    />

                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="requesterChecked"
                          checked={this.state.requesterChecked}
                          onChange={this.handleCheck}
                          color="primary"/>
                      }
                      label="Requester"
                    />
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleRegister} color="primary">
                Register
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </ThemeProvider>
    );
  }
}
