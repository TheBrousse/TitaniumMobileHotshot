var GeolocationService = require('service/GeolocationService');

function PoloWindow() {
	var self = Ti.UI.createWindow({
		title: 'Polo',
		backgroundColor: '#f6fa9c',
		barColor: '#8C001a'
	});

	self.add(Ti.UI.createLabel({
		top: 17,
		width: '80%',
		height: Ti.UI.SIZE,
		color: '#000',
		text: 'Enter your name'
	}));

	var txtPlayerName = Ti.UI.createTextField({
		top: 40,
		width: '80%',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		value: Ti.App.Properties.getString('PLAYER_NAME', '')
	});

	self.add(txtPlayerName);

	var btnCheckin = Ti.UI.createView({
		width: 200,
		height: 200,
		backgroundColor: '#8ca93e',
		borderColor: '#fff',
		borderWidth: 6,
		borderRadius: '100%'
	});

	btnCheckin.add(Ti.UI.createLabel({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		color: '#fff',
		text: 'Polo',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {
			fontSize: '45sp',
			fontWeight: 'bold'
		}
	}));

	self.add(btnCheckin);

	var lblStatus = Ti.UI.createLabel({
		bottom: 0,
		width: Ti.UI.FILL,
		backgroundColor: '#6f0564',
		color: '#fff',
		opacity: 0.7,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	self.add(lblStatus);

	function pushToCloud(geo) {
		lblStatus.text = geo.status;

		var placeId = Ti.App.Properties.getString('PLACE_ID', '');

		if (!placeId) {	 // No place for this user yet
			Cloud.Places.create({
				name: txtPlayerName.value,
				latitude: geo.latitude,
				longitude: geo.longitude
			}, function(e) {
				if (e.success) {
					var place = e.places[0];

					Ti.App.Properties.setString('PLACE_ID', place.id);

					lblStatus.text = 'Position saved to Cloud!';
				} else {
					Ti.API.error(msg);
				}
			});
		} else {  // A place already exists, so we update it
			Cloud.Places.update({
				place_id: placeId,
				name: txtPlayerName.text,
				latitude: geo.latitude,
				longitude: geo.longitude
			}, function(e) {
				if (e.success) {
					lblStatus.text = 'Cloud position updated successfully!';
				} else {
					Ti.API.error(msg);
				}
			});
		}
	}

	btnCheckin.addEventListener('click', function(e) {
		if (txtPlayerName.value.length < 3) {
			alert('Please enter a valid name');
			return;
		}

		Ti.App.Properties.setString('PLAYER_NAME', txtPlayerName.value);

		lblStatus.text = 'Getting location, please wait...';
		GeolocationService.findMe(pushToCloud);
	});

	self.addEventListener('click', function() {
		txtPlayerName.blur();
	});

	return self;
}

module.exports = PoloWindow;