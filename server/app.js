var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.listen(8080, 'localhost', function(req, res){
console.log('server is listening');
});

app.get('/', function(req,res){
  res.sendFile(path.resolve('views/index.html'));
});
 app.use(express.static('public'));
