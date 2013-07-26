function VideoContentPage() {
	var embeddedVideo = Titanium.Media.createVideoPlayer({
		url: 'videopage.mp4',
		backgroundColor: '#111',
		mediaControlStyle: Titanium.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
		autoplay: false
	});

	return embeddedVideo;
}

module.exports = VideoContentPage;