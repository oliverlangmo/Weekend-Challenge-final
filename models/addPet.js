var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var petSchema = new Schema({
  pet_name: String,
  pet_kind: String,
  pet_age: Number,
  pet_pic: String
});

var addpetToDB =mongoose.model('addPet', petSchema);
module.exports=addpetToDB;
