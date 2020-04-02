import React from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Popover from '@material-ui/core/Popover'
import theme from './index.js'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Typography from '@material-ui/core/Typography'
import { InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input'



export default class LoginDropdown extends React.Component{
    constructor(props){
        super(props)
        this.state = {email: '', password: '', showPassword: false}

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister(this);
        this.handleShowPassword = this.handleShowPassword(this);
    }

    async handleLogin(){
      // if(!isLoggedIn){
      //     history.push('/login');
      // } else{
      //     let refreshToken = await window.sessionStorage.refreshToken;
      //     await fetch('http://localhost:5000/authorize', {
      //         method: 'DELETE',
      //         headers: { 'Content-Type': 'application/json' },
      //         body: JSON.stringify({token: refreshToken})
      //     });
      //     window.sessionStorage.accessToken = null;
      //     window.location.reload();
      // }


    }

    async handleRegister(){

    }

    async handleEmail(event){
      let newEmail = event.target.value
      await this.setState({email: newEmail})
      console.log(this.state.email)
    }

    async handlePassword(event){
      let newPassword = event.target.value
      await this.setState({password: newPassword})
      console.log(this.state.password)
    }

    async handleShowPassword(){
      if(this.state.showPassword){
        await this.setState({showPassword: false})
      }else{
        await this.setState({showPassword: true})
      }
    }

    async handleLogin(event){
      console.log("Submitted: Username: '" + this.state.username + "' Password: '" + this.state.password + "'");
      let response = await fetch('http://localhost:5000/loginRequest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: this.state.email, password: this.state.password}),
      });

      response = await response.json();

      if(response['accessToken']){
        //console.log(response['accessToken'])
        window.sessionStorage.accessToken = await response['accessToken'];
        window.sessionStorage.refreshToken = await response['refreshToken'];
        window.location.reload();
      }
      else{
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
                <Box bgcolor="secondary.dark" p={2}>
                  <Box pt={1}>
                    <TextField 
                      id="userField" 
                      label="Email"
                      autoFocus={true}
                      variant='filled'
                      onChange={this.handleEmail}/>
                  </Box>
                  <Box pt={2}>
                    <TextField 
                      id="passwordField" 
                      type='password'
                      label="Password"        
                      variant='filled'
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
                          <Typography variant="button"> Login </Typography> 
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button 
                          color='secondary' 
                          variant='contained'  
                          onClick={this.handleRegister}> 
                        <Typography variant="button">  Register </Typography> 
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
            </ThemeProvider>
          </Popover>
          
        );

    }
}