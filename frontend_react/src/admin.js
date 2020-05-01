import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Box from '@material-ui/core/Box';
import MainAppbar from './mainAppbar.js';
import authorize from './authorize';
import theme from './index.js'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { AppBar } from '@material-ui/core';
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import {history} from "react-router-dom/";


class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state = {tab: 0}
        
        this.handleLogout = this.handleLogout.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    async handleLogout(){
        let refreshToken = await window.sessionStorage.refreshToken;
        await fetch('http://localhost:5000/authorize', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: refreshToken
            })
        });
        window.sessionStorage.accessToken = null;
        this.props.history.push('/')
    }

    async componentDidMount(){
        let authorization = await authorize();
        this.setState({
            loggedIn: authorization['access'],
            user: authorization['email'],
            admin: authorization['admin'],
            donor: authorization['donor'],
            requester: authorization['requester'],
        });
    }

    async handleTabChange(event, value){
        await this.setState({tab: value})
    }

    renderUsers(){
        let index=0;
        return(
            <Box hidden={this.state.tab != index}>
                Users
            </Box>
        )
    }
    
    renderItems(){
        let index=1;
        return(
            <Box hidden={this.state.tab != index}>
                Items
            </Box>
        )
    }

    renderDisasters(){
        let index=2;
        return(
            <Box hidden={this.state.tab != index}>
                Disasters
            </Box>
        )
    }

    renderRequests(){
        let index=3;
        return(
            <Box hidden={this.state.tab != index}>
                <div>Requests</div>
            </Box>
        )
    }

    render(){
        if(!this.state.admin || !this.state.loggedIn){
            return(null)
        }
        return(
            <ThemeProvider theme={theme}>
            <AppBar color="primary" position="static">
            
                <Toolbar>
                    <Box>
                        <IconButton edge="start" color="secondary" aria-label="menu">
                        <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box flexGrow={1}>
                        <Typography color="secondary" variant="h6" >
                            First Aid
                        </Typography>
                    </Box>
                    
                    <Box pr={2}>
                        <Button variant="contained" color="secondary">
                        <Typography variant="button"> Admin Console </Typography>
                        </Button>
                    </Box>
                    <Box>
                        <Button onClick={this.handleLogout} variant="contained" color="secondary">
                        <Typography variant="button"> Logout </Typography>
                        </Button>
                    </Box>
                    </Toolbar>
                    <Tabs value={this.state.tab} onChange={this.handleTabChange}>
                        <Tab label="Users"/>
                        <Tab label="Items"/> 
                        <Tab label="Disasters"/>
                        <Tab label="Requests"/>
                    </Tabs>  
            </AppBar>
           {this.renderUsers()}
           {this.renderItems()}
           {this.renderDisasters()}
           {this.renderRequests()}
        </ThemeProvider>
        );
    }
}

export default Admin;