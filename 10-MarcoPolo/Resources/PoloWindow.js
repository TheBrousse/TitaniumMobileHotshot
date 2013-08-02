var lblStatus;
var longitude, latitude;

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
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	self.add(txtPlayerName);

	var btnCheckin = Ti.UI.createImageView({
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

	lblStatus = Ti.UI.createLabel({
		bottom: 0,
		width: Ti.UI.FILL,
		backgroundColor: '#6f0564',
		color: '#fff',
		opacity: 0.7,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	self.add(lblStatus);

	btnCheckin.addEventListener('click', function(evt) {
		if (txtPlayerName.value.length < 3) {
			alert('Please enter a valid name');
			return;
		}

		lblStatus.text = 'Uploading location, please wait...';
		var placeId = Ti.App.Properties.getString('PLACE_ID', '');

		if (!placeId) {	 // No pace for this user yet
			Cloud.Places.create({
				name: txtPlayerName.text,
				latitude: latitude,
				longitude: longitude
			}, function(e) {
				var place = e.places[0];

				Ti.App.Properties.setString('PLACE_ID', place.id);
				if (e.success) {
					lblStatus.text = 'Position registered successfully!';
				} else {
					error(e);
				}
			});
		} else {  // A place already exists, so we update it
			Cloud.Places.update({
				place_id: placeId,
				name: txtPlayerName.text,
				latitude: latitude,
				longitude: longitude
			}, function(e) {
				if (e.success) {
					lblStatus.text = 'Position updated successfully!';
				} else {
					error(e);
				}
			});
		}

	});

	self.addEventListener('click', function() {
		txtPlayerName.blur();
	});
	self.addEventListener('open', findMe);

	return self;
}

function findMe(statusLabel) {
	lblStatus.text = 'Geolocating...';

	if (Ti.Geolocation) {
		Ti.Geolocation.purpose = 'To find current location.';
		Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
		Ti.Geolocation.distanceFilter = 0;

		Ti.Geolocation.getCurrentPosition(function (e) {
			if (!e.success || e.error) {
				lblStatus.text = 'GPS lost';
			}
			else {
				lblStatus.text = 'Location determined...';

				latitude = e.coords.latitude;
				longitude = e.coords.longitude;
			}
		});
	}
	else {
		Cloud.Clients.geolocate(function (e) {
			if (e.success) {
				lblStatus.text = 'Location determined...';

				latitude = e.location.latitude;
				longitude = e.location.longitude;
			}
			else {
				lblStatus.text = 'GPS lost';
			}
		});
	}
}


function error(e) {
	var msg = (e.error && e.message) || JSON.stringify(e);
	if (e.code) {
		alert(msg);
	} else {
		Ti.API.error(msg);
	}
}

module.exports = PoloWindow;