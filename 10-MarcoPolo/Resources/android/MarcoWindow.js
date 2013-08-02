var lblStatus;
var longitude, latitude;


var MapModule = require('ti.map');

function MarcoWindow() {
	var self = Ti.UI.createWindow({
		title: 'Marco',
		backgroundColor: '#fff'
	});

	lblStatus = Ti.UI.createLabel();

var mountainView = MapModule.createAnnotation({
    latitude:"37.390749",
    longitude:"-122.081651",
    title:"Appcelerator Headquarters",
    subtitle:'Mountain View, CA',
    pincolor:MapModule.ANNOTATION_RED,
    myid:1 // Custom property to uniquely identify this annotation.
});

var mapview = MapModule.createView({
    mapType: MapModule.NORMAL_TYPE,
    region: {latitude:33.74511, longitude:-84.38993,
            latitudeDelta:0.01, longitudeDelta:0.01},
    animate:true,
    regionFit:true,
    userLocation:true,
    annotations:[mountainView]
});

	self.addEventListener('open', function() {
		findMe();

		Cloud.Places.search({
			// No params to get everyone
		}, function(e) {
			if (e.success) {
				var annotations = [];
				for (var i = 0; i < e.places.length; i++) {
					var place = e.places[i];

				/*	annotations.push(Titanium.Map.createAnnotation({
						latitude: place.latitude,
						longitude: place.longitude,
						title: place.name,
						pincolor: MapModule.ANNOTATION_RED,
						animate: true,
					}));*/
					Ti.API.debug('id: ' + place.id + '  name: ' + place.name + '  longitude: ' + place.longitude + '  latitude: ' + place.latitude);
				}

				//mapview.setAnnotations(annotations);
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
/*
		mapview.setRegion({
			latitude: latitude,
			longitude: longitude,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01
		});
*/
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