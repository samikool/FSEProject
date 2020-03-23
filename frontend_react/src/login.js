import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { Button, ButtonGroup, InputGroup, FormControl } from 'react-bootstrap';
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  useHistory 
} from "react-router-dom";

import Clock from "./clock"

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {username: '', password: '', resp: '', token: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const{name, value} = event.target;
    console.log("Variable Name: " + name + " " + "Value: " + value);
    this.setState({[name]: value});
  }

  handleSubmit(event){
    event.preventDefault();
    console.log("Submitted: Username: '" + this.state.username + "' Password: '" + this.state.password + "'");
    fetch('http://localhost:5000/loginRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username: this.state.username, password: this.state.password}),
    })
    .then(res => res.text())
    .then(res => {
      this.setState({resp: res});
      console.log(res);
    });

    //this changes us to the main route which is defiend in the index
    this.props.history.push('/main');
  }

  render(){
    return(
    <div style={{'padding':10}}>
     <h4>Welcome</h4>
     <Clock/>
      <div style={{ padding: 100 }}>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="uname">Email Address:</label>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Email Address"
              aria-label="Email Address"
              aria-describedby="basic-addon2"
              id="uname"
              value={this.state.username}
              name="username"
              onChange={this.handleChange}
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <label htmlFor="pass">Password:</label>
            <InputGroup className="mb-3">
            <FormControl
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon2"
              id="pass"
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
            />
          </InputGroup>
          <ButtonGroup>
          <Button
            variant="secondary"
            type="submit" 
            value="Submit">
              Login
          </Button>
          <Button
            variant="secondary"
            type="register" 
            value="register">
              Register
          </Button>
          </ButtonGroup>
        </form>
        <h4>{this.state.resp}</h4>
      </div>
    </div>
    );
  }
}

export default Login;