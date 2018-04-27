var mongoose = require('mongoose');


// SCHEMA SETUP
var coffeeshopSchema = new mongoose.Schema({
  name: String, 
  image: String,
  description: String, 
  location: String, 
  lat: Number,
  lng: Number,
  author: {
    id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Comment"
    }
  ]
});

var Coffeeshop = mongoose.model("Coffeeshop", coffeeshopSchema);

module.exports = Coffeeshop; 