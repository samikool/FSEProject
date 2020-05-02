import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Box from '@material-ui/core/Box';
import MainAppbar from './mainAppbar.js';
import authorize from './authorize';
import theme from './index.js'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import AppBar from '@material-ui/core/AppBar';
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MaterialTable from 'material-table'
import AutoComplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import {history} from "react-router-dom/";
import PlacesAutoComplete from 'react-places-autocomplete'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'

const getToken = require('./authorize.js').getToken;


class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tab: 0,
            userColumns: [
                {title: 'ID', field: 'user_id', editable: 'never'},
                {title: 'First Name', field: 'first_name'},
                {title: 'Last Name', field: 'last_name'},
                {title: 'Email', field: 'email'},
                {title: 'Password', field: 'password'},
                {title: 'Street Address', field: 'location.Address'},
                {title: 'City', field: 'location.City'},
                {title: 'Country', field: 'location.Country'},
                {title: 'State', field: 'location.State'},
                {title: 'Zipcode', field: 'location.Zipcode'},
                {title: 'Admin', field: 'isadmin'},
                {title: 'Donor', field: 'isdonor'}, 
                {title: 'Requester', field: 'isrequester',},
            ],
            selectedRows: [],
            selectedIDs: []
        }


        this.handleLogout = this.handleLogout.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.getData = this.getData.bind(this);
    
        this.handleRowAdd = this.handleRowAdd.bind(this);
        this.handleRowUpdate = this.handleRowUpdate.bind(this);
        this.handleRowDelete = this.handleRowDelete.bind(this);
        this.handleMultipleRowDelete = this.handleMultipleRowDelete.bind(this);
        this.handleUserSelectionChange = this.handleUserSelectionChange.bind(this);
        
    }

    async handleLogout(){
        let refreshToken = await window.sessionStorage.refreshToken;
        await fetch('http://localhost:5000/authorize', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: refreshToken
            })
        });
        window.sessionStorage.accessToken = null;
        this.goBack()
    }

    async goBack(){
        this.props.history.goBack();
    }

    async getData(){
        //reauthorize and refresh token if needed
        let authorization = await authorize();
        this.setState({
            loggedIn: authorization['access'],
            user: authorization['email'],
            admin: authorization['admin'],
            donor: authorization['donor'],
            requester: authorization['requester'],
        });

        let token = await getToken();
        //get data from admin route
        let response = await fetch('http://localhost:5000/admin', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });

        if(!response.ok){
            this.setState(
                {
                    admin: false,
                    loggedin: false,
                }
            )
        }

        response = await response.json();
        console.log(response);
        this.setState({
            users: response.users,
            items: response.items,
            disasters: response.disasters,
            requests: response.requests,
        })
    }



    async componentDidMount(){
        await this.getData();
    }

    async handleTabChange(event, value){
        await this.setState({tab: value})
    }

    async handleRowAdd(newData, oldData){
        await authorize();
        let token = await getToken()

        //find what type of data we are editing
        let type;
        if(this.state.tab === 0) type='users'
        else if(this.state.tab === 1) type='items'
        else if(this.state.tab === 2) type='disasters'
        else if(this.state.tab === 3) type='requests'
        else if(this.state.tab === 4) type='donations'

        console.log('Add')
        console.log(newData);
        console.log(type)

        let response = await fetch('http://localhost:5000/admin',{
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: type,
                data: newData,
                add: true,
                token: token,
            })
        });
    }

    async handleRowUpdate(newData, oldData){
        await authorize();
        let token = await getToken()

        //find what type of data we are editing
        let type;
        if(this.state.tab === 0) type='users'
        else if(this.state.tab === 1) type='items'
        else if(this.state.tab === 2) type='disasters'
        else if(this.state.tab === 3) type='requests'
        else if(this.state.tab === 4) type='donations'

        console.log('Update')
        console.log(newData);
        console.log(type)

        let response = await fetch('http://localhost:5000/admin',{
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: type,
                data: newData,
                add: false,
                token, token,
            })
        });

        if(!response.ok){
            //maybe show snackbar that something went wrong but probably no time
        }
    }

    async handleRowDelete(newData, oldData){
        await authorize();
        //find what type of data we are editing
        let type;
        if(this.state.tab === 0) type='users'
        else if(this.state.tab === 1) type='items'
        else if(this.state.tab === 2) type='disasters'
        else if(this.state.tab === 3) type='requests'
        else if(this.state.tab === 4) type='donations'

        console.log('delete')
        console.log(newData);
        console.log(type)

        let response = await fetch('http://localhost:5000/admin',{
            method: 'DELETE',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: type,
                data: newData
            })
        });
    }

    async handleMultipleRowDelete(event, data){
        data.forEach((rowData) => {
            this.handleRowDelete(null, rowData);
        })
    }

    async handleUserSelectionChange(rows){
        let selectedIDs=[]
        rows.forEach((row) =>{
            selectedIDs.push(row.user_id)
        })

        this.setState({
            selectedRows: rows,
            selectedIDs: selectedIDs
        })
    }

    renderUsers(){
        let index=0;
        return(
            <ThemeProvider theme={theme}>
                <Box maxWidth='100%' hidden={this.state.tab != index}>
                <MaterialTable
                    //userComlumns defines what field to pull from data
                    columns={this.state.userColumns}
                    data={this.state.users}
                    title='User Table'
                    options={{
                        actionsColumnIndex: -1,
                        selection: true,
                    }}
                    actions={[
                    {
                        tooltip: 'Remove All Selected Users',
                        icon: 'delete',
                        onClick: (evt, data) => this.handleMultipleRowDelete
                    }
                    ]}
                    editable={{
                        onRowAdd: this.handleRowAdd,
                        onRowUpdate: this.handleRowUpdate,
                        onRowDelete: this.handleRowDelete,
                    }}
                    onSelectionChange={(rows) => this.handleUserSelectionChange(rows)}
                        
                />
                </Box>
            </ThemeProvider>
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

    renderDonations(){
        let index=4;
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
                        <IconButton onClick={this.goBack} edge="start" color="secondary" aria-label="menu">
                        <ArrowBackIcon />
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
                        <Tab label="Donations"/>
                    </Tabs>  
            </AppBar>
           {this.renderUsers()}
           {this.renderItems()}
           {this.renderDisasters()}
           {this.renderRequests()}
           {this.renderDonations()}
        </ThemeProvider>
        );
    }
}

export default Admin;
