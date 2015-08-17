var test = $.get("https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/related-artists").then(function(x){var test = $.get("https://api.spotify.com/v1/artists/3nFkdlSjzX9mRTtwJOzDYB/related-artists").then(function(x){
  x.artists.map(function(y){
    $.get("https://api.spotify.com/v1/artists/" + y.id + "/top-tracks?country=US").then(function(z){
      console.log(z);
    });
  });
});
  console.log(x.artists);
});


$(document).ready(function(){
  $('.parallax').parallax();
});
