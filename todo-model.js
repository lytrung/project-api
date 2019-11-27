var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// this will be our data base's data structure 
var TodoSchema = new Schema(
  {
    id: Number,
    content: String,
    priority: String,
    username: String
  },
  { 
  	timestamps: true
  }
)

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Todo', TodoSchema);