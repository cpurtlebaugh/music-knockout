console.log('connected JS file');

var genre = "";
var songs = [];

var artists = [
                6S2OmqARrzebs0tKUEyXyp, 3TVXtAsR1Inumwj472S9r4, 6DIS6PRrLS3wbnZsf7vYic,
               6eUKZXaKkcviH0Ku9w2n3V, 4NHQUGzhtTLFvgF5SZesLK, 04gDigrS5kc9YWfZHwBETP,
               0C8ZW7ezQVs4URX5aX7Kqx, 07YZf4WDAMNwqr4jfgOZ8y, 6PXS4YHDkKvl1wkIl4V8DL,
              738wLrAtLtCtFOLvQBXOXp, 5pKCCKE2ajJHZ9KAiaK11H, 5Rl15oVamLq7FbSb0NNBNy,
              5Rl15oVamLq7FbSb0NNBNy, 2iojnBLj0qIMiKPvVhLnsH
              ]

var test = $.get("https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/related-artists").then(function(x){
  x.artists.map(function(y){
    $.get("https://api.spotify.com/v1/artists/" + y.id + "/top-tracks?country=US").then(function(z){
      z.tracks.map(function(a){
        console.log(a);
        songs.push(a.id);
      });
    }).then(function(){
        if (songs.length === 200) {
          $('body').append('<audio style="display: none" src="' + songs[songs.length - 1].preview_url + '"' + 'preload="auto" controls autoplay></audio>');
        }
    });
  });
});


console.log(songs);



// $(document).ready(function(){
//   $('.parallax').parallax();
// });
