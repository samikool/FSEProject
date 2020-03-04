//import dbApi from './dbApi'
var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var cors = require('cors');
var cookieParser = require('cookie-parser');
var path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fse',
  password: 'password',
  port: 5432,
})

// pool.query('SELECT * FROM USERS', (err, res) => {
//   console.log(err, res.rows[0])
//   pool.end()
// })

var port = process.env.PORT || 5000;
server.listen(port,()=>{console.log('Listening on Port %d', port)});
// WARNING: app.listen(80) will NOT work here!

//login post request
app.post('/api/loginRequest', function (req, res) {

  var email = req.body['username'];
  var pw = req.body['password'];
  var query_str = `SELECT PASSWORD FROM USERS where email='${email}'`;
  console.log(query_str);
  //promise
  pool
    .query(query_str)
    .then(dump => {
      var golden_pw = dump.rows[0].password;
      if(pw==golden_pw){
        res.send("Access Granted... In theory");
      }
      else{
        if(dump != null){
          res.send("Error: Password does not match");
        }
        
      }
    }
    )
    .catch(e => {
      //console.error(e.stack);
      res.send("Error: Email does not exist");
    })
});

