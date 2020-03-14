//import dbApi from './dbApi'
var express = require('express');
const app = require('express')();
var server = require('http').Server(app);
var cors = require('cors');
jwt = require('jsonwebtoken');
require('dotenv').config()

app.use(express.json());
app.use(cors());

//initialize database connection  
DB = require('./DB');
database = new DB.DB('postgres', 'localhost', 'fse', 'password', 5432, require('bcrypt'));

//routes
var loginRequest = require('./routes/loginRequest');
app.use('/loginRequest', loginRequest)

var port = process.env.PORT || 5000;
server.listen(port,()=>{console.log('Listeing on Port %d', port)});
// WARNING: app.listen(80) will NOT work here!

module.exports.app = app;