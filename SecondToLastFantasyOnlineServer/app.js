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

		players.push(player);

		for (p in players) {
			socket.broadcast.emit('newplayer', players[p]);
		}
	});

	socket.on('quit', function (player) {
		

		for (p in players) {
			if (players[p].id === player.id) {
				console.log('Player ', player.id, ' has quit');

				players.remove(p);
				socket.broadcast.emit('playerquit', players[u]);
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

