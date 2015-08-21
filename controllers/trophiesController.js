var Trophy = require('../models/Trophy');
var User = require('../models/User');

function getTrophies(req, res, next) {
  var trophies = Trophy.find({}, function(err){
    if(err) res.json({message: 'Could not find any trophies'});
    res.render('trophies/index', {trophies: trophies});
  });
}
module.exports = {
  getTrophies: getTrophies
};
