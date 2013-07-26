function MapContentPage() {
	var map = Ti.Map.createView({
	    mapType: Ti.Map.SATELLITE_TYPE,
	    animate: true,
	    regionFit: true,
	    userLocation: false,
	    region: { 
	    	latitude: 48.8587011132514,
	    	longitude: 2.2942328453063965,
	    	latitudeDelta: 0.01, 
	    	longitudeDelta: 0.01
	    },
	    touchEnabled: false
	});

	return map;
}

module.exports = MapContentPage;