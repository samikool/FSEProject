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
import MaterialTable, { MTableToolbar } from 'material-table'
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore'
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
            users: [],
            items: [],
            disasters: [],
            requests: [],
            donations: [],
            selectedRows: [],
            showSuccessSnackbar: false,
            showFailSnackbar: false,
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
        this.handleResetPassword = this.handleResetPassword.bind(this);
        
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
            donations: response.donations,
        })
    }



    async componentDidMount(){
        await this.getData();
    }

    async handleTabChange(event, value){
        await this.setState({tab: value})
    }

    async handleRowAdd(newData){
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

        if(!response.ok){
            //maybe show snackbar that something went wrong but probably no time
            return;
        }

        response = await response.json();
        console.log(response)
        if(response.success){
            const data = this.state[type];
            //remove trailing s and add _id to get name of id property
            const idPath = type.substr(0,type.length-1) + '_id';
            newData[idPath] = response[idPath];
            data.push(newData);
            await this.setState({[type]: data});
            return //this.state[type];
        }else{
            return;
        }
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
        console.log(oldData);
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
            return;
        }

        response = await response.json();
        console.log(response)
        if(response.success){
            const data = this.state[type];
            if(type==='users') newData.password = 'classified';

            data[oldData.tableData.id] = newData;
            
            await this.setState({[type]: data});
            return //this.state[type];
        }else{
            return;
        }
    }

    async handleRowDelete(oldData){
        await authorize();
        let token = await getToken()
        //find what type of data we are editing
        let type;
        if(this.state.tab === 0) type='users'
        else if(this.state.tab === 1) type='items'
        else if(this.state.tab === 2) type='disasters'
        else if(this.state.tab === 3) type='requests'
        else if(this.state.tab === 4) type='donations'

        console.log('delete')
        console.log(oldData);
        console.log(type)

        let response = await fetch('http://localhost:5000/admin',{
            method: 'DELETE',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: type,
                data: oldData,
                token, token,
            })
        });
        
        console.log(response)
        response = await response.json();

        if(response.success){
            const data = this.state[type];
            data.splice(oldData.tableData.id, 1);
            await this.setState({[type]: data});
            return //this.state[type];
        }else{
            return;
        }
    }

    async handleMultipleRowDelete(event, data){
        console.log(data)
        data.forEach((rowData) => {
            this.handleRowDelete(rowData);
        })
        this.setState({
            selectedRows: [],
        })
    }

    async handleUserSelectionChange(rows){
        this.setState({
            selectedRows: rows,
        })
    }

    async handleResetPassword(event, data){

    }

    renderUsers(){
        let index=0;
        return(
            <ThemeProvider theme={theme}>
                <Box 
                    // maxHeight='75vh' 
                    // overflow='auto' 
                    // maxWidth='100%' 
                >
                <MaterialTable
                    //userComlumns defines what field to pull from data
                    style={{
                        maxHeight: '75vh', 
                        overflow: 'auto', 
                        maxWidth: '100%', 
                    }}
                    columns= {[
                        {title: 'ID', field: 'user_id', editable: 'never'},
                        {title: 'First Name', field: 'first_name'},
                        {title: 'Last Name', field: 'last_name'},
                        {title: 'Email', field: 'email'},
                        {title: 'Password', field: 'password', },
                        {title: 'Street Address', field: 'location.Address'},
                        {title: 'City', field: 'location.City'},
                        {title: 'State', field: 'location.State'},
                        {title: 'Zipcode', field: 'location.Zipcode'},
                        {title: 'Country', field: 'location.Country'},
                        {title: 'Admin', field: 'isadmin', type:'boolean', initialEditValue: true},
                        {title: 'Donor', field: 'isdonor', type:'boolean', initialEditValue: true}, 
                        {title: 'Requester', field: 'isrequester', type:'boolean', initialEditValue: true},
                    ]}
                    data={this.state.users}
                    title={
                        <Box py={1}>
                        <Typography variant='h4' color="primary"> User Table</Typography>
                        </Box>
                    }
                    components={{
                        Toolbar: props => (
                            <Box bgcolor={theme.palette.secondary.dark}>
                                <MTableToolbar {...props}/>
                            </Box>
                        )
                    }}
                    options={{
                        actionsColumnIndex: -1,
                        selection: true,
                        showTextRowsSelected: false,
                        paging: false,
                        draggable: false,
                        headerStyle: {
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.primary.dark,
                        },
                        rowStyle: rowData => ({
                            backgroundColor: (this.state.selectedRows.includes(rowData) 
                            ? theme.palette.secondary.dark
                            : '#FFF'
                            )
                        }),
                        selectionProps: {color: 'primary'}
                    }}
                    actions={[
                    {
                        tooltip: 'Remove All Selected Users',
                        icon: 'delete',
                        onClick: (evt, data) => this.handleMultipleRowDelete(evt,data)
                    },
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
            <ThemeProvider theme={theme}>
                <Box 
                    // maxHeight='75vh' 
                    // overflow='auto' 
                    // maxWidth='100%' 
                >
                <MaterialTable
                    //userComlumns defines what field to pull from data
                    style={{
                        maxHeight: '88vh', 
                        overflow: 'auto', 
                        maxWidth: '100%', 
                    }}
                    columns= {[
                        {title: 'ID', field: 'item_id', editable: 'never'},
                        {title: 'Name', field: 'name'},
                        {title: 'Type', field: 'type', lookup:{
                                                            'cleaning':'cleaning', 
                                                            'food':'food',
                                                            'material':'material',
                                                            'supplies':'supplies',
                                                            'medical':'medical',
                                                            'equipment':'equipment',
                                                        }
                    },
                        //{title: 'Keywords', field: 'keywords'}
                    ]}
                    data={this.state.items}
                    title={
                        <Box py={1}>
                        <Typography variant='h4' color="primary"> Item Table</Typography>
                        </Box>
                    }
                    components={{
                        Toolbar: props => (
                            <Box bgcolor={theme.palette.secondary.dark}>
                                <MTableToolbar {...props}/>
                            </Box>
                        )
                    }}
                    options={{
                        actionsColumnIndex: -1,
                        selection: true,
                        showTextRowsSelected: false,
                        paging: false,
                        draggable: false,
                        headerStyle: {
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.primary.dark,
                        },
                        rowStyle: rowData => ({
                            backgroundColor: (this.state.selectedRows.includes(rowData) 
                            ? theme.palette.secondary.dark
                            : '#FFF'
                            )
                        }),
                        selectionProps: {color: 'primary'}
                    }}
                    actions={[
                    {
                        tooltip: 'Remove All Selected Items',
                        icon: 'delete',
                        onClick: (evt, data) => this.handleMultipleRowDelete(evt,data)
                    },
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

    renderDisasters(){
        let index=2;
        return(
            <ThemeProvider theme={theme}>
                <Box 
                    // maxHeight='75vh' 
                    // overflow='auto' 
                    // maxWidth='100%' 
                >
                <MaterialTable
                    //userComlumns defines what field to pull from data
                    style={{
                        maxHeight: '88vh', 
                        overflow: 'auto', 
                        maxWidth: '100%', 
                    }}
                    columns= {[
                        {title: 'ID', field: 'disaster_id', editable: 'never'},
                        {title: 'Name', field: 'name'},
                        {title: 'City', field: 'location.city'},
                        {title: 'State', field: 'location.state'},
                        {title: 'Country', field: 'location.country'},
                        //{title: 'Keywords', field: 'keywords'}
                    ]}
                    data={this.state.disasters}
                    title={
                        <Box py={1}>
                        <Typography variant='h4' color="primary"> Disaster Table</Typography>
                        </Box>
                    }
                    components={{
                        Toolbar: props => (
                            <Box bgcolor={theme.palette.secondary.dark}>
                                <MTableToolbar {...props}/>
                            </Box>
                        )
                    }}
                    options={{
                        actionsColumnIndex: -1,
                        selection: true,
                        showTextRowsSelected: false,
                        paging: false,
                        draggable: false,
                        headerStyle: {
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.primary.dark,
                        },
                        rowStyle: rowData => ({
                            backgroundColor: (this.state.selectedRows.includes(rowData) 
                            ? theme.palette.secondary.dark
                            : '#FFF'
                            )
                        }),
                        selectionProps: {color: 'primary'}
                    }}
                    actions={[
                    {
                        tooltip: 'Remove All Selected Disasters',
                        icon: 'delete',
                        onClick: (evt, data) => this.handleMultipleRowDelete(evt,data)
                    },
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

    renderRequests(){
        let index=3;
        return(
            <ThemeProvider theme={theme}>
                <Box 
                    // maxHeight='75vh' 
                    // overflow='auto' 
                    // maxWidth='100%' 
                >
                <MaterialTable
                    //userComlumns defines what field to pull from data
                    style={{
                        maxHeight: '88vh', 
                        overflow: 'auto', 
                        maxWidth: '100%', 
                    }}
                    columns= {[
                        {title: 'ID', field: 'request_id', editable: 'never'},
                        {title: 'Requester ID', field: 'requester_id'},
                        {title: 'Disaster ID', field: 'disaster_id'},
                        {title: 'Item ID', field: 'item_id'},
                        {title: 'Number Needed', field: 'num_needed'},
                        {title: 'Number Provided', field: 'num_provided'}
                        
                    ]}
                    data={this.state.requests}
                    title={
                        <Box py={1}>
                        <Typography variant='h4' color="primary"> Requests Table</Typography>
                        </Box>
                    }
                    components={{
                        Toolbar: props => (
                            <Box bgcolor={theme.palette.secondary.dark}>
                                <MTableToolbar {...props}/>
                            </Box>
                        )
                    }}
                    options={{
                        actionsColumnIndex: -1,
                        selection: true,
                        showTextRowsSelected: false,
                        paging: false,
                        draggable: false,
                        headerStyle: {
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.primary.dark,
                        },
                        rowStyle: rowData => ({
                            backgroundColor: (this.state.selectedRows.includes(rowData) 
                            ? theme.palette.secondary.dark
                            : '#FFF'
                            )
                        }),
                        selectionProps: {color: 'primary'}
                    }}
                    actions={[
                    {
                        tooltip: 'Remove All Selected Requests',
                        icon: 'delete',
                        onClick: (evt, data) => this.handleMultipleRowDelete(evt,data)
                    },
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

    renderDonations(){
        let index=4;
        return(
            <ThemeProvider theme={theme}>
                <Box 
                    // maxHeight='75vh' 
                    // overflow='auto' 
                    // maxWidth='100%' 
                >
                <MaterialTable
                    //userComlumns defines what field to pull from data
                    style={{
                        maxHeight: '88vh', 
                        overflow: 'auto', 
                        maxWidth: '100%', 
                    }}
                    columns= {[
                        {title: 'ID', field: 'donation_id', editable: 'never'},
                        {title: 'Request ID', field: 'request_id'},
                        {title: 'Donor ID', field: 'donor_id'},
                        {title: 'Disaster ID', field: 'disaster_id'},
                        {title: 'Item ID', field: 'item_id'},
                        {title: 'Number Provided', field: 'quantity'},
                    ]}
                    data={this.state.donations}
                    title={
                        <Box py={1}>
                        <Typography variant='h4' color="primary"> Donation Table</Typography>
                        </Box>
                    }
                    components={{
                        Toolbar: props => (
                            <Box bgcolor={theme.palette.secondary.dark}>
                                <MTableToolbar {...props}/>
                            </Box>
                        )
                    }}
                    options={{
                        actionsColumnIndex: -1,
                        selection: true,
                        showTextRowsSelected: false,
                        paging: false,
                        draggable: false,
                        headerStyle: {
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.primary.dark,
                        },
                        rowStyle: rowData => ({
                            backgroundColor: (this.state.selectedRows.includes(rowData) 
                            ? theme.palette.secondary.dark
                            : '#FFF'
                            )
                        }),
                        selectionProps: {color: 'primary'}
                    }}
                    actions={[
                    {
                        tooltip: 'Remove All Selected Donations',
                        icon: 'delete',
                        onClick: (evt, data) => this.handleMultipleRowDelete(evt,data)
                    },
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
                        <Typography onClick={this.goBack} variant="button"> Go Back </Typography>
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
           {this.state.tab === 0 ? this.renderUsers() : null}
           {this.state.tab === 1 ? this.renderItems() : null}
           {this.state.tab === 2 ? this.renderDisasters() : null}
           {this.state.tab === 3 ? this.renderRequests() : null}
           {this.state.tab === 4 ? this.renderDonations() : null}
        </ThemeProvider>
        );
    }
}

export default Admin;
