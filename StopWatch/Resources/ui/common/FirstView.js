//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		layout:'vertical'
	});

	// Création de la vue du timer
	var timeView = Ti.UI.createView({
		top:0,
		width:'100%',
		height:'30%',
		backgroundColor:'#1C1C1C'
	});
	
	label = Ti.UI.createLabel({
		color:'#404040',
		text: 'READY?',
		height:'auto',
		textAlign:'center',
		verticalAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		font:{
			fontFamily:'Visitor TT1 BRK',
			fontSize:'55dp',
			fontWeight:'bold'
		}
	});
	
	timeView.add(label);
	self.add(timeView);
	
	// Création du bloc des boutons
	var buttonsView = Ti.UI.createView({
		width:'100%',
		height:'10%',
		layout:'horizontal'
	});
	
	// 1er bouton : stop / reset
	var buttonStopReset = Ti.UI.createView({
		width:'50%',
		height:'100%',
		backgroundColor:'#404040'
	});
	
	var lblStopReset = Ti.UI.createLabel({
		text:'STOP',
		color:'#C0BFBF',
		textAlign:'center',
		verticalAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		font: {
			fontFamily:'Visitor TT1 BRK',
			fontSize:'25dp',
			fontWeight:'bold'
		}
	});
	
	buttonStopReset.add(lblStopReset);
	buttonsView.add(buttonStopReset);
	
	// 2eme bouton : go / lap
	var buttonStartLap = Ti.UI.createView({
		width:'50%',
		height:'100%',
		backgroundColor:'#727F7F'
	});
	
	var lblStartLap = Ti.UI.createLabel({
		text:'GO!',
		color:'#C0BFBF',
		textAlign:'center',
		verticalAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		font:{
			fontFamily:'Visitor TT1 BRK',
			fontSize:'25dp',
			fontWeight:'bold'
		}
	});
	
	buttonStartLap.add(lblStartLap);
	buttonsView.add(buttonStartLap);
	
	self.add(buttonsView);
	
	// Enfin on rajoute la TableView qui va contenir les différents laps
	var table = Ti.UI.createTableView({
		width:'100%',
		height:Ti.UI.FILL,
		backgroundColor:'#C0BFBF',
		separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE
	});
	
	self.add(table);
	
	buttonStartLap.addEventListener('click', function(e) {
		// Si ca tourne, on enregistre un nouveau lap
		if(running){
			var data = table.getData();

			// On rajoute un séparateur entre les précédents laps et les nouveaux, si on n'a pas fait de reset
			if(firstLap && !reallyFirst){
				//Ti.API.info("firstLap");
				var sep = Ti.UI.createTableViewRow({
					backgroundColor:'#404040'
				});
				
				var lblSep = Ti.UI.createView({
					height:'2px'
				})
				
				sep.add(lblSep);
				data.push(sep);
				firstLap = false;	
			}
			
			// Ajout du nouveau lap dans la liste
			var row = Ti.UI.createTableViewRow();
			var lbl = Ti.UI.createLabel({
				text:dh + ':' + dm + ':' + ds + '.' + ms,
				color:'#404040',
				textAlign:'center',
				verticalAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
				font:{
					fontFamily:'Visitor TT1 BRK',
					fontSize:'24dp',
					fontWeight:'bold'
				}
			});
			row.add(lbl);
			data.push(row);
			table.setData(data);
		}
		// Si ca tourne pas, on lance le chrono
		else{
			dateObj = new Date();
			running = true;
			lblStartLap.text = "LAP!";
			lblStopReset.text = "STOP";
			clocktimer = setInterval(startTimer, 1);
		}
	});
	
	buttonStopReset.addEventListener('click', function(e) {
		// Si ca tourne, on éteint le chrono
		if(running){
			reallyFirst = false;
			firstLap = true;
			running = false;
			clearInterval(clocktimer);
			lblStartLap.text = "GO!";
			lblStopReset.text = "RESET";
			label.text = "READY?";
			h = m = tm = 1;
			s = ts = ms = 0;
		}
		// Si ca tourne pas, on fait le reset des laps
		else{
			table.setData();
			firstLap = true;
			reallyFirst = true;
		}
	});
	
	return self;
}

var base = 60;
var label,clocktimer,dateObj,dh,dm,ds,ms;
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
	if(running){
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

module.exports = FirstView;
