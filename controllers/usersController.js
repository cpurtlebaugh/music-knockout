var User = require('../models/User');

function getAll(req, res, err) {

}

function newUser(req, res, err) {
  response.render('../views/users/new');
}

function createUser(req, res, err) {
  var user = new User(request.body.user);
  User.save(function(error){
    if (error) response.json({message: 'Could not create user b/c:' + error});
  });
  response.redirect('/');
}

function showUser(req, res, err) {
  var user = User.findByid({_id: req.params.id}, function(error, user){
    if(error) response.json({message: 'Could not find that user b/c:' + error});
    response.render('/users/:id', {user: user});
  });
}

function editUser(req, res, err) {

}

function updateUser(req, res, err) {

}

function removeUser(req, res, err) {

}



module.exports = {
  getAll:     getAll,
  newUser:    newUser,
  createUser: createUser,
  showUser:   showUser,
  editUser:   editUser,
  updateUser: updateUser,
  removeUser: removeUser
}
