var http = require('http')
	, socketio = require('socket.io');
 
var server = http.createServer(function(req, res) {
	res.write('My forst node');
}).listen(8080, function() {
	console.log('Listening at: http://localhost:8080');
});
 
socketio.listen(server).on('connection', function (socket) {
	socket.on('message', function (msg) {
		console.log('Message Received: ', msg);
		socket.broadcast.emit('message', msg);
	});
});