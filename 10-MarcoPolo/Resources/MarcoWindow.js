var GeolocationService = require('service/GeolocationService');
var Map = require('Map');

function MarcoWindow() {
	var self = Ti.UI.createWindow({
		title: 'Marco',
		backgroundColor: '#fff',
		barColor: '#8C001a'
	});

	var mapView = Map.createMap();

	self.add(mapView);

	function updateMap(geo) {
		Cloud.Places.search({
			// No params to get everyone
		}, function(e) {
			if (e.success) {
				var annotations = [];
				for (var i = 0; i < e.places.length; i++) {
					var place = e.places[i];

					annotations.push(Map.createAnnotation({
						lat: place.latitude,
						lon: place.longitude,
						title: place.name
					}));
					Ti.API.debug('id: ' + place.id + '  name: ' + place.name + '  longitude: ' + place.longitude + '  latitude: ' + place.latitude);
				}

				mapView.setAnnotations(annotations);
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});

		mapView.setRegion({
			latitude: geo.latitude,
			longitude: geo.longitude,
			animate: true,
			latitudeDelta:0.75,
			longitudeDelta:0.75
		});
	}

	self.addEventListener('open', function() {
		GeolocationService.findMe(updateMap);
	});

	return self;
}

module.exports = MarcoWindow;