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
 
var players = [];

socketio.listen(server).on('connection', function (socket) {

	socket.on('join', function (player) {
		console.log('Player ', player.id, ' has joined');

		users.push(player);

		for (u in users) {
			socket.broadcast('newplayer', users[u]);
		}
	});

	socket.on('quit', function (player) {
		users.remove(player.id);

		for (u in users) {
			if (users[u].id === player.id) {
				console.log('Player ', player.id, ' has quit');

				socket.broadcast('quit', users[u]);
			}
		}
	});

	socket.on('speak', function (player) {
		console.log('Player ', player.id, ' said: ', player.caption);

		socket.broadcast.emit('message', player.caption);
	});

	socket.on('move', function (player) {
		console.log('Player ', player.id, ' moved to x: %d - y: %d', player.x, player.y);

		socket.broadcast.emit('move', player);
	})
});

