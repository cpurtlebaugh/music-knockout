var serverIo = require('socket.io')();

serverIo.on('connection', function (socket) {
  console.log('Client connected to socket.io!');

  serverIo.emit('user-connected');

  // socket.on('start-game', function(){
  //   io.emit('start-game');
  // });


});

module.exports = serverIo;
