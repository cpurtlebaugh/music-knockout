var serverIo = require('socket.io')();
var api      = require('./api');

var Game = function() {
  this.players     = [];
  this.status      = 'startRound';
  this.currentSong = {};
  this.wrongSongs  = [];
};

Game.prototype.startRound = function() {
  this.status = 'startRound';

  // emit a socket io event
  serverIo.emit('startRound');
  console.log('startRound');

  setTimeout(this.playSong.bind(this), 2000);
};

Game.prototype.playSong = function() {
  this.status = 'playSong';

  // get the song
  var artist = api.randomArtist();
  // ...
  var song = "hello dolly";

  // emit a socket io event
  serverIo.emit('playSong', song);
  console.log('playSong',   song);

  setTimeout(this.multiChoice.bind(this), 2000);
};

Game.prototype.multiChoice = function() {
  this.status = 'multiChoice';
  // emit a socket io event
  console.log('multiChoice');
  // setTimeout(this.pickAChoice.bind(this), 2000);
};

Game.prototype.pickAChoice = function() {
  this.status = 'pickAChoice';
  // emit a socket io event
  console.log('pickAChoice');
  setTimeout(this.scoring.bind(this), 2000);
};

Game.prototype.scoring = function() {
  this.status = 'scoring';
  // emit a socket io event
  console.log('scoring');
  setTimeout(this.endRound.bind(this), 2000);
};

Game.prototype.endRound = function() {
  this.status = 'endRound';
  // emit a socket io event
  console.log('endRound');
  setTimeout(this.startRound.bind(this), 2000);
};

var game = new Game(),
    socket;

game.startRound();

serverIo.on('connection', function (s) {
  socket = s;

  serverIo.emit('user-connected', game);

  // When client's connect
  console.log('Client connected to socket.io!');

  // Game.getState(function(err, game) {

  // });

  // When start game
  // socket.on('start-game', function(){
  //   io.emit('start-game');
  // });


});

module.exports = serverIo;
