function createMap() {
	var mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		animate: true,
		regionFit: true,
		userLocation: true
	});

	return mapview;
}

function createAnnotation(params) {
	var pin = Ti.Map.createAnnotation({
		latitude: params.lat,
		longitude: params.lon,
		title: params.title,
		pincolor: Titanium.Map.ANNOTATION_RED,
		animate: true
	});

	return pin;
}

exports.createAnnotation = createAnnotation;
exports.createMap = createMap;