function MapContentPage() {
	var self = Ti.UI.createView({ backgroundColor: 'orange' });

	var lblLeft = Ti.UI.createLabel({
		text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut odio. Nam sed est. Nam a risus et est iaculis adipiscing. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer ut justo. In tincidunt viverra nisl. Donec dictum malesuada magna. Curabitur id nibh auctor tellus adipiscing pharetra. Fusce vel justo non orci semper feugiat. Cras eu leo at purus ultrices tristique.\nDuis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et.',
		left: 10,
		top: 10,
		width: '50%',
		height: Ti.UI.SIZE
	});

	var map = Ti.Map.createView({
	    mapType: Ti.Map.STANDARD_TYPE,
	    animate: true,
	    regionFit: true,
	    userLocation: true,
	    right: 10,
	    top: 10,
	    width: '45%',
	    height: 250
	});

	var lblBottom = Ti.UI.createLabel({
		text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut odio. Nam sed est. Nam a risus et est iaculis adipiscing. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer ut justo. In tincidunt viverra nisl. Donec dictum malesuada magna. Curabitur id nibh auctor tellus adipiscing pharetra. Fusce vel justo non orci semper feugiat. Cras eu leo at purus ultrices tristique.\nDuis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Eum ad nonumy dicunt. Ex mei suas omnes. Reque prompta interpretaris cu mea. Te tota inimicus forensibus mel.\n\nLaoreet admodum est ea. Ut simul possim minimum sit. Accusam indoctum mediocritatem usu an, vel ut odio possim labores, assum euripidis instructior vix eu. Eu esse atqui has. Apeirian detraxit duo no. Qui ridens dolorum vivendum ex, vel te nulla adipiscing disputando, vix cu ocurreret mediocritatem. Ut errem laboramus forensibus usu.',
		left: 10,
		top: 270,
		width: '95%',
		height: Ti.UI.SIZE
	});

	self.add(lblLeft);
	self.add(map);
	self.add(lblBottom);
	
	return self;
}

module.exports = MapContentPage;