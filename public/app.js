$.get("https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/related-artists").then(function(x){
  x.map(function(y){
    console.log(y.name);
  });
});

