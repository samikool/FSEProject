import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from "react-router-dom";
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Popover from '@material-ui/core/Popover'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import LoginDropdown from './loginDropdown';
import theme from './index.js'




export default function ButtonAppBar(props) {
  let isLoggedIn = props.isLoggedIn;
  let isAdmin = props.isAdmin;
  let history = useHistory();
  console.log('LoggedIn: ' + isLoggedIn);
  console.log('isAdmin: ' + isAdmin);
  console.log(theme)

  //variables to keep track of Login Dropdown
  const[anchorEl, setAnchorE1] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'LoginDropdown' : undefined;


  //if not logged in open dropdown
  const handleLogin = async (event) => {
    setAnchorE1(event.currentTarget);
  };

  //if logged in then logout
  const handleLogout = async (event) =>{
    let refreshToken = await window.sessionStorage.refreshToken;
      await fetch('http://localhost:5000/authorize', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({token: refreshToken})
      });
      window.sessionStorage.accessToken = null;
      window.location.reload();
  }

  const handleClose = () => {
    setAnchorE1(null);
  };

  const handleAddDisaster = async (event: React.MouseEvent<HTMLElement>) => {
      history.push('/disasters');
      //window.location.reload();
  };

  


  if(isLoggedIn && isAdmin){
      return(
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <ThemeProvider theme={theme}>
            <Toolbar>     
              <Box>
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box flexGrow={1}>
                <Typography variant="h6" >
                  First Aid
                </Typography>
              </Box>         
              <Box px={1}>
                  <Button onClick={handleAddDisaster} variant="contained" color="primary">
                    Add Disaster
                  </Button>
                </Box>        
              <Box>                   
                <Button onClick={handleLogout} variant="contained" color="primary">
                  Logout
                </Button>
              </Box>
              </Toolbar>
          </ThemeProvider>
        </AppBar>
       </ThemeProvider>
    );
      
  } else if(isLoggedIn && !isAdmin){
      return(
        <ThemeProvider theme={theme}>
              <AppBar position="static">
              <ThemeProvider theme={theme}>
                <Toolbar>     
                  <Box>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                      <MenuIcon />
                    </IconButton>
                  </Box>
                  <Box flexGrow={1}>
                    <Typography variant="h6" >
                      First Aid
                    </Typography>
                  </Box>                 
                  <Box>                   
                    <Button onClick={handleLogout} variant="contained" color="primary">
                      Logout
                    </Button>
                  </Box>
                  </Toolbar>
                </ThemeProvider>
              </AppBar>
          </ThemeProvider>
      );
  } else{
      return(
          <ThemeProvider theme={theme}>
              <AppBar color='secondary'position="static">
              <ThemeProvider theme={theme}>
                <Toolbar>     
                  <Box>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                      <MenuIcon />
                    </IconButton>
                  </Box>
                  <Box flexGrow={1}>
                    <Typography variant="h6" >
                      First Aid
                    </Typography>
                  </Box>                 
                  <Box>                   
                    <Button onClick={handleLogin} variant="contained" color='primary'>
                      Login
                    </Button>
                  </Box>
                  <LoginDropdown 
                    id={id} 
                    open={open} 
                    anchorEl={anchorEl} 
                    setAnchorE1={setAnchorE1} 
                    onClose={handleClose}/>
                  </Toolbar>
                </ThemeProvider>
              </AppBar>
          </ThemeProvider>
      );
    }
}
