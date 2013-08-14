var win = Ti.UI.createWindow({ backgroundColor: 'black' });

// Obtain game module
var quicktigame2d = require('com.googlecode.quicktigame2d');
var io = require('socket.io'),

SERVER_URI = 'ws://127.0.0.1:8080/';

// Connect to the Game Server
var socket = io.connect(SERVER_URI);

socket.on('connecting', function () { Ti.API.log('connecting'); });
socket.on('connect', function () { Ti.API.log('connected'); });
socket.on('connect_failed', function (e) { Ti.API.log('connect_failed' + JSON.stringify(e)); });
socket.on('error', function (e) { Ti.API.log('error: ' + JSON.stringify(e)); });
socket.on('reconnecting', function (num) { Ti.API.log('reconnecting attempt #' + num); });
socket.on('reconnect', function () { Ti.API.log('reconnected'); });
socket.on('reconnect_failed', function (e) { Ti.API.log('reconnect_failed' + JSON.stringify(e)); });
socket.on('disconnect', function() { Ti.API.log('disconnected'); });

var players = [];

socket.on('playerjoined', function(player) {
	Ti.API.info('player ' + player.id + ' joined the game');
	Ti.API.info('player ' + JSON.stringify(player) + ' joined the game');

	var newPlayer = new Character(scene, player.image);

	newPlayer.id = player.id;
	newPlayer.z = 2;

	players.push(newPlayer);

	Ti.API.debug(JSON.stringify(players));
});

socket.on('playersaid', function(player) {
	Ti.API.info(player.id + ': ' + player.caption);

	var p = getPlayer(player.id);

	p.say(player.caption);
});

socket.on('playermoved', function(player) {
	Ti.API.trace('player ' + player.id + ' moved x: ' + player.x + '  y: ' + player.y);

	var p = getPlayer(player.id);

	if (p) {
		p.absolute_x = player.x;
		p.absolute_y = player.y;
		p.direction = player.direction;

		p.x = p.absolute_x + Math.round(map.x);
		p.y = p.absolute_y + Math.round(map.y);
	}
});

socket.on('playerquit', function(player) {
	Ti.API.info('player ' + player.id + ' quit the game');

	for (p in players) {
		if (players[p].id === player.id) {
			players[p].say('Goodbye!');
			scene.remove(players[p]);
			players.splice(p);
		}
	}
});

function getPlayer(id) {
	for (p in players) {
		if (players[p].id === id) {
			return players[p];
		}
	}
}


// Create view for your game.
// Note that game.screen.width and height are not yet set until the game is loaded
var game = quicktigame2d.createGameView();

// Frame rate can be changed (fps can not be changed after the game is loaded)
game.fps = 30;

// set initial background color to black
game.color(0, 0, 0);

game.debug = false;

// Create game scene
var scene = quicktigame2d.createScene();

var Character = require('character');

// create sprites
var hero = new Character(scene, 'knight_m.png');

// on-screen controller and its guides
var vpad = quicktigame2d.createSprite({ image:'assets/control_base.png' });
var vpad_nav = quicktigame2d.createSprite({ image:'assets/particle.png' });

vpad_nav.hide();
vpad_nav.color(1, 1,  0);
vpad.alpha = 0.5;

// On Screen button to activate chat mode
var chat_button = quicktigame2d.createSprite({ image:'assets/chat.png' });
chat_button.alpha = 0.5;

var mapfile = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'assets/desert.json');
var mapjson = JSON.parse(mapfile.read().toString());

var desert_tileset = mapjson.tilesets[0];
var ground_layer = mapjson.layers[0];
var items_layer = mapjson.layers[1];

var mapinfo = {
	image: 'assets/' + desert_tileset.image,
	tileWidth: desert_tileset.tilewidth,
	tileHeight: desert_tileset.tileheight,
	border: desert_tileset.spacing,
	margin: desert_tileset.margin
};

// create ground map layer
var map = quicktigame2d.createMapSprite(mapinfo);

map.width  = map.tileWidth  * ground_layer.width;
map.height = map.tileHeight * ground_layer.height;

map.firstgid = desert_tileset.firstgid; // tilemap id is started from 'firstgid'
map.tiles = ground_layer.data;

// create items map layer
var map_items = quicktigame2d.createMapSprite(mapinfo);
map_items.width  = map_items.tileWidth  * items_layer.width;
map_items.height = map_items.tileHeight * items_layer.height;

map_items.firstgid = desert_tileset.firstgid; // tilemap id is started from 'firstgid'
map_items.tiles = items_layer.data;

// set z-order
map.z  = 0;
map_items.z = 1;
hero.z  = 2;
vpad.z = 3;
vpad_nav.z = 4;
chat_button.z = 5;

// add your shape to the scene
scene.add(vpad);
scene.add(vpad_nav);
scene.add(chat_button);
scene.add(map);
scene.add(map_items);

// add your scene to game view
game.pushScene(scene);

var WINDOW_SCALE_FACTOR_X = 1;
var WINDOW_SCALE_FACTOR_Y = 1;

var isVpadActive = false;
var touchX, touchY;

var updateVpadTimerID = 0;
var heroDirection = "DOWN";


