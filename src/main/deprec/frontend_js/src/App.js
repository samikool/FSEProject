import React from 'react';
import logo from './logo.svg';
import Button from '@material-ui/core/Button'
import Table from './components/SimpleTable'
import Users from './components/users/Users.js'
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Users></Users>
        <Button color="primary" onClick={() => { console.log('onClick'); }}>
          Send "Hello"
        </Button>
      </header>
    </div>
  );
}

export default App;
