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

const getToken = require('./authorize').getToken;


export default class DonateForm extends React.Component{
    constructor(props){
      super(props);
      this.state={
          donateMap: {},
          numUniqueItemsToDonate: 0,
          numItemsDonated: 0,
          numTotalItemsDonated: 0,
      };

      this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this);
      this.handleDonate = this.handleDonate.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.renderRow = this.renderRow.bind(this);
    }

    async handleQuantityUpdate(event){
        let tempDonateMap = this.state.donateMap;
        let item_id = event.target.id;
        let value = event.target.value;
        tempDonateMap[item_id] = {}
        tempDonateMap[item_id].value = value;
        tempDonateMap[item_id].donated = null;
        tempDonateMap[item_id].donating = false;
        await this.setState({donateMap: tempDonateMap})
    }

    async handleDonate(){
        //authorize to potentially refresh
        await authorize();
        //get token
        let token = await getToken();
        let tempMap = this.state.donateMap;
        this.setState({numUniqueItemsToDonate: Object.keys(tempMap).length});
        await Object.keys(tempMap).forEach(async (item_id,i) => {
            // console.log(key)
            // console.log(this.state.donateMap[key])
            console.log(item_id);
            tempMap[item_id].donating = true;
            await this.setState({donateMap: tempMap});

            console.log('sending fetch');
            let response = await fetch('http://localhost:5000/donate',{
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    token: token,
                    item_id:item_id,
                    disaster_id:this.props.disaster_id,
                    quantity:tempMap[item_id].value
                })
            });
            response = await response.json();
            console.log(response);


            tempMap[item_id].donating = false;
            tempMap[item_id].donated = response.success;

            await this.setState({donateMap: tempMap, });

            if(response.success){
                let tempNum = this.state.numItemsDonated;
                let tempTotal = this.state.numTotalItemsDonated;
                await this.setState(
                    {
                        numItemsDonated: tempNum + 1,
                        numTotalItemsDonated: +tempTotal + +response.donated
                    }
                )
            }

            if(this.state.numItemsDonated !== 0  && this.state.numItemsDonated === this.state.numUniqueItemsToDonate){
                this.props.onClose(this.state.numTotalItemsDonated);
                await this.setState({donateMap: {}, numUniqueItemsToDonate: 0, numItemsDonated: 0})
            }
        });
    }

    renderRow(item){
        //console.log(item)
        let rowColor = '';

        if(this.state.donateMap[item.item_id] != null){
            //intending to donate
            if(this.state.donateMap[item.item_id].value > 0){
                rowColor = 'secondary.dark'
            }

            //donation in progress
            if(this.state.donateMap[item.item_id].donating){
                rowColor = 'yellow'
            }

            //donation finished
            if(this.state.donateMap[item.item_id].donated != null){
                if(this.state.donateMap[item.item_id].donated){
                    rowColor = 'green'
                }else if(!this.state.donateMap[item.item_id].donated){
                    rowColor = 'red'
                }
            }


        } else{
            rowColor = 'secondary.light'
        }

        return(
            <Grid key={item.item_id} item>
            <Box pt={1}>
            <Paper elevation={2} variant='outlined' id={item.item_id} >
            <Box px={2} py={1} bgcolor={rowColor}>
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

    async handleCancel(){
        this.props.onClose(0);
        console.log('closing')
    }

    render(){
        return(
            <ThemeProvider theme={theme}>
                    <Dialog
                        open={this.props.open}
                        onClose={this.props.onClose}
                        scroll='paper'
                        fullWidth = {true}
                    >
                        <Box pl={4} py={2}>
                            <Typography variant='h3' color="primary">
                                Donate
                            </Typography>
                        </Box>
                        <DialogContent dividers={true} scroll='paper'>
                                <Paper variant='outlined'>
                                <Box px={2} py={1} bgcolor='secondary.light'>
                                <Grid container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                    <Typography color="primary" variant='h5'>
                                        Item Name
                                    </Typography>
                                    </Grid>
                                    <Grid item>
                                    <Typography color="primary" variant='h5'>
                                        Number Needed
                                    </Typography>
                                    </Grid>
                                    <Grid >
                                    <Typography color="primary" variant='h5'>
                                        Amount to Donate
                                    </Typography>
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
                                    Object.keys(this.props.items).map(key => {
                                    let item = this.props.items[key];
                                        return this.renderRow(item)
                                    })
                                }
                                </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={this.handleCancel}>
                                Cancel
                            </Button>
                            <Button onClick={this.handleDonate} color="primary">
                                Donate
                            </Button>
                        </DialogActions>
                    </Dialog>
            </ThemeProvider>
        );
    }
}
