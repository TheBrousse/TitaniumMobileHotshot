function findMe(callback) {
	var status,	lat, lon;

	if (Ti.Geolocation) {
		Ti.Geolocation.purpose = 'To find current location.';
		Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;

		Ti.Geolocation.getCurrentPosition(function (e) {
			if (!e.success || e.error) {
				status = 'GPS lost';
			}
			else {
				status = 'Location acquired';

				lat = e.coords.latitude;
				lon = e.coords.longitude;
			}
			callback({
				status: status,
				longitude: lon,
				latitude: lat
			});
		});
	} else {
		Cloud.Clients.geolocate(function (e) {
			if (e.success) {
				status = 'Location acquired';

				lat = e.location.latitude;
				lon = e.location.longitude;
			}
			else {
				status = 'GPS lost';
			}
			callback({
				status: status,
				longitude: lon,
				latitude: lat
			});
		});
	}
}

exports.findMe = findMe;