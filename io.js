var serverIo = require('socket.io')();
var _ = require('underscore');
var api = require('./api');
var rp = require('request-promise');

var Game = function() {
  this.players = [];
  this.status = 'startRound';
  this.currentSong = {};
  this.wrongSongs = [];
  this.allSongs = [];
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
  var chosenArtist = api.randomArtist();

  // ...
  var chosenSong = api.getArtistTopTracks(chosenArtist);
  chosenSong.then(function(data) {
    chosenSong = JSON.parse(data).tracks;
    chosenSong = _.shuffle(chosenSong)[0];
    this.currentSong = chosenSong;
    serverIo.emit('playSong', currentSong);

    var relatedArtists = api.getRelatedArtists(chosenArtist).then(function(data) {
      JSON.parse(data);
      relatedArtists = api.sortRelatedArtists(JSON.parse(data).artists);
      var leftSide = relatedArtists.slice(0, Math.round(relatedArtists.length / 2));
      var topRelatedArtists = [];

      for (var i = 0; i < 4; i++) {
        topRelatedArtists.push(leftSide.pop(api.randomArtist(leftSide)));
      }

      var relatedSongs = [];

      for (var i = 0; i < 4; i++) {
        var topTracks = api.getArtistTopTracks(topRelatedArtists[i].id).then(function(data) {
          relatedSongs.push(JSON.parse(data).tracks[0]);
          // After 4 songs have been pushed, get ready to append the quiz form.

          if (relatedSongs.length === 4) {
            game.currentSong.artist = chosenSong.artists[0].name;
            game.currentSong.track = chosenSong.name;
            game.currentSong.preview = chosenSong.preview_url;

            relatedSongs.forEach(function(song) {
              game.wrongSongs.push(song);
            });

            game.allSongs = _.shuffle(relatedSongs.concat(chosenSong));

            serverIo.emit('playSong', game);
          }
        });
      }
    });
  });
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

serverIo.on('connection', function(s) {
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
