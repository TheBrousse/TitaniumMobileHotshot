function VideoContentPage() {
	var self = Ti.UI.createView({ backgroundColor: 'blue' });

	var embeddedVideo = Titanium.Media.createVideoPlayer({
		url:'videopage.mp4',
		backgroundColor:'#111',
		mediaControlStyle: Titanium.Media.VIDEO_CONTROL_EMBEDDED,
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		top: 10,
		width: '60%',
		height: '60%',
		autoplay: false
	});

	var lblBottom = Ti.UI.createLabel({
		text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut odio. Nam sed est. Nam a risus et est iaculis adipiscing. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer ut justo. In tincidunt viverra nisl. Donec dictum malesuada magna. Curabitur id nibh auctor tellus adipiscing pharetra. Fusce vel justo non orci semper feugiat. Cras eu leo at purus ultrices tristique.\nDuis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
		bottom: 25,
		width: '100%',
		height: Ti.UI.SIZE,
		zIndex: 999
	});

	self.add(embeddedVideo);
	self.add(lblBottom);
	
	return embeddedVideo;
}

module.exports = VideoContentPage;