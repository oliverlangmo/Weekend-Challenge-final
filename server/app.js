var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());
var cors = require('cors');
var urlencodedParser = bodyParser.urlencoded({extended:false});
//schema for addPet
var addpetToDB = require('../models/addPet');
//connect to mongoDB
var mongoURI = "mongodb://localhost:27017/petdb";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;



db.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

db.once('open', function () {
  console.log('mongodb connection open!');
});
//set server
app.listen(8080, 'localhost', function(req, res){
console.log('server is listening');
});
// base url
app.get('/', function(req,res){
  res.sendFile(path.resolve('views/index.html'));
});
//set static folder
app.use(express.static('public'));

//add pet to DB
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
 //get pets from DB
 app.get('/recvPet', function(req,res){
    console.log('hit the get route');
      addpetToDB.find()
      .then( function( data ){
        console.log(data);
        res.send( data );
      });
    });

  app.delete('/deletePet', function (req, res){

  console.log('delete route w:', req.body);

      addpetToDB.findOne({_id: req.body.id}, function(err, userResult) {
        if(err){
          console.log(err);
          res.sendStatus(500);
        }else{
          addpetToDB.deleteOne({_id: userResult._id}, function(err) {});
          res.sendStatus(200);
        }
      });
    });// end delete
    app.put('/updatePet', function(req,res){
    console.log('update route with:', req.body);
    var query = {_id: req.body.id};
addpetToDB.replaceOne(query, {pet_name: req.body.pet_name, pet_kind: req.body.pet_kind, pet_age: req.body.pet_age, pet_pic: req.body.pet_pic}, function(err){
 });
});
