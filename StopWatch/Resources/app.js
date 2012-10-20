if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

var Stopwatch = require('stopwatch');
var sw = new Stopwatch(stopwatchListener, 1);

var win = Ti.UI.createWindow({
	backgroundColor: '#000000',
	layout: 'vertical'
});

// Timer View
var timeView = Ti.UI.createView({
	top:0,
	width: '100%',
	height: '30%',
	backgroundColor: '#1C1C1C'
});

label = Ti.UI.createLabel({
	color: '#404040',
	text: 'READY?',
	height: 'auto',
	textAlign: 'center',
	verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
	font:{
		fontSize: '55dp',
		fontWeight: 'bold'
	}
});

timeView.add(label);
win.add(timeView);

// Container view for buttons
var buttonsView = Ti.UI.createView({
	width: '100%',
	height: '10%',
	layout: 'horizontal'
});

// First button : stop / reset
var buttonStopReset = Ti.UI.createButton({
	title: 'STOP',
	color: '#C0BFBF',
	width: '50%',
	height: Ti.UI.FILL,
	backgroundColor: '#404040',
	font: {
		fontSize: '25dp',
		fontWeight: 'bold'
	}
});

buttonsView.add(buttonStopReset);

// Second button : go / lap
var buttonStartLap = Ti.UI.createButton({
    title: 'GO!',
    color: '#C0BFBF',
	width: '50%',
	height: Ti.UI.FILL,
	backgroundColor: '#727F7F',
    font: {
        fontSize: '25dp',
        fontWeight: 'bold'
    }
});

buttonsView.add(buttonStartLap);

win.add(buttonsView);

// Enfin on rajoute la TableView qui va contenir les différents laps
var table = Ti.UI.createTableView({
	width: '100%',
	height:Ti.UI.FILL,
	backgroundColor: '#C0BFBF',
});

win.add(table);

var running = false;

buttonStartLap.addEventListener('click', function(e) {
	// Si ca tourne, on enregistre un nouveau lap
	if (running){
		var data = table.getData();

		// Ajout du nouveau lap dans la liste
		var row = Ti.UI.createTableViewRow({
		    title: sw.toString(),
		    color: '#404040',
		    className: 'lap',
		    leftImage: '/images/lap.png',
		    font:{
                fontSize: '24dp',
                fontWeight: 'bold'
            }
		});			
		
	    table.appendRow(row);
	} else {
		// If the clock is not ticking, then we start it
		running = true;
		buttonStartLap.title = 'LAP!';
		buttonStopReset.title = 'STOP';
		sw.start();
	}
});

buttonStopReset.addEventListener('click', function(e) {
	// Si ca tourne, on éteint le chrono
	if (running) {
		buttonStartLap.title = 'GO!';
		buttonStopReset.title = 'RESET';
		label.text = 'READY?';
        sw.stop();
        running = false;
	} else {
		// Si ca tourne pas, on fait le reset des laps
		table.setData([]);
		sw.reset();
	}
});

function stopwatchListener(watch) {
	var elapsed = watch.getElapsed();
	label.text = watch.toString(); 
}

win.open();