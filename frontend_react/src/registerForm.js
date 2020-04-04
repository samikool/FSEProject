import React from 'react'
import Box from '@material-ui/core/Box'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'

import Grid from '@material-ui/core/Grid'
import theme from './index.js'

export default class RegisterForm extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <ThemeProvider theme={theme}>
            <Box height={'100%'} width={'100%'}> 
                <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Register</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        We just need some basic information before you start saving the world
                    </DialogContentText>
                        <Grid container spacing={1}>
                            <FormControl>
                            
                            </FormControl>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.onClose} color="primary">
                        Register
                    </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            </ThemeProvider>
        );
    }
}