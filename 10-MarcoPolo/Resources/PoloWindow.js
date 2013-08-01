

var lblStatus;
var longitude, latitude;

function PoloWindow() {

	var self = Ti.UI.createWindow({
		title: 'Polo',
		backgroundColor: '#ff4321'
	});


	var btnCheckin = Ti.UI.createImageView({
		width: 100,
		height: 100,
		backgroundColor: 'red'
	});

	self.add(btnCheckin);

	lblStatus = Ti.UI.createLabel({
		bottom: 100,
		width: Ti.UI.FILL,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	self.add(lblStatus);

	btnCheckin.addEventListener('click', function(evt) {
		lblStatus.text = 'Checking in, please wait...';
		
		Cloud.Places.create({
			name: 'Joe Jambon',
			latitude: latitude,
			longitude: longitude
		}, function(e) {
			if (e.success) {
				alert('Checked in!');
			} else {
				error(e);
			}
		})
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
				lblStatus.text = 'GPS lost, looking nearby...';
			}
			else {
				lblStatus.text = 'Located, looking nearby...';

				latitude = e.coords.latitude;
				longitude = e.coords.longitude;
			}
		});
	}
	else {
		Cloud.Clients.geolocate(function (e) {
			if (e.success) {
				lblStatus.text = 'Located, looking nearby...';

				latitude = e.location.latitude;
				longitude = e.location.longitude;
			}
			else {
				lblStatus.text = 'GPS lost, looking nearby...';
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