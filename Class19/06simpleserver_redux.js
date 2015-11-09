var foo = require('./lukeserver.js');
var server = foo.startServer(8080);
foo.debugServer(false);

// socket.io stuff:
var io = require('socket.io')(server);
// this runs when we connect:

io.on('connection', function (socket) {
	console.log('socket connection!!!');
  	socket.emit('news', { hello: 'world' });
  	socket.on('query', function (data) {
    	console.log(data);
  });
});