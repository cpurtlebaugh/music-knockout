var mongoose = require('mongoose');
var TrophySchema = new mongoose.Schema({
  type: String,
  img_url: String
});

var Trophy = mongoose.model('Trophy', TrophySchema);

module.exports = Trophy;