// Onload event is called when the game is loaded.
// The game.screen.width and game.screen.height are not yet set until this onload event.
game.addEventListener('onload', function(e) {
	// set screen size for your game (non-retina size)
	var screenScale = game.size.width / Ti.Platform.displayCaps.platformWidth;

	game.screen = {
		width: game.size.width / screenScale,
		height: game.size.height / screenScale
	};

	// Your game screen size is set here if you did not specifiy game width and height using screen property.
	// Note: game.size.width and height may be changed due to the parent layout so check them here.
	Ti.API.info("view size: " + game.size.width + "x" + game.size.height);
	Ti.API.info("game screen size: " + game.screen.width + "x" + game.screen.height);
	Ti.API.info("map: " + map.width + "x" + map.height);

	WINDOW_SCALE_FACTOR_X = game.screen.width  / game.size.width;
	WINDOW_SCALE_FACTOR_Y = game.screen.height / game.size.height;

	vpad.x = (game.screen.width * 0.5) - (vpad.width * 0.5);
	vpad.y = game.screen.height - vpad.height;

	chat_button.y = game.screen.height - chat_button.height;

	centerHero();

	// Start the game
	game.start();

	updateVpadTimerID = setInterval(function(e) {
		updateVpad();
	}, 66);

	var HeroSelectionView = require('hero_select');

	var heroSelectedCallback = function(imageSheet) {
		scene.remove(hero);

		hero = new Character(scene, imageSheet);
		centerHero();
		hero.z  = 2;

		 // Join the game
		hero.id = Ti.Platform.id;
		socket.emit('join', {
			id: hero.id,
			image: hero.image.replace('assets/', '')
		});
	}

	var heroView = new HeroSelectionView(heroSelectedCallback);

	win.add(heroView);

});

/// Stop update timer before app is closed
win.addEventListener('android:back', function(e) {
	clearInterval(updateVpadTimerID);

	win.close();
});

function updateVpad() {
	if (isVpadActive) {
		// Is the character moving fast or slow?
		var powerX = (touchX - (vpad.x + (vpad.width  * 0.5))) * 0.2;
		var powerY = (touchY - (vpad.y + (vpad.height * 0.5))) * 0.2;

		vpad.color(0.78, 0.78, 0.78);
		vpad_nav.x = touchX - (vpad_nav.width  * 0.5);
		vpad_nav.y = touchY - (vpad_nav.height * 0.5);
		vpad_nav.show();

		// Change animation of the hero's sprite
		// Is the wanted direction more vertical or horizontal
		if (Math.abs(powerX) > Math.abs(powerY)) { // Horizontal
			heroDirection = (powerX < 0) ? "LEFT" : "RIGHT";
		} else { // Vertical
			heroDirection = (powerY < 0) ? "UP" : "DOWN";
		}

		hero.turnTowards(heroDirection);

		var nextHeroX = hero.x + powerX;
		var nextHeroY = hero.y + powerY;

		var nextMapX = map.x - powerX;
		var nextMapY = map.y - powerY;

		// move hero and map layers
		if (nextHeroX > 0 && nextHeroX < (game.screen.width  - hero.width)) {
			hero.x = nextHeroX;
		} else if (nextMapX <= 0 && nextMapX > (-map.width + game.screen.width)) {
			map.x = nextMapX;
			map_items.x = map.x;
		}
		if (nextHeroY > 0 && nextHeroY < (game.screen.height - hero.height)) {
			hero.y = nextHeroY;
		} else if (nextMapY <= 0 && nextMapY > (-map.height + game.screen.height)) {
			map.y = nextMapY;
			map_items.y = map.y;
		}

		drawOtherPlayers()

		// Send absolute coordinated to the server
		socket.emit('move', {
			id: hero.id,
			x: Math.round(Math.abs(hero.x + map.x)),
			y: Math.round(Math.abs(hero.y + map.y)),
			direction: heroDirection
		});
//		Ti.API.debug('x: '+hero.x + '  y: '+ hero.y + ' | map-x: '+map.x + '  map-y: '+ map.y );
	} else {
		vpad.color(1, 1, 1);
		vpad_nav.hide();

		hero.halt();
	}
}

function drawOtherPlayers() {
	for (p in players) {
		var otherHero = players[p];

		otherHero.x = otherHero.absolute_x + Math.round(map.x);
		otherHero.y = otherHero.absolute_y + Math.round(map.y);

		if (otherHero.id !== Ti.Platform.id) {
			if (((otherHero.x + otherHero.width/2) >= 0) &&
				// le bord gauche du sprite est à gauche du bord droit de l'écran
				 ((otherHero.x - otherHero.width/2) <= game.screen.width) &&
				// le bord bas du sprite est en-dessous du bord haut de l'écran
				((otherHero.y + otherHero.height/2) >= 0) &&
				// le bord haut du sprite est au-dessus du bord bas de l'écran
				((otherHero.y - otherHero.height/2) <= game.screen.height)) {

				otherHero.halt();
			}
		}
	}
}

function centerHero() {
	hero.x = (game.screen.width * 0.5) - (hero.width * 0.5);
	hero.y = (game.screen.height * 0.5) - (hero.height * 0.5);
}

var ChatView = require('chat');

var chatView = new ChatView(function(caption) {
	hero.say(caption);

	socket.emit('speak', {
		id: hero.id,
		caption: caption
	});
});

win.add(chatView);

game.addEventListener('touchstart', function(e) {
	touchX = (e.x * WINDOW_SCALE_FACTOR_X);
	touchY = (e.y * WINDOW_SCALE_FACTOR_Y);

	isVpadActive = vpad.contains(touchX, touchY);

	if (chat_button.contains(touchX, touchY)) {
		chatView.show();
	}
});

game.addEventListener('touchmove', function(e) {
	touchX = (e.x * WINDOW_SCALE_FACTOR_X);
	touchY = (e.y * WINDOW_SCALE_FACTOR_Y);

	isVpadActive = vpad.contains(touchX, touchY);
});

game.addEventListener('touchend', function(e) {
	isVpadActive = false;
});

// load debug functions
Ti.include("debug.js");

// Add your game view
win.add(game);

win.addEventListener('close', function() {
	socket.emit('quit', hero);
});

win.open({ fullscreen:true, navBarHidden:true });