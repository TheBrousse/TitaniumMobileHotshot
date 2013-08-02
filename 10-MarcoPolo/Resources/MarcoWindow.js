var lblStatus;
var longitude, latitude;

var GeolocationService = require('service/GeolocationService');

function MarcoWindow() {

	var self = Ti.UI.createWindow({
		title: 'Marco',
		backgroundColor: '#fff',
		barColor: '#8C001a'
	});

	lblStatus = Ti.UI.createLabel();

	var mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		animate: true,
		regionFit: true,
		userLocation: true
	});

	self.addEventListener('open', function() {
		GeolocationService.findMe(lblStatus);

		Cloud.Places.search({
			// No params to get everyone
		}, function(e) {
			if (e.success) {
				var annotations = [];
				for (var i = 0; i < e.places.length; i++) {
					var place = e.places[i];

					annotations.push(Titanium.Map.createAnnotation({
						latitude: place.latitude,
						longitude: place.longitude,
						title: place.name,
						pincolor: Titanium.Map.ANNOTATION_RED,
						animate: true,
					}));
					Ti.API.debug('id: ' + place.id + '  name: ' + place.name + '  longitude: ' + place.longitude + '  latitude: ' + place.latitude);
				}

				mapview.setAnnotations(annotations);
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});

		mapview.setRegion({
			latitude: latitude,
			longitude: longitude,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01
		});
	});

	self.add(mapview);

	return self;
}

/// CBR will be externalised
function findMe(statusLabel) {
	lblStatus.text = 'Geolocating...';

	if (Ti.Geolocation) {
		Ti.Geolocation.purpose = 'To find current location.';
		Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
		Ti.Geolocation.distanceFilter = 0;

		Ti.Geolocation.getCurrentPosition(function(e) {
			if (!e.success || e.error) {
				lblStatus.text = 'GPS lost';
			} else {
				lblStatus.text = 'Location determined...';

				latitude = e.coords.latitude;
				longitude = e.coords.longitude;
			}
		});
	} else {
		Cloud.Clients.geolocate(function(e) {
			if (e.success) {
				lblStatus.text = 'Location determined...';

				latitude = e.location.latitude;
				longitude = e.location.longitude;
			} else {
				lblStatus.text = 'GPS lost';
			}
		});
	}
}

module.exports = MarcoWindow;