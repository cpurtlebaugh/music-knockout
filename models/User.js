var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var User = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  wins: Number,
  image_url: String
  // trophies: [Trophies]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
