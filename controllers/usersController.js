var User = require('../models/User');

function getAll(req, res, next) {
  var users = User.find({});
  if(error) response.json({message: 'Could not find any useres'});
  response.render('/users', {users: users});
}

function newUser(req, res, next) {
  response.render('../views/users/new');
}

function createUser(req, res, next) {
  var user = new User(request.body.user);
  User.save(function(error){
    if (error) response.json({message: 'Could not create user b/c:' + error});
  });
  response.redirect('/');
}

function showUser(req, res, next) {
  var user = User.findByid({_id: req.params.id}, function(error, user){
    if(error) response.json({message: 'Could not find that user b/c:' + error});
    response.render('/users/show', {title: user.name, user: user});
  });
}

function editUser(req, res, next) {

}

function updateUser(req, res, next) {
  User.update({_id: req.params.id}, {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    wins: req.body.wins,
    trophies: req.body.trophies
  }, function(err) {
      if (err) res.json({message: 'Could not find that user b/c ' + err})
      res.redirect('/users');
  })
}

function deleteUser(req, res, next) {
  User.findByIdAndRemove(requests.params.id, function(err){
    if (err) res.json({message: 'Could not find that user b/c' + err})
      res.redirect('/users')
  });
}



module.exports = {
  getAll:     getAll,
  newUser:    newUser,
  createUser: createUser,
  showUser:   showUser,
  editUser:   editUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}
