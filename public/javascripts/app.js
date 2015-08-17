console.log('connected JS file');

var genre = "";
var songs = [];

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

$("#welcomeIntro").on('click', function() {
  $(this).fadeOut(0);
});

//paralax effect
$(document).ready(function(){
  $('.parallax').parallax();
});
