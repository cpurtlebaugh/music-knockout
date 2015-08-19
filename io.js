var serverIo = require('socket.io')();

var Game = require('./models/Game');

serverIo.on('connection', function (socket) {

  // When client's connect
  console.log('Client connected to socket.io!');
  Game.getState(function(err, game) {
    serverIo.emit('user-connected', game);
  });

  // When start game
  // socket.on('start-game', function(){
  //   io.emit('start-game');
  // });


});

module.exports = serverIo;
