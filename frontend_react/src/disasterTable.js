import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class DisasterTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {rows: [], classes: this.useStyles(), disasters: []};

    // use .then(), this is a promise
    this.useStyles()
  }

  async useStyles(){
    await this.setState({classes: makeStyles({
        table: {
          minWidth: 650,
        },
      })
    })
  }

  async componentDidMount(){
    await this.createData('Frozen yogurt', 159, 6.0, 24, 4.0);
    await this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3);
    await this.createData('Eclair', 262, 16.0, 24, 6.0);
    await this.createData('Cupcake', 305, 3.7, 67, 4.3);
    await this.createData('Gingerbread', 356, 16.0, 49, 3.9);

    let response = await fetch('http://localhost:5000/disasters', {
      method: 'GET',
      headers: { 'Authentication': window.sessionStorage.accessToken},
    });

    response = await response.json();
    response.forEach(disaster => {
      let id = disaster['disaster_id'];
      let name = disaster['name'];
      let type = disaster['keywords']['type'];
      let items = disaster['keywords']['items_need'];
      let city = disaster['location']['city'];
      let state = disaster['location']['state'];
      let country = disaster['location']['country'];

      this.setState(
        {disasters: [...this.state.disasters,{id, name, type, items, city, state, country}]}
      )
    });
  }

  async handleRowClick(id){
    console.log(id);
    let currentDisasters = this.state.disasters;
    console.log(currentDisasters);
    let index = -1;
    for (let i=0; i<currentDisasters.length; i++) {
      console.log('currentDisaster: ' + currentDisasters[i].id);
      console.log('id: ' + id);
      if(currentDisasters[i].id === id){
        index = i;
        break;
      }
    }

    if(index !== -1){
      console.log('index' + index);
      console.log('disaster' + currentDisasters[index]);
      currentDisasters.splice(index, 1)
    }

    console.log(currentDisasters);
    this.setState({disasters: currentDisasters})
  }



  async createData(name, calories, fat, carbs, protein){
    //console.log("creating data")
    //console.log(this.state.rows)
    this.setState(
      {rows: [...this.state.rows, {name, calories, fat, carbs, protein}]}
    );
    console.log(this.state.rows)
  }

  render(){
    return(
      <TableContainer component={Paper}>
        <Table className = {this.state.classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Type&nbsp;</TableCell>
              <TableCell align="right">Items&nbsp;</TableCell>
              <TableCell align="right">City&nbsp;</TableCell>
              <TableCell align="right">State&nbsp;</TableCell>
              <TableCell align="right">Country&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.disasters.map((row) => (
              <TableRow
                hover = {true}
                key={row.id}
                onClick = {() => this.handleRowClick(row.id)}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {row.type}
                </TableCell>
                <TableCell align="right">
                  {row.items}
                </TableCell>
                <TableCell align="right">
                  {row.city}</TableCell>
                <TableCell align="right">{row.state}
                </TableCell>
                <TableCell align="right">
                  {row.country}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
