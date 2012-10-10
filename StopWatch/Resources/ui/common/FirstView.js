//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var time = Ti.UI.createLabel({
		color:'#000000',
		text: '00:00:00.00',
		height:'auto',
		width:'auto'
	});
	self.add(time);
	
	var btnStartStop = Ti.UI.createButton({
		title: 'Start'
	});
	var btnNextLap = Ti.UI.createButton({
		title: 'Next Lap'
	});
	var btnReset = Ti.UI.createButton({
		title: 'Reset'
	});

	self.add(btnStartStop);
	self.add(btnNextLap);
	self.add(btnReset);

	var tableLaps = Ti.UI.createTableView({
		bottom: 0
	});
	
	//Add behavior for UI
	btnStartStop.addEventListener('click', function(e) {
		if (init == 0) {
			dateObj = new Date();
			startTimer(label);
			init = 1;
		} else {
			if (show == true) {
				show = false;
			} else {
				show = true;
			}
		}
	});
	
	btnNextLap.addEventListener('click', function(e) {
		if (init > 0) {
			var row = Ti.UI.createTableViewRow({
				title: readout
			});
			
			tableLaps.appendRow(row);
			
			if (ii == 9) {
				ii = 0;
			} else {
				ii++;
			}
		}
	});
	
	btnReset.addEventListener('click', function(e) {
		clearTimeout(clocktimer);
		h=1;m=1;tm=1;s=0;ts=0;ms=0;
		init=0;show=true;
		readout='00:00:00.00';
		label=readout;
		table.setData([]);
	});
	
	return self;
}

var base = 60;

var clocktimer,dateObj,dh,dm,ds,ms;
var readout='';
var h=1;
var m=1;
var tm=1;
var s=0;
var ts=0;
var ms=0;
var show=true;
var init=0;

function startTimer(label) {

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

	readout = dh + ':' + dm + ':' + ds + '.' + ms;
	if (show == true) {
		label = readout;
	}

	clocktimer = setTimeout("startTimer()", 1);
}

module.exports = FirstView;
