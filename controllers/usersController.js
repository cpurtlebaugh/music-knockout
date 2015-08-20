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
  var user = new User(reqbody.user);
  User.save(function(err){
    if (err) res.json({message: 'Could not create user b/c:' + err});
  });
  res.redirect('/');
}

function showUser(req, res, next) {
  var user = User.findById({_id: req.params.id}, function(err, user){
    if(err) res.json({message: 'Could not find that user b/c:' + err});
    res.render('./users/show', {user: req.user.id});
  });
}

function editUser(req, res) {
 // Edit view still needs to display all candies...
 User.find(function(err, users) {
   if(err) res.json({message: 'Could not find user b/c:' + err});
   User.findById(req.params.id, function(err, user) {
     if(err) res.json({message: 'Could not find user b/c:' + err});
     res.render('users/edit', {user: user});
   });
 });
}

function updateUser(req, res) {

       // use our bear model to find the bear we want
       user.findById(req.params.bear_id, function(err, bear) {

           if (err)
               res.send(err);

           user.first_name = req.body.first_name;  // update the bears info

           // save the bear
           user.save(function(err) {
               if (err)
                   res.send(err);

               res.json({ message: 'Bear updated!' });
           });

       });
   }

function deleteUser(req, res, next) {
  User.findByIdAndRemove(req.params.id, function(err){
    if (err) res.json({message: 'Could not find that user b/c' + err})
      res.redirect('/')
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
}
