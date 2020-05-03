//import dbApi from './dbApi'
var express = require('express');
const app = require('express')();
var server = require('http').Server(app);
var cors = require('cors');
jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());
app.use(cors());

//initialize database connection
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'first_aid',
  password: 'password',
  port: 5432,
});

const DB = require('./db_management/dbApi');
database = new DB(pool);

// database = new DB.DB();

//routes
var loginRequest = require('./routes/loginRequest');
app.use('/loginRequest', loginRequest);

var authorize = require('./routes/authorize');
app.use('/authorize', authorize);

var disaster = require('./routes/disaster');
app.use('/disaster', disaster);

var disasterItems = require('./routes/disasterItems');
app.use('/disasterItems', disasterItems);

var register = require('./routes/register');
app.use('/register', register);

var donate = require('./routes/donate');
app.use('/donate', donate);

var userInfo = require('./routes/userInfo');
app.use('/userInfo', userInfo);

var items = require('./routes/items');
app.use('/items', items);

var requests = require('./routes/requests');
app.use('/requests', requests);

var admin = require('./routes/admin');
app.use('/admin', admin);

var port = process.env.PORT || 5000;
server.listen(port,()=>{console.log('Listening on Port %d', port)});
// WARNING: app.listen(80) will NOT work here!

module.exports.app = app;
