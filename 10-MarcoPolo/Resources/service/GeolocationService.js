function findMe() {
	var status,	lat, lon;

	if (Ti.Geolocation) {
		Ti.Geolocation.purpose = 'To find current location.';
		Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
		Ti.Geolocation.distanceFilter = 0;

		Ti.Geolocation.getCurrentPosition(function (e) {
			if (!e.success || e.error) {
				status = 'GPS lost';
			}
			else {
				status = 'Location determined...';

				lat = e.coords.latitude;
				lon = e.coords.longitude;
			}
		});
	} else {
		Cloud.Clients.geolocate(function (e) {
			if (e.success) {
				status = 'Location determined...';

				lat = e.location.latitude;
				lon = e.location.longitude;
			}
			else {
				status = 'GPS lost';
			}
		});
	}

	return {
		status: status,
		longitude: lon,
		latitude: lat
	};
}

exports.findMe = findMe;