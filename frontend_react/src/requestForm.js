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


const getToken = require('./authorize').getToken;

export default class DonateForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <Box/>
    }

}
