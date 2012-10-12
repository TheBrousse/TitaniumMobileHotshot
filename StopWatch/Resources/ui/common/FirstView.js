//FirstView Component Constructor
var label;

function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		layout: 'vertical'
	});

	// Création de la vue du timer
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
	self.add(timeView);
	
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
	
	self.add(buttonsView);
	
	// Enfin on rajoute la TableView qui va contenir les différents laps
	var table = Ti.UI.createTableView({
		width: '100%',
		height:Ti.UI.FILL,
		backgroundColor: '#C0BFBF',
	});
	
	self.add(table);
	
	buttonStartLap.addEventListener('click', function(e) {
		// Si ca tourne, on enregistre un nouveau lap
		if (running){
			var data = table.getData();

			// On rajoute un séparateur entre les précédents laps et les nouveaux, si on n'a pas fait de reset
			if (firstLap && !reallyFirst) {
				//Ti.API.info("firstLap");
				var sep = Ti.UI.createTableViewRow({
					backgroundColor: '#404040'
				});
				
				var lblSep = Ti.UI.createView({
					height: '2px'
				})
				
				sep.add(lblSep);
				data.push(sep);
				firstLap = false;	
			}
			
			// Ajout du nouveau lap dans la liste
			var row = Ti.UI.createTableViewRow({
			    title: dh + ':' + dm + ':' + ds + '.' + ms,
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
			// Si ca tourne pas, on lance le chrono
			dateObj = new Date();
			running = true;
			buttonStartLap.title = 'LAP!';
			buttonStopReset.title = 'STOP';
			clocktimer = setInterval(startTimer, 1);
		}
	});
	
	buttonStopReset.addEventListener('click', function(e) {
		// Si ca tourne, on éteint le chrono
		if (running) {
			reallyFirst = false;
			firstLap = true;
			running = false;
			clearInterval(clocktimer);
			buttonStartLap.title = 'GO!';
			buttonStopReset.title = 'RESET';
			label.text = 'READY?';
			h = m = tm = 1;
			s = ts = ms = 0;
		} else {
			// Si ca tourne pas, on fait le reset des laps
			table.setData([]);
			firstLap = true;
			reallyFirst = true;
		}
	});
	
	return self;
}

module.exports = FirstView;

var base = 60;
var clocktimer,dateObj,dh,dm,ds,ms;
var h = 1;
var m = 1;
var tm = 1;
var s = 0;
var ts = 0;
var ms = 0;
var running = false;
var firstLap = true;
var reallyFirst = true;

function startTimer(){
	if (running){
		var cdateObj = new Date();
		var t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
	
		if (t > 999) {
			s++;
		}
	
		if (s >= (m * base)) {
			ts = 0;
			m++;
		} else {
			ts = parseInt((ms / 100) + s);
			if (ts >= base) {
				ts = ts - ((m - 1) * base);
			}
		}
	
		if (m > (h * base)) {
			tm = 1;
			h++;
		} else {
			tm = parseInt((ms / 100) + m);
			if (tm >= base) {
				tm = tm - ((h - 1) * base);
			}
		}
	
		ms = Math.round(t / 10);
		if (ms > 99) {
			ms = 0;
		}
		if (ms == 0) {
			ms = '00';
		}
		if (ms > 0 && ms <= 9) {
			ms = '0' + ms;
		}
	
		if (ts > 0) {
			ds = ts;
			if (ts < 10) {
				ds = '0' + ts;
			}
		} else {
			ds = '00';
		}
		dm = tm - 1;
		if (dm > 0) {
			if (dm < 10) {
				dm = '0' + dm;
			}
		} else {
			dm = '00';
		}
		dh = h - 1;
		if (dh > 0) {
			if (dh < 10) {
				dh = '0' + dh;
			}
		} else {
			dh = '00';
		}
	
		label.text = dh + ':' + dm + ':' + ds + '.' + ms;
	}
}