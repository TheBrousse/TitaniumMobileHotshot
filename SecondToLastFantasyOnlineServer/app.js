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

function leanify(p) {
    var leanPlayer = { id: p.id };

    if (p.x) {
        leanPlayer.x = p.x;
    }

    if (p.y) {
        leanPlayer.y = p.y;
    }

    if (p.direction) {
        leanPlayer.direction = p.direction;
    }

    if (p.image) {
        leanPlayer.image = p.image;
    }
    
    if (p.caption) {
        leanPlayer.caption = caption;
    }

    return leanPlayer;
}

Array.prototype.contains = function(k, callback) {
	var self = this;
    return (function check(i) {
        if (i >= self.length) {
            return callback(false);
        }

        if (self[i].id === k.id) {
            return callback(true);
        }

        return process.nextTick(check.bind(null, i+1));
    }(0));
}

var players = [];

socketio.listen(server).on('connection', function (socket) {

	socket.on('join', function (newPlayer) {
		console.log('Player ', newPlayer.id, ' has joined');
		console.log(JSON.stringify(newPlayer));
		
		// Retrieve players already online
		for (var i=0, len=players.length; i < len; i++) {
			socket.emit('playerjoined', leanify(players[i]));
		}

		// Add new player to the servers's list (if not already there)
		players.contains(newPlayer, function(found) {
		    if (!found) {
		        players.push(leanify(newPlayer));
		        // Inform everyone the new player has joined
				socket.broadcast.emit('playerjoined', leanify(newPlayer));
		    }
		});
	});

	socket.on('quit', function (player) {
		for (p in players) {
			if (players[p].id === player.id) {
				console.log('Player ', player.id, ' has quit');

				players.splice(p);
				socket.broadcast.emit('playerquit', leanify(player));
			}
		}
	});

	socket.on('speak', function (player) {
		console.log('Player ', player.id, ' said: ', player.caption);

		socket.broadcast.emit('playersaid', leanify(player));
	});

	socket.on('move', function (player) {
		console.log('Player ', player.id, ' moved to x: ', player.x, ' - y: ', player.y);

		socket.broadcast.emit('playermoved', leanify(player));
	})
});
