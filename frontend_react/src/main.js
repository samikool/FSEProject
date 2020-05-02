import React from 'react';
import MainAppbar from './mainAppbar.js';
import SimpleMap from './map.js'
import authorize from './authorize';
import theme from './index';


export default class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      admin: false,
      donor: false,
      requester: false,

    }
  }



  async componentDidMount(){
    let authorization = await authorize();
    console.log(authorization);
    // console.log(authorization['access']);
    // console.log(authorization['email']);
    // console.log(authorization['admin']);
    this.setState({
      loggedIn: authorization['access'],
      user: authorization['email'],
      admin: authorization['admin'],
      donor: authorization['donor'],
      requester: authorization['requester'],
    });


    // disasterList.forEach(disaster => {
    //     let id = disaster.disaster_id;
    //     let items_needed = disaster.keywords.items_need;
    //     let type = disaster.keywords.type;
    //     let location = disaster.location;
    //     let name = disaster.name;



    // });
  }

  render(){
    return(
      <div style={{ height: '93vh', width: '100%'}}>
        <MainAppbar
          isLoggedIn={this.state.loggedIn}
          isAdmin = {this.state.admin}
          isDonor = {this.state.donor}
          isRequester = {this.state.requester}
        />
        <SimpleMap
          isLoggedIn={this.state.loggedIn}
          isAdmin = {this.state.admin}
          isDonor = {this.state.donor}
          isRequester = {this.state.requester}
        />
      </div>
    );
  }
}
