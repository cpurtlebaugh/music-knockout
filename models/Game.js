var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  players: Array,
  gameState: {
    startRound: Boolean,
    playSong: Boolean,
    multiChoice: Boolean,
    pickAChoice: Boolean,
    scoring: Boolean,
    endRound: Boolean
  },
  currentSong: {
    artist: String,
    track: String,
    preview: String
  },
  wrongSongs: Array,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

GameSchema.statics.getState = function(callback) {
  this.find({}, function(err, games) {
    callback(err, games[0]);
  });
};

// Figure out how to attach these to the schema, then, export them.

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


module.exports = mongoose.model('Game', GameSchema);

