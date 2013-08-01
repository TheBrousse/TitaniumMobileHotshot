function MarcoWindow() {
	var self = Ti.UI.createWindow({
		title: 'Marco',
		backgroundColor: '#eeeeee'
	});

	
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



var mapview = Titanium.Map.createView({
	mapType : Titanium.Map.STANDARD_TYPE,
		region: {latitude:33.74511, longitude:-84.38993,
				latitudeDelta:0.01, longitudeDelta:0.01},
	animate : true,
	regionFit : true,
	userLocation : true,
	annotations: [ mountainView ]
});

function translateErrorCode(code) {
		if (code == null) {
			return null;
		}
		switch (code) {
			case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
				return "Location unknown";
			case Ti.Geolocation.ERROR_DENIED:
				return "Access denied";
			case Ti.Geolocation.ERROR_NETWORK:
				return "Network error";
			case Ti.Geolocation.ERROR_HEADING_FAILURE:
				return "Failure to detect heading";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
				return "Region monitoring access denied";
			case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
				return "Region monitoring access failure";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
				return "Region monitoring setup delayed";
		}
	}

self.addEventListener('open', function() {
	self.openedflag = 1;
	Ti.Geolocation.purpose = "Getting User Position";
	Ti.Geolocation.getCurrentPosition(function(e) {
		if (!e.success || e.error) {
			//currentLocation.text = 'error: ' + JSON.stringify(e.error);
			Ti.API.info("Code translation: " + translateErrorCode(e.code));
			alert('error ' + JSON.stringify(e.error));
			return;
		}

		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;
		Ti.API.info('speed ' + speed);
		//currentLocation.text = 'long:' + longitude + ' lat: ' + latitude;

		Ti.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);

		mapview.setRegion({
			latitude: latitude,
			longitude: longitude,
			latitudeDelta:0.01,
			longitudeDelta:0.01
		});
	});
});

// self.add(mapview);

	return self;
}

module.exports = MarcoWindow;