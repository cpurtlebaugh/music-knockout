var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({

});

var User = mongoose.model('User', UserSchema);

module.exports = User;
