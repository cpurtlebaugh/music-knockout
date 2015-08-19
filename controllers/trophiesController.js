var Trophy = require('../models/Trophy');
var User = require('../models/User');

function getTrophies(req, res, next) {
  var trophies = Trophies.find({}, function(err){
    if(err) res.json({message: 'Could not find any trophies'});
    res.render('/users/:id/trophies', {trophies: trophies});
  });
}
module.exports = {
  getTrophies: getTrophies
}
