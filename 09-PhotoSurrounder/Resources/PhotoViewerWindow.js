function PhotoViewerWindow(itemId) {
	var image = JSON.parse(itemId);

	var self = Ti.UI.createWindow({
		backgroundColor: '#000',
		navBarHidden: false //hack - setting this property ensures the window is "heavyweight" (associated with an Android activity)
	});

	var header = Ti.UI.createView({
		backgroundColor: '#c13100',
		zIndex: 10,
		top: 0,
		width: Ti.UI.FILL,
		height: 50
	});

	header.add(Ti.UI.createLabel({
		text: image.title,
		color: '#fff',   // No left so it is centered (tip)
		font:{
			fontSize: '18sp',
			fontWeight: 'bold'
		}
	}));

	var btnBack = Ti.UI.createImageView({
		image: 'back.png',
		left: 3
	});
	header.add(btnBack);

	var btnSave = Ti.UI.createImageView({
		image: 'save.png',
		right: 3
	});
	header.add(btnSave);

	self.add(header);

	var photoView = Ti.UI.createImageView({
		width: '100%',
		height: '100%',
		image: image.url_n
	});

	self.add(photoView);

	btnSave.addEventListener('click', function() {
		if (Ti.Android) {
			var tempDir = Ti.Filesystem.externalStorageDirectory;
			var newFile =Ti.Filesystem.getFile(tempDir, new Date().getTime() + '.jpg');
			var f = photoView.toImage();

			newFile.write(f.media);

			Ti.Media.Android.scanMediaFiles([newFile.nativePath], null, function(e) { });
		} else {
			Ti.Media.saveToPhotoGallery(photoView.toBlob());
		}

		Ti.UI.createAlertDialog({
			title: 'Photo Gallery',
			message: 'This photo has been added to your photo gallery'
		}).show();
	});

	btnBack.addEventListener('click', function() {
		self.close();
	});

	return self;
}

module.exports = PhotoViewerWindow;