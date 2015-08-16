var User = require('../models/User');

function getAll(req, res, next) {
  var users = User.find({});
  if(err) res.json({message: 'Could not find any useres'});
  res.render('/users', {users: users});
}

function newUser(req, res, next) {
  res.render('../views/users/new');
}

function createUser(req, res, next) {
  var user = new User(reqbody.user);
  User.save(function(err){
    if (err) res.json({message: 'Could not create user b/c:' + err});
  });
  res.redirect('/');
}

function showUser(req, res, next) {
  var user = User.findByid({_id: req.params.id}, function(err, user){
    if(err) res.json({message: 'Could not find that user b/c:' + err});
    res.render('/users/show', {title: user.name, user: user});
  });
}

function editUser(req, res, next) {
  User.findById({_id: req.params.id}, function(err, user) {
    if (err) res.json({message: 'Could not find that user b/c' + err});

    if (req.body.first_name) user.first_name = req.body.first_name;
    if (req.body.first_name) user.last_name = req.body.last_name;
    if (req.body.first_name) user.email = req.body.email;
    if (req.body.first_name) user.password = req.body.password;

    user.save(function(err){
      if (err) res.json({message: 'Could not update your user profile b/c' + err});
      res.json({message: 'Succesfully updated your user profile.'});
    });
  });
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
  User.findByIdAndRemove(req.params.id, function(err){
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
