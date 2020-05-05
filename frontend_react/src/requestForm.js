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
import theme from './theme.js'
import PlacesAutoComplete, {geocodeByAddress} from 'react-places-autocomplete'
import Checkbox from '@material-ui/core/Checkbox'
import authorize from './authorize'
import Paper from '@material-ui/core/Paper'
import AutoComplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import IconButton from '@material-ui/core/IconButton'
import SelectInput from '@material-ui/core/Select/SelectInput'


const getToken = require('./authorize').getToken;

export default class DonateForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            requestedItems: {},
            autocompleteOpen: false,
            loading: false,
            autocompleteItems: [],
            quantity: '',
            newItem: false,
            autocompleteValue: '',
            categoryValue: '',
        };

        this.handleRequest = this.handleRequest.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.addItem = this.addItem.bind(this);
        this.renderAutocomplete = this.renderAutocomplete.bind(this);
        this.handleAutocompleteOpen = this.handleAutocompleteOpen.bind(this);
        this.handleAutocompleteClose = this.handleAutocompleteClose.bind(this);
        this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
        this.loadItems = this.loadItems.bind(this);
        this.renderItemInfoInput = this.renderItemInfoInput.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this);
    }

    async handleAutocompleteOpen(){
        this.setState({autocompleteOpen: true})
    }

    async handleAutocompleteClose(){
        this.setState({autocompleteOpen: false})
    }

    async handleAutocompleteChange(event, value){
        let newItem = true;
        let item = {};
        this.setState({autocompleteValue: value});

        for(let i=0; i<this.state.autocompleteItems.length; i++){
            let currItem = this.state.autocompleteItems[i];
            if(currItem.name === value){
                newItem = false;
                item=currItem;
                break
            }
        }
        if(newItem){
            await this.setState({newItem: true});
        } else{
            await this.setState({newItem: false});
        }
    }

    async handleCategoryChange(event, value){
        this.setState({categoryValue: value})
    }

    async handleQuantityUpdate(event){
        const re=/^[0-9\b]+$/
        if(!(event.target.value === '' || re.test(event.target.value))){
            event.target.value = 0;
        }
        await this.setState({quantity: event.target.value})
    }

    async handleRequest(){
        await authorize();
        let token = await getToken();

        let response = await fetch('http://localhost:5000/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requestedItems: this.state.requestedItems,
                disaster_id: this.props.disaster_id,
                token: token,
            }),
        });
        response = await response.json();
        console.log(response);
        this.setState({requestedItems: {}});
        this.props.onClose(response.num_requested);
    }

    async handleCancel(){
        this.props.onClose(0);
    }

    async addItem(){
        let item;
        if(this.state.newItem){

            let res = await fetch('http://localhost:5000/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(
                    {
                      name: this.state.autocompleteValue,
                      category: this.state.categoryValue
                    }),
                });
            await this.setState({newItem: false});
            item = await res.json();
        } else{
            Object.keys(this.state.autocompleteItems).forEach((key) =>{
                if(this.state.autocompleteItems[key].name === this.state.autocompleteValue){
                    item = this.state.autocompleteItems[key]
                }
            })
        }

        //add quantity

        // console.log(item)


        //if item is not there add it
        let tempList = this.state.requestedItems;
        if(!tempList[item.item_id]){
            console.log('=')
            tempList[item.item_id] = item;                                                                                                                                                                                                                                               
            tempList[item.item_id].quantity = +this.state.quantity;
        }
        //else update quantity
        else{
            console.log('+=')
            tempList[item.item_id].quantity += +this.state.quantity;
        }
        await this.setState({
            requestedItems: tempList,
            quantity: '',
            categoryValue: '',
            autocompleteValue: '',
        })
        //reset state
        // console.log(this.state.requestedItems)
    }

    async removeItem(item_id){
        let tempList = this.state.requestedItems;
        delete tempList[item_id];
        await this.setState({requestedItems: tempList})
    }

    sleep(delay = 0){
        return new Promise((resolve) =>{
            setTimeout(resolve, delay);
        })
    }


    async loadItems(){
        console.log('loading');
        await this.setState({
            loading: true,
            autocompleteOpen: true
        });
        if(this.state.loading){
            let response = await fetch('http://localhost:5000/items');
            //sleep for just a bit so they can see the progress circle ;)
            await this.sleep(350);
            let items = await response.json();
            await this.setState({
                autocompleteItems: items
            });
            console.log('done loading');
        }
        await this.setState({loading: false});
    }

    renderItemInfoInput(){
        if(this.state.newItem){
            return(
                <Box>
                <Box px={1} py={1}>
                    <Typography variant='body1'>
                        You are requesting an item we don't have in our database. Please fill out some info to help us expand the items people can request!
                    </Typography>
                </Box>
                <Paper variant='outlined'>
                <Box px={1} py={1}>
                    <AutoComplete
                        options={['Food','Cleaning','Material','Equipment','Supplies']}
                        getOptionLabel={(option) => option}
                        autoSelect={true}
                        autoHighlight={true}
                        onInputChange={this.handleCategoryChange}
                        openOnFocus={true}
                        defaultValue={'Food'}
                        disableClearable={true}
                        renderInput={(params) =>
                            <TextField {...params} label='Category' variant='outlined'/>
                        }
                    />
                    <Box />
                </Box>
                </Paper>
                </Box>
            )
        }else{
            return null;
        }

    }

    renderAutocomplete(){
        return(
            <Grid item xs={8}>
                <AutoComplete
                open={this.state.autocompleteOpen}
                onOpen={this.loadItems}
                onClose={this.handleAutocompleteClose}
                getOptionLabel={(option) => option.name?option.name:option}
                options={this.state.autocompleteItems}
                loading={this.state.loading}
                openOnFocus={true}
                freeSolo
                disableClearable
                onInputChange={this.handleAutocompleteChange}
                autoComplete={true}
                inputValue={this.state.autocompleteValue}
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
                            {
                                this.state.loading
                                ? <CircularProgress color="inherit" size={20} />
                                : null
                            }
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

    renderRow(item){
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
                    <Grid item xs={6}>
                    <Typography variant='h6'>
                        {item.name}
                    </Typography>
                    </Grid>
                    <Grid item xs={5}>
                    <Typography variant='h6'>
                        Amt: {item.quantity}
                    </Typography>
                    </Grid>
                    <Grid item  xs={1}>
                        <IconButton
                            onClick={() => this.removeItem(item.item_id)}
                            color='primary'
                            label={item.item_id}
                        >
                            <RemoveCircle   />
                        </IconButton>
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
                                    <TextField
                                        fullWidth={true}
                                        label='Quantity'
                                        variant='outlined'
                                        onChange={this.handleQuantityUpdate}
                                        value={this.state.quantity}
                                    >
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
                            <Grid>
                                {this.renderItemInfoInput()}
                                <Grid item xs={4}>
                                    <Box>

                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container
                                    direction="column"
                                    justify="center"
                                    alignItems="stretch"
                                >
                                {
                                    Object.keys(this.state.requestedItems).map(key => {
                                    let item = this.state.requestedItems[key];
                                        return this.renderRow(item)
                                    })
                                }
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={this.props.onClose}>
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
