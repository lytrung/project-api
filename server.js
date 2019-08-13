const mongoose = require("mongoose");
var express = require('express');
var bodyParser = require('body-parser');
const logger = require('morgan');
var cors = require('cors');

// const Staff = require("./staff-model");

const apiPort = 3001;


const connectionString = 'mongodb://demo2admin:demo2password@cluster0-shard-00-00-1fbjw.mongodb.net:27017,cluster0-shard-00-01-1fbjw.mongodb.net:27017,cluster0-shard-00-02-1fbjw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connectionString,{ useNewUrlParser: true });
var  db = mongoose.connection;
db.once('open', () => console.log('Database connected'));
db.on('error', () => console.log('Database error'));


var app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'));