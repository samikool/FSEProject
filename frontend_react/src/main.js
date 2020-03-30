import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonAppBar from './appbar.js';
import SimpleMap from './map.js'
import authorize from './authorize';

const useStyles = makeStyles(theme => ({
	root: {
    flexGrow: 1,
	},
	paper: {
	  padding: theme.spacing(2),
	  textAlign: 'center',
	  color: theme.palette.text.secondary,
	},
}));

async function getDisasters(){
  let response = await fetch('http://localhost:5000/disasters',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify()
  })
}



export default class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {loggedIn: false, admin: false}
  }

  async componentDidMount(){
    let authorization = await authorize();
    console.log(authorization);
    console.log(authorization['access']);
    console.log(authorization['email']);
    console.log(authorization['admin']);
    this.setState({
      loggedIn: authorization['access'],
      user: authorization['email'],
      admin: authorization['admin']
    })
  }

  render(){
    return(
      <div style={{ height: '93vh', width: '100%'}}>
        <ButtonAppBar isLoggedIn={this.state.loggedIn} isAdmin = {this.state.admin} />
        <SimpleMap />
      </div>
    );
  }
}

// export default function Main(){
//   const classes = useStyles();
//   return(

//   );
// }




/*{ <div style={{height: "99vh", width: "99vw"}} className={classes.root}>
      <Grid container spacing={2} direction="column" alignItems="stretch">
        <Grid item xs={12}>
          <ButtonAppBar />
        </Grid>
      </Grid>
      <SimpleMap />

    </div> }*/
