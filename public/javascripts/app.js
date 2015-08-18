console.log('connected JS file');

function initiate() {

  var genre = "";
  var songs = [];

  var artists = [
    "6S2OmqARrzebs0tKUEyXyp", "3TVXtAsR1Inumwj472S9r4", "6DIS6PRrLS3wbnZsf7vYic",
    "6eUKZXaKkcviH0Ku9w2n3V", "4NHQUGzhtTLFvgF5SZesLK", "04gDigrS5kc9YWfZHwBETP",
    "0C8ZW7ezQVs4URX5aX7Kqx", "07YZf4WDAMNwqr4jfgOZ8y", "6PXS4YHDkKvl1wkIl4V8DL",
    "738wLrAtLtCtFOLvQBXOXp", "5pKCCKE2ajJHZ9KAiaK11H", "5Rl15oVamLq7FbSb0NNBNy",
    "5Rl15oVamLq7FbSb0NNBNy", "2iojnBLj0qIMiKPvVhLnsH", "6nS5roXSAGhTGr34W6n7Et"
  ]

  var randomArtist = function(artists) {
    return artists[Math.floor(Math.random() * artists.length)];
  }

  var chosenArtist = randomArtist(artists);
  console.log(chosenArtist);

  // Given an artist, this returns a list of related artists.
  function getRelatedArtists(artist) {
    return $.get("https://api.spotify.com/v1/artists/" + artist + "/related-artists");
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
    return $.get("https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?country=US");
  }

  // -------------------------------------------------------------------------//
  //                              NESTED AJAX CALLS                           //

  var chosenTopSong = getArtistTopTracks(chosenArtist)

  chosenTopSong.then(function(data){
    chosenTopSong = data.tracks[0];
    console.log(chosenTopSong);
    relatedArtists.then(function(data) {
    relatedArtists = sortRelatedArtists(data.artists);
    // Split artists array in half to show top 10
    var leftSide = relatedArtists.slice(0, Math.round(relatedArtists.length / 2));
    // Gets a random artist from the sorted array.

    // Then, we need to grab 4 other random artists for the other M/C answers.
    var chosenRelatedArtists = [];
    for(var i = 0; i < 4; i++) {
      chosenRelatedArtists.push(leftSide.pop(randomArtist(leftSide)));
    }

    console.log(chosenRelatedArtists);
    var relatedSongs = [];
    for (var i = 0; i < 4; i++) {
      var test = getArtistTopTracks(chosenRelatedArtists[i].id).then(function(data){
        relatedSongs.push(data.tracks[0]);
      });
    }

    console.log(relatedSongs);



    // chosenRelatedArtists.forEach(function(x){

    // })

    // var chosenRelatedArtistsTopTracks = getChosenArtistTracks(chosenRelatedArtists.name);
    // console.log(chosenRelatedArtistsTopTracks);
  });
  });

  console.log(chosenTopSong);

  // Calls the getRelatedArtists function which performs an AJAX requeset.
  var relatedArtists = getRelatedArtists(chosenArtist);

  // After the promise is finished, the returned array within the returned object is sorted.


  // -------------------------------------------------------------------------//



  // chosenArtistTopTracks = getChosenArtist.responseJSON.tracks;

  function getRelatedArtistsTopSongs(relatedArtists) {
    var output = relatedArtists.forEach(function(artist) {
      return $.get("https://api.spotify.com/v1/artists/" + y.id + "/top-tracks?country=US");
    });
    return output;
  }

  var songSelections = getRelatedArtistsTopSongs;

  function getRandomSongs(songSelections) {
    // select 4 songs from the random song list.
  }


  console.log(relatedSongs);

  // var test = $.get("https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/related-artists").then(function(x){
  //   x.artists.map(function(y){
  //     $.get("https://api.spotify.com/v1/artists/" + y.id + "/top-tracks?country=US").then(function(z){
  //       z.tracks.map(function(a){
  //         console.log(a);
  //         songs.push(a.id);
  //       });
  //     }).then(function(){
  //         if (songs.length === 200) {
  //           $('body').append('<audio style="display: none" src="' + songs[songs.length - 1].preview_url + '"' + 'preload="auto" controls autoplay></audio>');
  //         }
  //     });
  //   });
  // });

  console.log(songs);
  // console.log(songs);

  $("#welcomeIntro").on('click', function() {
    $(this).fadeOut(0);
  });

  //paralax effect
  $(document).ready(function() {
    $('.parallax').parallax();
  });
}

initiate();
