var serverIo = require('socket.io')();

var Game = require('./models/Game');
var gameState; // an instance of the game

serverIo.on('connection', function (socket) {

  // When client's connect
  console.log('Client connected to socket.io!');
  Game.create({players: [], gameState: {startRound: true}}, function(err, game) {
    // gameState = games.first;
    serverIo.emit('user-connected', game);
  });

  // When start game
  // socket.on('start-game', function(){
  //   io.emit('start-game');
  // });


});

module.exports = serverIo;
