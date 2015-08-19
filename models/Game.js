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
    track: String
  },
  wrongSongs: Array,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date ,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', GameSchema);

