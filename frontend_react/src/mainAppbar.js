import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from "react-router-dom";
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Box from '@material-ui/core/Box'
import LoginDropdown from './loginDropdown';
import theme from './index.js'




export default function MainAppbar(props) {
  let isLoggedIn = props.isLoggedIn;
  let isAdmin = props.isAdmin;
  let isDonor = props.isDonor;
  let isRequester = props.isRequester;
  let history = useHistory();
  // console.log('LoggedIn: ' + isLoggedIn);
  // console.log('isAdmin: ' + isAdmin);
  // console.log('isDonor: ' + isDonor);
  // console.log('isRequester: ' + isRequester);
  // console.log(theme);

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
          body: JSON.stringify({
            token: refreshToken
          })
      });
      window.sessionStorage.accessToken = null;
      window.location.reload();
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  const handleAdmin = async (event) => {
    history.push('/admin');
  };

  if(isLoggedIn && isAdmin){
    return(
      <ThemeProvider theme={theme}>
        <AppBar color="transparent" position="static">
          <ThemeProvider theme={theme}>
            <Toolbar>
              <Box>
                <IconButton edge="start" color="primary" aria-label="menu">
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box flexGrow={1}>
                <Typography color="primary" variant="h6" >
                  First Aid
                </Typography>
              </Box>
              <Box pr={2}>
                <Button onClick={handleAdmin} variant="contained" color="primary">
                <Typography variant="button"> Admin Console </Typography>
                </Button>
              </Box>
              <Box>
                <Button onClick={handleLogout} variant="contained" color="primary">
                  <Typography variant="button">
                    Logout
                  </Typography>
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
        <AppBar color="transparent" position="static">
          <ThemeProvider theme={theme}>
            <Toolbar>
              <Box>
                <IconButton edge="start" color="primary" aria-label="menu">
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box flexGrow={1}>
                <Typography color="primary" variant="h6" >
                  First Aid
                </Typography>
              </Box>
              <Box>
                <Button onClick={handleLogout} variant="contained" color='primary'>
                  <Typography variant="button"> Logout </Typography>
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
  } else{
    return(
      <ThemeProvider theme={theme}>
        <AppBar color="transparent" position="static">
          <ThemeProvider theme={theme}>
            <Toolbar>
              <Box>
                <IconButton edge="start" color="primary" aria-label="menu">
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box flexGrow={1}>
                <Typography color="primary" variant="h6" >
                  First Aid
                </Typography>
              </Box>
              <Box>
                <Button onClick={handleLogin} variant="contained" color='primary'>
                  <Typography variant="button">
                    Login
                  </Typography>
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
