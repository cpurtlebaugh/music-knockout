var User = require('../models/User');

function getAll(req, res, next) {
  var users = User.find({}, function(err){
    if(err) res.json({message: 'Could not find any useres'});
    res.render('/users', {users: users});
  });
}

function newUser(req, res, next) {
  // res.render('../views/users/new');
  res.send("hello");
}

function mainGame(req, res) {
  // Is this where we trigger the startGame() function ?????? By importing the io.js into here.
  res.render('game/game');
}

function createUser(req, res, next) {
  var user = new User(req.body.user);
  User.save(function(err){
    if (err) res.json({message: 'Could not create user b/c:' + err});
  });
  res.redirect('/');
}

function showUser(req, res, next) {
  User.findById({_id: req.params.id}, function(err, user){
    if(err) res.json({message: 'Could not find that user b/c:' + err});
    res.render('users/show', {user: req.user});
  });
}

function editUser(req, res) {
 User.find(function(err, users) {
   if(err) res.json({message: 'Could not find user b/c:' + err});
   User.findById(req.params.id, function(err, user) {
     if(err) res.json({message: 'Could not find user b/c:' + err});
     res.render('users/edit', {user: req.user});
   });
 });
}


function updateUser(req, res, next) {
  var id = req.params.id;

  User.findById({_id: id}, function(error, user) {
    if (error) res.json({message: 'Could not find user because ' + error});

    if (req.body.first_name) user.first_name = req.body.first_name;
    if (req.body.last_name) user.last_name = req.body.last_name;
    if (req.body.age) user.age = req.body.age;
    if (req.body.image_url) user.image_url = req.body.image_url;

    user.save(function(error) {
      if (error) res.json({message: 'user successfully updated'});
      res.redirect('/users/' + id);
    });
  });
}


function deleteUser(req, res, next) {
  User.findByIdAndRemove(req.params.id, function(err){
    if (err) res.json({message: 'Could not find that user b/c' + err});
      res.redirect('/');
  });
}

module.exports = {
  getAll:     getAll,
  newUser:    newUser,
  createUser: createUser,
  showUser:   showUser,
  editUser:   editUser,
  mainGame:   mainGame,
  updateUser: updateUser,
  deleteUser: deleteUser
};
