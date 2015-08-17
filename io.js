var io = require('socket.io')();

io.on('connection', function (socket) {
  console.log('Client connected to socket.io!');

  socket.on('start-game', function(){
    io.emit('start-game');
  })

});

module.exports = io;
