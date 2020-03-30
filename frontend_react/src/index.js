import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  useHistory 
} from "react-router-dom";

import Login from "./login";
import Main from "./main";
import DisasterTable from "./disasterTable";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/disasters" component={DisasterTable} />
      <Route path="/" component={Main}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
