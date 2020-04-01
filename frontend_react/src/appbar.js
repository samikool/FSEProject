import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from "react-router-dom";
import Popover from '@material-ui/core/Popover'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import LoginDropdown from './loginDropdown';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function ButtonAppBar(props) {
  const classes = useStyles();
  let isLoggedIn = props.isLoggedIn;
  let isAdmin = props.isAdmin;
  let history = useHistory();
  console.log('LoggedIn: ' + isLoggedIn);
  console.log('isAdmin: ' + isAdmin);

  //variables to keep track of Login Dropdown
  const[anchorEl, setAnchorE1] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'LoginDropdown' : undefined;

    //these are not actually errors


  

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
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  First Aid
                </Typography>
                <Button onClick={handleAddDisaster}color="inherit">
                  Add Disaster
                </Button>
                <Button onClick={handleLogout}color="inherit">
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
          </div>
      );
  } else if(isLoggedIn && !isAdmin){
      return(
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  First Aid
                </Typography>
                <Button onClick={handleLogout}color="inherit">
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
          </div>
      );
  } else{
      return(
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  First Aid
                </Typography>
                <Button onClick={handleLogin}color="inherit">
                  Login
                </Button>
                <LoginDropdown 
                  id={id} 
                  open={open} 
                  anchorEl={anchorEl} 
                  setAnchorE1={setAnchorE1} 
                  onClose={handleClose}/>
              </Toolbar>
            </AppBar>
          </div>
      );
    }
}
