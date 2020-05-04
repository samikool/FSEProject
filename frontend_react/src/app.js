import React from 'react';
import './index.css';
import Main from "./main";
import DisasterTable from "./disasterTable";
import Admin from "./admin";
import {
    Route,
    BrowserRouter as Router,
    Switch,
  } from "react-router-dom";

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/disasters" component={DisasterTable}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/" component={Main}/>
    </Switch>
  </Router>
  );
}

export default App;