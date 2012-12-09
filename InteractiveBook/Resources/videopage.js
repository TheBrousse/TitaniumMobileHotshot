function VideoContentPage() {
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

	return embeddedVideo;
}

module.exports = VideoContentPage;