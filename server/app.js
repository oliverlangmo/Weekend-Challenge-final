var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({extended:false}); 

var addpetToDB = require('../models/addPet');
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
  res.sendFile(path.resolve('views/index.html'));
});
 app.use(express.static('public'));
 app.post('/addPet', function(req,res){
   console.log('hit post route with ' + req.body);
   var savePet= new addpetToDB ({
     pet_name: req.body.pet_name,
     pet_kind: req.body.pet_kind,
     pet_age: req.body.pet_age,
     pet_pic: req.body.pet_pic
   });
   savePet.save(function(err){
     if(err){
       console.log(err);
       res.sendStatus(500);
     }else{
       console.log('pet save complete');
       res.sendStatus(200);
     }
   });
 });
 app.get('/recvPet', function(req,res){
    console.log('hit the get route');
      addpetToDB.find()
      .then( function( data ){
        console.log(data);
        res.send( data );
      });
    });
