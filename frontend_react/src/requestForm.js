import React from 'react'
import Box from '@material-ui/core/Box'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import theme from './index.js'
import PlacesAutoComplete, {geocodeByAddress} from 'react-places-autocomplete'
import Checkbox from '@material-ui/core/Checkbox'
import authorize from './authorize'
import Paper from '@material-ui/core/Paper'
import AutoComplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'


const getToken = require('./authorize').getToken;

export default class DonateForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            requestedItems: {},
            AutocompleteOpen: false,
            loading: true,
        }

        this.handleRequest = this.handleRequest.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.addItem = this.addItem.bind(this);
        this.renderAutocomplete = this.renderAutocomplete.bind(this);
        this.handleAutocompleteOpen = this.handleAutocompleteOpen.bind(this);

    }

    async handleAutocompleteOpen(){
        this.setState({AutocompleteOpen: true})
    }

    async handleAutocompleteClose(){
        this.setState({AutocompleteOpen: false})
    }

    async handleRequest(){

    }

    async handleCancel(){
        this.props.onClose();
    }

    async addItem(item){

    }

    renderAutocomplete(){
        return(
            <Grid item xs={8}>
                <AutoComplete
                open={this.state.AutocompleteOpen}
                // onOpen={this.handleAutocompleteOpen()}
                // onClose={this.handleAutocompleteClose()}
                loading={this.state.loading}
                renderInput={(params) => (
                    <TextField {...params} 
                        fullWidth={true} 
                        label='Item Name' 
                        variant='outlined'
                        InputProps=
                        {{
                            ...params.InputProps,
                            endAdornment: (
                            <React.Fragment>
                              {params.loading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                            ),
                        }}
                    >
                    </TextField>
                )}
                >
                </AutoComplete>    
            </Grid>      
        );
        
    }

    async renderRow(item){
        return(
            <Grid key={item.item_id} item>
            <Box pt={1}>
            <Paper elevation={2} variant='outlined' id={item.item_id} >
            <Box px={2} py={1}>
                <Grid container 
                    direction="row"
                    // justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs={5}>
                    <Typography variant='h6'>
                        {item.name}
                    </Typography>   
                    </Grid>
                    <Grid item xs={4}>
                    <Typography variant='h6'>
                        {item.num_needed}
                    </Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Box height="75%">
                        <TextField
                            id={item.item_id.toString()}
                            variant="outlined"
                            autoComplete="off"
                            onChange={this.handleQuantityUpdate}
                        />
                        </Box>
                    </Grid>
                </Grid>
                </Box>
            </Paper>
            </Box>
            </Grid>
        );
    }

    render(){
        return (
            <ThemeProvider theme={theme}>
                    <Dialog 
                        open={this.props.open} 
                        onClose={this.props.onClose} 
                        scroll='paper'
                        fullWidth = {true}
                    >   
                        <Box pl={4} py={2}>
                            <Typography variant='h3' color="primary">
                                Request
                            </Typography>
                        </Box>          
                        <DialogContent dividers={true} scroll='paper'>
                            <Paper variant='outlined'>
                                <Box px={1} py={1}>
                                <Grid container 
                                    direction="row"
                                    //justify="space-between"
                                    alignItems="center"
                                    spacing={1}                   
                                >
                                    {this.renderAutocomplete()}
                                    <Grid item xs={2}>
                                    <TextField fullWidth={true} label='Quantity' variant='outlined'>
                                    </TextField>    
                                    </Grid>
                                    <Grid item xs={2}>
                                    <Button 
                                        onClick={this.addItem} 
                                        fullWidth={true} 
                                        color="primary" 
                                        variant='contained'
                                    >
                                        Add 
                                    </Button>
                                    </Grid>
                                </Grid>
                                </Box>
                            </Paper>
                            <Grid container
                                    direction="column"
                                    justify="center"
                                    alignItems="stretch"
                                >
                                {
                                    Object.keys(this.state.requestedItems).map(key => {
                                    let item = this.props.requestedItems[key];
                                        return this.renderRow(item)
                                    })
                                }
                            </Grid>   
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={this.handleCancel}>
                                Cancel
                            </Button>
                            <Button onClick={this.handleRequest} color="primary">
                                Request
                            </Button>
                        </DialogActions>
                    </Dialog>
            </ThemeProvider>
        )
    }

}
