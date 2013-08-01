var lblStatus;
var longitude, latitude;

function MarcoWindow() {

	var self = Ti.UI.createWindow({
		title: 'Marco',
		backgroundColor: '#fff'
	});

/*
var mountainView = Titanium.Map.createAnnotation({
	latitude:37.390749,
	longitude:-122.081651,
	title:"Appcelerator Headquarters",
	subtitle:'Mountain View, CA',
	pincolor:Titanium.Map.ANNOTATION_PURPLE,
	animate:true,
	image: 'KS_nav_ui.png',
	leftButton: '../images/appcelerator_small.png',
	myid:1 // Custom property to uniquely identify this annotation.
});
*/
lblStatus = Ti.UI.createLabel();

var mapview = Titanium.Map.createView({
	mapType : Titanium.Map.STANDARD_TYPE,
	animate : true,
	regionFit : true,
	userLocation : true/*,
	annotations: [ mountainView ]*/
});



	self.addEventListener('open', function() {
		findMe();

		mapview.setRegion({
			latitude: latitude,
			longitude: longitude,
			latitudeDelta:0.01,
			longitudeDelta:0.01
		});
	});

	self.add(mapview);

	return self;
}


/// CBR will me externalised
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

module.exports = MarcoWindow;