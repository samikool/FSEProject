import React from 'react'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Popover from '@material-ui/core/Popover'
import theme from './index.js'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Typography from '@material-ui/core/Typography'
import RegisterForm from './registerForm'
const getToken = require('./authorize').getToken;

export default class LoginDropdown extends React.Component{
  constructor(props){
    super(props);
    this.state = {email: '', password: '', registerOpen: false};
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegisterClose = this.handleRegisterClose.bind(this)
    this.handleRegisterOpen = this.handleRegisterOpen.bind(this)
  }

  async handleRegisterOpen(){
    this.setState({
      registerOpen: true
    })
  }

  async handleRegisterClose(){
    this.setState({
      registerOpen: false
    })
  }

  async handleEmail(event){
    let newEmail = event.target.value;
    await this.setState({email: newEmail});
    console.log(this.state.email)
  }

  async handlePassword(event){
    let newPassword = event.target.value;
    await this.setState({
      password: newPassword
    });
    console.log(this.state.password)
  }

  async handleLogin(event){
    console.log("Submitted: Username: '" + this.state.email + "' Password: '" + this.state.password + "'");
    let response = await fetch('http://localhost:5000/loginRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          username: this.state.email,
          password: this.state.password
        }),
    });

      response = await response.json();

    if(response['accessToken']){
      //console.log(response['accessToken'])
      window.sessionStorage.accessToken = await response['accessToken'];
      window.sessionStorage.refreshToken = await response['refreshToken'];
      window.location.reload();
    } else{
      console.log("Could not login because " + response['reason'] + " was incorrect")
    }
  }

  render(){
      return(
          <Popover
              id={this.props.id}
              open={this.props.open}
              anchorEl={this.props.anchorEl}
              onClose={this.props.onClose}
              anchorOrigin ={{
                  vertical: 'bottom',
                  horizontal: 'left',
              }}
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
          >
            <ThemeProvider theme={theme}>
              <Box bgcolor="secondary" p={2}>
                <Box pt={1}>
                  <TextField
                    id="userField"
                    label="Email"
                    type="email"
                    autoFocus={true}
                    variant='outlined'
                    onChange={this.handleEmail}/>
                </Box>
                <Box pt={2}>
                  <TextField
                    id="passwordField"
                    type='password'
                    label="Password"
                    variant='outlined'
                    onChange={this.handlePassword}
                  />
                </Box>
                <Box pb={1} pt={2}>
                  <Grid justify="space-evenly" alignItems="center" container spacing={1}>
                    <Grid item>
                      <Button
                        color='secondary'
                        variant='contained'
                        onClick={this.handleLogin}
                      >
                        <Typography variant="button">
                          Login
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        color='secondary'
                        variant='contained'
                        onClick={this.handleRegisterOpen}>
                      <Typography variant="button">
                        Register
                      </Typography>
                      </Button>
                      <RegisterForm open={this.state.registerOpen} onClose={this.handleRegisterClose} />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
          </ThemeProvider>
        </Popover>

      );
  }
}
