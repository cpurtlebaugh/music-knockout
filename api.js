// var Game = require('./models/Game');
// var test = new Game();
// var request = require('request');
// var Game = require('./models/Game');
// var game = new Game();

var rp = require('request-promise');
var _  = require('underscore');
var Game = require('./models/Game');

var game = new Game();
var api = game;

// -------------------------------------------------------------------------//
//                             FUNCTION DEFINITIONS                         //

// For now, we will have a prechosen list of artists to use.
artists = [
  "6S2OmqARrzebs0tKUEyXyp", "3TVXtAsR1Inumwj472S9r4", "6DIS6PRrLS3wbnZsf7vYic",
  "6eUKZXaKkcviH0Ku9w2n3V", "4NHQUGzhtTLFvgF5SZesLK", "04gDigrS5kc9YWfZHwBETP",
  "0C8ZW7ezQVs4URX5aX7Kqx", "07YZf4WDAMNwqr4jfgOZ8y", "6PXS4YHDkKvl1wkIl4V8DL",
  "738wLrAtLtCtFOLvQBXOXp", "5pKCCKE2ajJHZ9KAiaK11H", "5Rl15oVamLq7FbSb0NNBNy",
  "5Rl15oVamLq7FbSb0NNBNy", "2iojnBLj0qIMiKPvVhLnsH", "6nS5roXSAGhTGr34W6n7Et"
];

// Grabs a random artist from the array of pre-selected artists.
randomArtist = function() {
  return artists[Math.floor(Math.random() * artists.length)];
};

// Given an artist, this returns a list of related artists to use as other
// multiplice choice answer for each quiz question.
getRelatedArtists = function(artist) {
  return rp("https://api.spotify.com/v1/artists/" + artist + "/related-artists");
};

// Sorts the array of related artists by popularity, descending.
sortRelatedArtists = function(relatedArtistsArray) {
  return relatedArtistsArray.sort(function(a, b) {
    return b.popularity - a.popularity;
  });
};

// Grab the top 2 songs from the top 5 most popular related artists and put them
// in an array.
getArtistTopTracks = function(artistId) {
  return rp("https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?country=US");
};


// API Call Code:

var apiCall = function() {
  var chosenArtist = randomArtist();
  var chosenSong = getArtistTopTracks(chosenArtist);
  chosenSong.then(function(data) {
    chosenSong = JSON.parse(data).tracks;
    chosenSong = _.shuffle(chosenSong)[0];
    this.currentSong = chosenSong;
    console.log(currentSong);

    var relatedArtists = getRelatedArtists(chosenArtist).then(function(data) {
      JSON.parse(data);
      relatedArtists = sortRelatedArtists(JSON.parse(data).artists);
      var leftSide = relatedArtists.slice(0, Math.round(relatedArtists.length / 2));
      var topRelatedArtists = [];

      for (var i = 0; i < 4; i++) {
        topRelatedArtists.push(leftSide.pop(randomArtist(leftSide)));
      }

      var relatedSongs = [];

      for (var i = 0; i < 4; i++) {
        var topTracks = getArtistTopTracks(topRelatedArtists[i].id).then(function(data) {
          relatedSongs.push(JSON.parse(data).tracks[0]);
          // After 4 songs have been pushed, get ready to append the quiz form.

          if (relatedSongs.length === 4) {
            game.currentSong.artist = chosenSong.artists[0].name;
            game.currentSong.track = chosenSong.name;
            game.currentSong.preview = chosenSong.preview_url;

            relatedSongs.forEach(function(song) {
              game.wrongSongs.push(song);
            });

            game.songList = _.shuffle(relatedSongs.concat(chosenSong));
            game.songList = game.songList.map(function(song){
              return [song.name, song.artists[0].name];
            });

            console.log(game);

            api.game = game;

            // serverIo.emit('playSong', game);
          }
        });
      }
    });
  });
}

// Calls the API call function and exports the data returned in the game property of the `api` object.
apiCall();

module.exports = api;
