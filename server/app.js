var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());

var mongoURI = "mongodb://localhost:27017/petdb";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

app.listen(8080, 'localhost', function(req, res){
console.log('server is listening');
});

app.get('/', function(req,res){
  res.sendFile(path.resolve('views/addPet.html'));
});
 app.use(express.static('public'));
