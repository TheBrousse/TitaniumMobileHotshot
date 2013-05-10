uri = 'ws://192.168.1.10:8080'; 

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
