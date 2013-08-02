exports.findMe = function(lblStatus) {
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