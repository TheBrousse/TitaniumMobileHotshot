var MapModule = require('ti.map');

function createMap() {
	var mapview = MapModule.createView({
		mapType: MapModule.NORMAL_TYPE,
		animate:true,
		regionFit:true,
		userLocation:true
	});

	return mapview;
}

function createAnnotation(params) {
	var pin = MapModule.createAnnotation({
		latitude: place.latitude,
		longitude: place.longitude,
		title: place.name,
		pincolor: MapModule.ANNOTATION_RED,
	});

	return pin;
}

exports.createAnnotation = createAnnotation;
exports.createMap = createMap;