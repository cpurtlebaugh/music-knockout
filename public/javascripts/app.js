console.log('connected JS file');

var genre = "";
var songs = [];

var test = $.get("https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/related-artists").then(function(x){
  x.artists.map(function(y){
    $.get("https://api.spotify.com/v1/artists/" + y.id + "/top-tracks?country=US").then(function(z){
      z.tracks.map(function(a){
        songs.push(a.href);
        console.log(songs);
      });
    }).then(function(){
        console.log(songs[1]);
        $('body').append('<iframe src="https://embed.spotify.com/?uri=spotify:track:"' +  songs[0] + ' ' + 'width="300" height="80" frameborder="0" allowtransparency="true"></iframe>');
    });
  });
});

console.log(songs);



// $(document).ready(function(){
//   $('.parallax').parallax();
// });
