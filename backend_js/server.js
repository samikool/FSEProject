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

var port = process.env.PORT || 5000;
server.listen(port,()=>{console.log('Listening on Port %d', port)});
// WARNING: app.listen(80) will NOT work here!

module.exports.app = app;
