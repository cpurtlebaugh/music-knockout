var serverIo = require('socket.io')();
var _ = require('underscore');
var api = require('./api');
var rp = require('request-promise');

var Game = function() {
  this.players = [];
  this.status = 'startRound';
  this.currentSong = {};
  this.wrongSongs = [];
  this.songList = [];
};

Game.prototype.startRound = function() {
  this.status = 'startRound';
  var songs;
  api.getGameQuestion(function(getGameQuestion){
    songs = getGameQuestion;
  });

  console.log(songs);

  // emit a socket io event
  serverIo.emit('startRound', songs);
  console.log('startRound');

  setTimeout(this.playSong.bind(this), 2000);
};

Game.prototype.playSong = function() {
  this.status = 'playSong';
  console.log('playSong');
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
  console.log('endRound');
  setTimeout(this.startRound.bind(this), 2000);
};

var game = new Game(),
    socket;

serverIo.on('connection', function(socket) {

// serves initial game
  api.getGameQuestion(function(getGameQuestion){
    serverIo.emit('startRound', getGameQuestion);
  });

// ends the rounds
  socket.on('endRound', function(data){
    serverIo.emit('endRound', data);
  });

serverIo.on('endRound', function(){
  api.getGameQuestion(function(getGameQuestion){
    serverIo.emit('startRound', getGameQuestion);
  });
});

  socket.emit('user-connected', api.getGameQuestion);



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
