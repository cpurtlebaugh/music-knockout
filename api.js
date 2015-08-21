// var Game = require('./models/Game');
// var test = new Game();
// var request = require('request');
// var Game = require('./models/Game');
// var game = new Game();

var rp = require('request-promise');
var _  = require('underscore');
var Game = require('./models/Game');

var game = new Game();

// -------------------------------------------------------------------------//
//                             FUNCTION DEFINITIONS                         //

// For now, we will have a prechosen list of artists to use.
var artists = [
  "6S2OmqARrzebs0tKUEyXyp", "3TVXtAsR1Inumwj472S9r4", "6DIS6PRrLS3wbnZsf7vYic",
  "6eUKZXaKkcviH0Ku9w2n3V", "4NHQUGzhtTLFvgF5SZesLK", "04gDigrS5kc9YWfZHwBETP",
  "0C8ZW7ezQVs4URX5aX7Kqx", "07YZf4WDAMNwqr4jfgOZ8y", "6PXS4YHDkKvl1wkIl4V8DL",
  "738wLrAtLtCtFOLvQBXOXp", "5pKCCKE2ajJHZ9KAiaK11H", "5Rl15oVamLq7FbSb0NNBNy",
  "5Rl15oVamLq7FbSb0NNBNy", "2iojnBLj0qIMiKPvVhLnsH", "6nS5roXSAGhTGr34W6n7Et"
];

// Grabs a random artist from the array of pre-selected artists.
var randomArtist = function() {
  return artists[Math.floor(Math.random() * artists.length)];
};



// Sorts the array of related artists by popularity, descending.
var mostPopularArtists = function(artists) {
  var artists = JSON.parse(artists).artists;
  // console.log("6. Related artists' ids received: ",
            // artists.map(function(a) {return a.id;}));

  artists = artists.sort(function(a, b) {
    return b.popularity - a.popularity;
  });
  return mostPopular(artists);
};

var mostPopular = function(artists) {
  return artists.slice(0, Math.round(artists.length / 2));
};

var randomRelatedArtists = function(artists) {
  artists = mostPopularArtists(artists);
  artists = _.shuffle(artists);
  return artists.slice(0,4);
};





// Grab the top 2 songs from the top 5 most popular related artists and put them
// in an array.
var getArtistTopTracks = function(artistId) {
  // console.log("2. Artists' top tracks request sent...");
  return rp("https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?country=US");
};

// Given an artist, this returns a list of related artists to use as other
// multiplice choice answer for each quiz question.
var getRelatedArtists = function(artist) {
  // console.log("5. Related artists' request sent...");
  return rp("https://api.spotify.com/v1/artists/" + artist + "/related-artists");
};


var parseAllArtistsTopTracks = function(data) {
  return data.map(JSON.parse)
             .map(function(trackObject) {
               return trackObject.tracks
             });
};

var grabFirstTrack = function(topTracks) {
  return topTracks[0];
}

var getChosenTrack = function(data) {
  var chosenArtistsTopTracks = JSON.parse(data).tracks;
  // console.log("3. Artists' top track ids received: ",
              // chosenArtistsTopTracks.map(function(t) {return t.id;}));

  return chosenTrack = _.sample(chosenArtistsTopTracks);
}

var artistsNames = function(trackArtists) {
  return trackArtists.map(function(artist) {
    return artist.name;
  }).join(', ');
};

var createWrongTrack = function(track) {

  var track = [
    track.name,                  // song name
    artistsNames(track.artists), // artists names
    track.id
  ];

  return track;
};

var buildGameQuestionObject = function(currentSong, wrongTracks) {
  // get current song data
  var currentSong = {
    artistName:       artistsNames(chosenTrack.artists),
    trackName:        chosenTrack.name,
    previewUrl:       chosenTrack.preview_url,
    apiId:            chosenTrack.id,
    currentSongArray: [chosenTrack.name, artistsNames(chosenTrack.artists)]
  };

  // get wrong song data
  wrongTracks = _.shuffle(wrongTracks.map(createWrongTrack));

  // emitted object
  return {
    currentSong: currentSong,
    wrongTracks: wrongTracks
  };
};

// var api = require('./api')
// api.apiCall()

// API Call Code:

var getGameQuestion = function(callback) {
  var chosenArtist = randomArtist();
  // console.log("1. Artist chosen: ", chosenArtist);

  getArtistTopTracks(chosenArtist).then(function(tracks) {

    var chosenTrack = getChosenTrack(tracks);
    // console.log("4. Chosen track id: ", chosenTrack.id);

    getRelatedArtists(chosenArtist).then(function(artists) {

      var relatedArtists = randomRelatedArtists(artists);
      // console.log("7. Artists for questions ids: ",
        // relatedArtists.map(function(a) {return a.id;}));

      // Promise.all(
      //  relatedArtists.map(function(a) {return a.id}).map(getArtistTopTracks)
      // ).then....
      Promise.all([
        getArtistTopTracks(relatedArtists[0].id),
        getArtistTopTracks(relatedArtists[1].id),
        getArtistTopTracks(relatedArtists[2].id),
        getArtistTopTracks(relatedArtists[3].id)
      ]).then(function(data) {
        // console.log("8. All artists' top track requests returned...");

        var allArtistsTopTracks = parseAllArtistsTopTracks(data);
        var wrongTracks = allArtistsTopTracks.map(grabFirstTrack);
        // console.log("9. Tracks for questions ids: ",
          // wrongTracks.map(function(t) {return t.id;}));

        var gameQuestionObject = buildGameQuestionObject(chosenTrack, wrongTracks);
        // console.log("10. Final Game Question Object: ", gameQuestionObject);

        // pass object to callbak
        callback(gameQuestionObject);
      });
    });
  });
}

module.exports = {
  getGameQuestion: getGameQuestion
}
