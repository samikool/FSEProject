import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from "react-router-dom"

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

    //these are not actually errors
    const handleLogin = (event: React.MouseEvent<HTMLElement>) => {
        if(!isLoggedIn){
            history.push('/login');
        } else{
            window.sessionStorage.accessToken = null;
            window.location.reload();
        }
    };

    const handleAddDisaster = (event: React.MouseEvent<HTMLElement>) => {
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
                  <Button onClick={handleLogin}color="inherit">
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
                  <Button onClick={handleLogin}color="inherit">
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
                </Toolbar>
              </AppBar>
            </div>
        );
    }
}
