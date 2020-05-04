import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Box from '@material-ui/core/Box'
import LoginDropdown from './loginDropdown';
import UserDropdown from './userDropdown';
import theme from './theme.js'
import PersonIcon from '@material-ui/icons/Person';

export default function MainAppbar(props) {
  let isLoggedIn = props.isLoggedIn;
  let isAdmin = props.isAdmin;
  let isDonor = props.isDonor;
  let isRequester = props.isRequester;
  // console.log('LoggedIn: ' + isLoggedIn);
  // console.log('isAdmin: ' + isAdmin);
  // console.log('isDonor: ' + isDonor);
  // console.log('isRequester: ' + isRequester);
  // console.log(theme);

  //variables to keep track of Login Dropdown
  const[anchorEl, setAnchorE1] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'LoginDropdown' : undefined;

  //variable to keep track of User Dropdown
  //possible to use same variables?
  const [anchorEl_user, setAnchorEl_user] = React.useState(null);
  const open_user = Boolean(anchorEl_user);
  const id_user = open_user ? 'UserDropdown' : undefined;


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
    props.history.push('/admin');
  };

  const handleUserDropdown = (event)=>{
    setAnchorEl_user(event.currentTarget);

  };

  if(isLoggedIn && isAdmin){
    return(
      <ThemeProvider theme={theme}>
        <AppBar color="transparent" position="static">
          <ThemeProvider theme={theme}>
            <Toolbar>
              <Box>
                <IconButton edge="start" color="primary" aria-label="menu" onClick={handleUserDropdown}>
                  <PersonIcon/>
                </IconButton>
                <UserDropdown
                  id={id_user}
                  open={open_user}
                  anchorEl={anchorEl_user}
                  setAnchorEl={setAnchorEl_user}
                  userName={"Antonio Washington"}
                  email={"senortonito@gmail.com"}
                  />
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
                <IconButton onClick={handleUserDropdown} edge="start" color="primary" aria-label="menu">
                  <PersonIcon/>
                </IconButton>
                <UserDropdown
                  id={id_user}
                  open={open_user}
                  anchorEl={anchorEl_user}
                  setAnchorEl={setAnchorEl_user}
                  userName={"Antonio Washington"}
                  email={"senortonito@gmail.com"}
                  />
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
              {/* <Box>
                <IconButton edge="start" color="primary" aria-label="menu">
                </IconButton>
              </Box> */}
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
