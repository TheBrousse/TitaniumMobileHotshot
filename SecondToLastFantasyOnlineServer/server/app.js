var http = require('http'),
	fs = require('fs'),
	socketio = require('socket.io');
 
var server = http.createServer();

server.on('request', function(req, res) {
	res.writeHead(200, { 'Content-type': 'text/html'});
	res.end(fs.readFileSync(__dirname + '/index.html'));
});

server.listen(8080, function() {
	console.log('Listening at: http://localhost:8080');
});
 
socketio.listen(server).on('connection', function (socket) {
	socket.on('message', function (msg) {
		console.log('Message Received: ', msg);
		socket.broadcast.emit('message', msg);
	});
});

