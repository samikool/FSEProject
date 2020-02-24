import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

class Clock extends React.Component{
  constructor(props){
    super(props)
    this.state = {date: new Date()}
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(), 
      1000
      )
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({
      date: new Date()
    });
  }

  render(){
    return(
      <h4>{this.state.date.toLocaleTimeString()}</h4>
    );
  }
}

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {username: '', password: ''}

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
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="uname">Username:</label>
          <input 
            type="text" 
            id="uname" 
            value={this.state.username} 
            name="username" 
            onChange={this.handleChange}/>
          <br />
          <label htmlFor="pass">Password:</label>
          <input 
            type="password" 
            id="pass" 
            value={this.state.password} 
            name="password"
            onChange={this.handleChange}/>
          <br />
          <input
            type="submit" 
            value="Submit">
          </input>
        </form>
      </div>
    );
  }
}



ReactDOM.render(
  <div>
    <h4>Welcome</h4>
    <Clock/>
    <Login/>
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
