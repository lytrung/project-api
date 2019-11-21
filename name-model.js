var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// this will be our data base's data structure 
var NameSchema = new Schema(
  {
    id: Number,
    name: String,
    location: String
  },
  { 
  	timestamps: true
  }
);


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Name', NameSchema);