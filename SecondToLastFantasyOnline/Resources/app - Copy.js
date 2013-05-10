// ****************************************************************************************************************
// ****************************************************************************************************************
// test value can be 'raw' | 'socket.io' | 'nowjs'

var test = 'socket.io', 

// ****************************************************************************************************************
// ****************************************************************************************************************
// REMEMBER to change this with your data

uri = 'ws://192.168.1.10:8080'; 

// ****************************************************************************************************************
// ****************************************************************************************************************
// example using a plain websockets

if ('raw' === test) {
	var WS = require('net.iamyellow.tiws').createWS();

	WS.addEventListener('open', function () {
		Ti.API.debug('websocket opened');
	});

	WS.addEventListener('close', function (ev) {
		Ti.API.info(ev);
	});

	WS.addEventListener('error', function (ev) {
		Ti.API.error(ev);
	});

	WS.addEventListener('message', function (ev) {
		Ti.API.log(ev);
	});
	
	WS.open(uri);
}

// ****************************************************************************************************************
// ****************************************************************************************************************
// example using socket.io which uses websocket

else if ('socket.io' === test) {
	var io = require('socket.io'),
	socket = io.connect(uri);
	
    socket.on('connecting', function () { Ti.API.log('connecting'); });
    socket.on('connect', function () { Ti.API.log('connected'); });
    socket.on('connect_failed', function (e) { Ti.API.log('connect_failed' + JSON.stringify(e)); });
    socket.on('error', function (e) { Ti.API.log('error: ' + JSON.stringify(e)); });
    socket.on('reconnecting', function (num) { Ti.API.log('reconnecting attempt #' + num); });
    socket.on('reconnect', function () { Ti.API.log('reconnected'); });
    socket.on('reconnect_failed', function (e) { Ti.API.log('reconnect_failed' + JSON.stringify(e)); });
	socket.on('disconnect', function() { Ti.API.log('disconnected'); });
    
	socket.on('message', function(msg) {
	   Ti.API.info(msg); 
	});
}

// ****************************************************************************************************************
// ****************************************************************************************************************
// example using now.js which uses socket.io which uses websockets

else if ('nowjs' === test) {
	var now = require('now').nowInitialize(uri, {
		// socket.io init options
		socketio: {
			transports: ['websocket']
		}
	});

	now.core.on('error', function () {
		Ti.API.error('error!')
	});

	now.core.on('ready', function () {
		Ti.API.log('now is now ready')
	});

	now.core.on('disconnect', function () {
		Ti.API.log('now disconnected');
	});

	// now data bindings
	now.userID = '4815162342';
	now.whatLiesInTheShadowOfTheStatue = function () {
		return 'ille qui nos omnes servabit';
	};
}

var win = Ti.UI.createWindow({
    backgroundColor: '#000'
});

var txtMsg = Ti.UI.createTextField({
    width: '95%',
    top: 10 
});

var btnSend = Ti.UI.createButton({
    title: 'Send',
    top: 85
});

btnSend.addEventListener('click', function() {
    socket.send(txtMsg.value);
});

win.add(txtMsg);
win.add(btnSend);

win.open();
