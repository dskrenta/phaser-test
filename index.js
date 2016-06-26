var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.emit('welcome', {message: 'Welcome!', id: socket.id});
  socket.on('position update', function(position) {
    console.log(`socket-id: ${position.id}, x-position: ${position.x}, y-position: ${position.y}`);
    socket.broadcast.emit('global position update', position);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
