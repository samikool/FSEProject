import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

class Main extends React.Component{
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
            <div style={{padding:10}}>
                <h4>{this.state.date.toLocaleTimeString()}</h4>
            </div>
        );
    }
  }

export default Main;