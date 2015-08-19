console.log('connected JS file');
var socket = io();

function initiate() {

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

  // This points chosenArtist as at a random artist from artists array.
  var chosenArtist = randomArtist(artists);
  console.log(chosenArtist);

  // Given an artist, this returns a list of related artists to use as other
  // multiplice choice answer for each quiz question.
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



  // -------------------------------------------------------------------------//
  //                              NESTED AJAX CALLS                           //

  var chosenTopSong = getArtistTopTracks(chosenArtist);

  // First AJAX call, followed by a promise with other nested calls.
  chosenTopSong.then(function(data){
    chosenTopSong = data.tracks[0];
    console.log(chosenTopSong);
    relatedArtists.then(function(data) {
    relatedArtists = sortRelatedArtists(data.artists);

    // Split artists array in half to show top 10
    var leftSide = relatedArtists.slice(0, Math.round(relatedArtists.length / 2));

    // Then, we need to grab 4 other random artists for the other M/C answers.
    var chosenRelatedArtists = [];
    for(var i = 0; i < 4; i++) {
      chosenRelatedArtists.push(leftSide.pop(randomArtist(leftSide)));
    }

    console.log(chosenRelatedArtists);
    var relatedSongs = [];
    var allSongs = [];
    for (var i = 0; i < 4; i++) {
      var topTracks = getArtistTopTracks(chosenRelatedArtists[i].id).then(function(data){
        relatedSongs.push(data.tracks[0]);
        // After 4 songs have been pushed, get ready to append the quiz form.
        if (relatedSongs.length === 4) {
          chosenTopSong.correct = true;
          allSongs = relatedSongs.concat(chosenTopSong);
          console.log(allSongs);
          allSongsShuffled = _.shuffle(allSongs);
          var correct = allSongsShuffled.filter(function(song){
            return song.correct === true;
          })
          console.log(correct);
          console.log(allSongsShuffled);
          // Hidden embedded auto song player.
          $('body').append('<audio id="song-player" style="display: none" src="' + chosenTopSong.preview_url + '"' + 'preload="auto" controls autoplay></audio>');

          // AJAX calls, done. Data received. Need to append the quiz table.
          var gameTable = '<form action="#" id="game-table" class="animated bounceInDown"><p><input name="group1" type="radio" id="ans1" /><label for="ans1">' + allSongsShuffled[0].name + ' - ' + allSongsShuffled[0].artists[0].name + '</label></p><p><input name="group1" type="radio" id="ans2" /><label for="ans2">'  + allSongsShuffled[1].name + ' - ' + allSongsShuffled[1].artists[0].name + '</label></p><p><input class="group1" name="group1" type="radio" id="ans3"  /><label for="ans3">'  + allSongsShuffled[2].name + ' - ' + allSongsShuffled[2].artists[0].name + '</label></p><p><input name="group1" type="radio" id="ans4" /><label for="ans4">'  + allSongsShuffled[3].name + ' - ' + allSongsShuffled[3].artists[0].name + '</label></p><p><input name="group1" type="radio" id="ans5" /><label for="ans5">'  + allSongsShuffled[4].name + ' - ' + allSongsShuffled[4].artists[0].name + '</label></p><p><button class="btn waves-effect waves-light" type="submit" name="action">Submit</button></p></form>';

          // Game Logic:
          var ans1 = $('#ans1'),
              ans2 = $('#ans2'),
              ans3 = $('#ans3'),
              ans4 = $('#ans4'),
              ans5 = $('#ans5');

          var answers = [ans1, ans2, ans3, ans4, ans5];
          console.log(answers[0]);
          answers.forEach(function(x){console.log(x.checked)});

          $('#game-board').append(gameTable);

          // Win logic:
          $('#game-table').on('submit', function(el){
            var selectedAnswer = $('input:checked').next().html().split(' - ');
            console.log(selectedAnswer);
            console.log(chosenTopSong);
            // If chosen answer matches the chosen song, remove elements and re-initiate.
            if (selectedAnswer[0] === chosenTopSong.name) {
              console.log("winner");
              $('#game-table').remove();
              $('#song-player').remove();
              // Recursive function call.
              initiate();
            }
          });

        }
      });
    }

    console.log(relatedSongs);

  });
  });

  console.log(chosenTopSong);

  // Calls the getRelatedArtists function which performs an AJAX requeset.
  var relatedArtists = getRelatedArtists(chosenArtist);
}

  // -------------------------------------------------------------------------//



$("#welcomeIntro").on('click', function() {
  $(this).fadeOut(0);
});


//paralax effect
$(document).ready(function() {
  $('.parallax').parallax();
});
