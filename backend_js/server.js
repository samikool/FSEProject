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

//initialize database connection  
DB = require('./DB');
database = new DB.DB('postgres', 'localhost', 'fse', 'password', 5432, require('bcrypt'));

var loginRequest = require('./routes/loginRequest');
app.use('/loginRequest', loginRequest)

var port = process.env.PORT || 5000;
server.listen(port,()=>{console.log('Listeing on Port %d', port)});
// WARNING: app.listen(80) will NOT work here!


module.exports.app = app;