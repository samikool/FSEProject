import React from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Popover from '@material-ui/core/Popover'


export default class LoginDropdown extends React.Component{
    constructor(props){
        super(props)
        this.state = {email: '', password: ''}

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister(this);
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
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
              <Paper>
                <Box px ={1} pt={2}>
                  <TextField 
                    id="userField" 

                    label='Email' 
                    onChange={this.handleEmail}/>
                </Box>
                <Box px={1} pt={2}>
                  <TextField 
                    id="passwordField" 
                    type="password" 
                    label='Password' 
                    onChange={this.handlePassword}/>
                </Box>
                <Box p={2}>
                <Grid justify="space-evenly" alignItems="center" container spacing={1}>
                  <Grid item>
                    <Button onClick={this.handleLogin}> Login </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={this.handleRegister}> Register </Button>
                  </Grid>
                </Grid>
                </Box>
              </Paper>
            </Popover>
        );

    }
}