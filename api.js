var Game = require('./models/Game');
var test = new Game();
var rp = require('request-promise');
var request = require('request');
var _ = require('underscore');
var Game = require('./models/Game');


  // -------------------------------------------------------------------------//
  //                             FUNCTION DEFINITIONS                         //

  // For now, we will have a prechosen list of artists to use.
  var artists = [
    "6S2OmqARrzebs0tKUEyXyp", "3TVXtAsR1Inumwj472S9r4", "6DIS6PRrLS3wbnZsf7vYic",
    "6eUKZXaKkcviH0Ku9w2n3V", "4NHQUGzhtTLFvgF5SZesLK", "04gDigrS5kc9YWfZHwBETP",
    "0C8ZW7ezQVs4URX5aX7Kqx", "07YZf4WDAMNwqr4jfgOZ8y", "6PXS4YHDkKvl1wkIl4V8DL",
    "738wLrAtLtCtFOLvQBXOXp", "5pKCCKE2ajJHZ9KAiaK11H", "5Rl15oVamLq7FbSb0NNBNy",
    "5Rl15oVamLq7FbSb0NNBNy", "2iojnBLj0qIMiKPvVhLnsH", "6nS5roXSAGhTGr34W6n7Et"
  ]

  // Grabs a random artist from the array of pre-selected artists.
  function randomArtist(artists) {
    return artists[Math.floor(Math.random() * artists.length)];
  }

  // Given an artist, this returns a list of related artists to use as other
  // multiplice choice answer for each quiz question.
  function getRelatedArtists(artist) {
    return rp("https://api.spotify.com/v1/artists/" + artist + "/related-artists");
  }

  // Sorts the array of related artists by popularity, descending.
  function sortRelatedArtists(relatedArtistsArray) {
    return relatedArtistsArray.sort(function(a, b) {
      return b.popularity - a.popularity;
    });
  }

  // Grab the top 2 songs from the top 5 most popular related artists and put them
  // in an array.
  function getArtistTopTracks(artistId) {
    return rp("https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?country=US");
  }
  // -------------------------------------------------------------------------//

  var chosenArtist = randomArtist(artists);
  console.log(chosenArtist);

  var chosenSong = getArtistTopTracks(chosenArtist);

  // First AJAX Request:
  chosenSong.then(function(data) {
    chosenSong = JSON.parse(data).tracks;
    // Shuffle songs using Underscore JS.
    chosenSong = _.shuffle(chosenSong)[0];

    //
    var relatedArtists = getRelatedArtists(chosenArtist);

    // Second AJAX Request, then...:
    relatedArtists.then(function(data){
      relatedArtists = sortRelatedArtists(JSON.parse(data).artists);

      var leftSide = relatedArtists.slice(0, Math.round(relatedArtists.length / 2));

      var topRelatedArtists = [];
      for(var i = 0; i < 4; i++) {
        topRelatedArtists.push(leftSide.pop(randomArtist(leftSide)));
      }

      var relatedSongs = [];

      for (var i = 0; i < 4; i++) {

        // Third AJAX Request:
        var topTracks = getArtistTopTracks(topRelatedArtists[i].id).then(function(data){
          relatedSongs.push(JSON.parse(data).tracks[0]);
          // After 4 songs have been pushed, get ready to append the quiz form.
          if (relatedSongs.length === 4) {
            console.log(typeof chosenSong);
            console.log(chosenSong.name)
            console.log(chosenSong.artists[0].name);

            relatedSongs.forEach(function(song){
              console.log(song.name);
              console.log(song.artists[0].name);
            });
          }
        });
      }

  });
});

function startRound() {

}

function playSong() {

}

function multiChoice() {

}

function pickAChoice() {

}

function scoring() {

}

function endRound() {

}
