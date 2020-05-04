import React from 'react'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Popover from '@material-ui/core/Popover'
import theme from './theme.js'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Typography from '@material-ui/core/Typography'
import RegisterForm from './registerForm'
import FaceIcon from '@material-ui/icons/Face';
import PasswordIcon from '@material-ui/icons/VpnKey';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import { Tooltip, Paper, TableContainer } from '@material-ui/core'
const getToken = require('./authorize').getToken;


export default class UserDropdown extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        update: false,
        displayOpen: true, 
        changePassword:false, 
        changeEmail:false, 
        changeAddress:false,
        user_info:{}
    };
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleAddress = this.handleAddress.bind(this)
    this.updateUserInfo = this.updateUserInfo.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.componentWillUpdate = this.componentWillUpdate.bind(this)

}
    async handleClose(){
        let token = window.sessionStorage.refresh
        console.log("CLOSE")
        this.props.setAnchorEl(null);
        this.setState({
            update:false,
            open:false
        })
    };  

    async componentWillUpdate(){
        console.log("UPDATE");
        console.log(this.state)
        if(this.state.displayOpen && !this.state.update){
            this.updateUserInfo();
        }
    }

    async handlePassword(event){
        await this.setState({
            changePassword: !this.state.changePassword
        });
    }

    handleEmailChange(event){
        let newEmail = event.target.value;
        // await this.setState({
        //   password: newPassword
        // });
        console.log(newEmail)    
     }

     handleAddressChange(event){
        let newAddress = event.target.value;
        // await this.setState({
        //   password: newPassword
        // });
        console.log(newAddress)    
     }


     handlePasswordChange(event){
        let newPassword = event.target.value;
        // await this.setState({
        //   password: newPassword
        // });
        console.log(newPassword)    
     }

    async updateUserInfo(){
        let token = await getToken();

        let response = await fetch('http://localhost:5000/userInfo', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            token: token,
            }),
        });
        response = await response.json();
        console.log(response)
        //set state to updated
        this.setState({
            update:true,
            user_info:response
        })

        return response;
    }

    async handleEmail(event){
        await this.setState({
            changeEmail: !this.state.changeEmail
        });
    }

    async handleAddress(event){
        await this.setState({
            changeAddress: !this.state.changeAddress
        });
    }

    renderPasswordFields(){
        return (
            this.state.changePassword ? 
            <Box alignContent='space-between' display='flex' flexDirection='column' justifyContent="center" bgcolor="secondary" p={1}>
                <Box paddingY={1}>
                    <TextField
                        id="passField"
                        label="Current Password"
                        type="password"
                        autoFocus={true}
                        variant='outlined'
                        onChange={this.handlePasswordChange}/> 
                </Box> 
                <Box paddingY={1}>
                    <TextField
                        id="newPassField"
                        label="New Password"
                        type="newPassword"
                        autoFocus={true}
                        variant='outlined'
                        onChange={this.handlePasswordChange}/>
                </Box>
                <Box paddingY={1}>
                    <TextField
                        id="confNewPassField"
                        label="Confirm Password"
                        type="confNewPassword"
                        autoFocus={true}
                        variant='outlined'
                        onChange={this.handlePasswordChange}/>
                </Box>
            </Box>
            : null
        )
    }

    renderEmailFields(){
        return (
            this.state.changeEmail ? 
            <Box alignContent='space-between' display='flex' flexDirection='column' justifyContent="center" bgcolor="secondary" p={1}>
                <Box paddingY={1}>
                    <TextField
                        id="EmailField"
                        label={this.state.user_info.email}
                        type="email"
                        autoFocus={true}
                        variant='outlined'
                        onChange={this.handleEmailChange}/> 
                </Box> 
            </Box>
            : null
        )
    }

    renderAddressFields(){
        return (
            this.state.changeAddress ? 
            <Box alignContent='space-between' display='flex' flexDirection='column' justifyContent="center" bgcolor="secondary" p={1}>
                <Box paddingY={1}>
                    <TextField
                        id="AddressField"
                        label={this.state.user_info.location.Address}
                        type="Address"
                        autoFocus={true}
                        variant='outlined'
                        onChange={this.handleAddressChange}/> 
                </Box> 
            </Box>
            : null
        )
    }
    render(){

      return(
        <Popover
              id={this.props.id}
              open={this.props.open}
              anchorEl={this.props.anchorEl}
              onClose={this.handleClose}
              anchorOrigin ={{
                  vertical: 'top',
                  horizontal: 'left',
              }}
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
              }}>
            <ThemeProvider theme={theme}>
            <Box  display='flex' justifyContent="center" bgcolor="secondary" p={1} pt={4}>
                <Box>                
                    <FaceIcon color='primary' fontSize='large'/>
                </Box>
            </Box>
            <Box  display='flex' justifyContent="center" bgcolor="secondary" p={1}>
                <Box textAlign='center'>
                    <Typography color='textPrimary' variant='h6'>{this.state.user_info['first_name']} {this.state.user_info['last_name']}</Typography>
                    <Typography color='textSecondary' variant='subtitle2'>{this.state.user_info['email']}</Typography>
                </Box>
            </Box>
            <Box  display='flex' justifyContent="center" bgcolor="secondary" p={1}>
                <Box>
                <Tooltip title="Change Password">
                    <IconButton edge="start" color="primary" aria-label="menu" onClick={this.handlePassword}>
                        <PasswordIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Change Email">
                    <IconButton edge="start" color="primary" aria-label="menu" onClick={this.handleEmail}>
                        <EmailIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Change Address">
                    <IconButton edge="start" color="primary" aria-label="menu" onClick={this.handleAddress}>
                        <EditLocationIcon/>
                    </IconButton>
                </Tooltip>
                </Box>
            </Box> 
            <Box px={1}>
                { this.renderPasswordFields() }
            </Box>
            <Box px={1}>
                { this.renderEmailFields() }
            </Box>
            <Box px={1}>
                { this.renderAddressFields() }
            </Box>
            <Paper elevation={1}>               
                <Box  display='flex' justifyContent="row" bgcolor="secondary" p={1}>
                    <Typography variant='body1' color='textPrimary'>Donations</Typography>
                    <TableContainer>

                    </TableContainer>
                </Box>           
                <Box  display='flex' justifyContent="row" bgcolor="secondary" p={1}>
                    <Typography variant='body1' color='textPrimary'>Requests</Typography>
                </Box>
            </Paper>
            {/*<Box>
                <Box pb={1} pt={2}>
                   <Grid justify="space-evenly" alignItems="center" container spacing={1}>
                    <Grid item>
                    </Grid>
                    <Grid item>
                    </Grid>
                  </Grid> 
                </Box>
              </Box>*/}
          </ThemeProvider>
        </Popover>
      );
  }
}
