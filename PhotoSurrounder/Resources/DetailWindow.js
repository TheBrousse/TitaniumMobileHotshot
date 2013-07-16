function DetailWindow(param) {

	var image = JSON.parse(param);

	var self = Ti.UI.createWindow({
		backgroundColor: '#000',
		navBarHidden: false //hack - setting this property ensures the window is "heavyweight" (associated with an Android activity)
	});

	var header = Ti.UI.createView({
		backgroundColor: '#e66a3d',
		zIndex: 10,
		top: 0,
		width: Ti.UI.FILL,
		height: 50
	});

	header.add(Ti.UI.createLabel({
		text: image.title,
		color: '#fff',   // No left so it is centered (tip)
		font:{
			fontSize: '22sp',
			fontWeight: 'bold'
		}
	}));

	var btnClose = Ti.UI.createImageView({
		image: 'back.png',
		left: 3
	});
	header.add(btnClose);

	if (!Ti.Android) {
		var btnSave = Ti.UI.createImageView({
			image: 'save.png',
			right: 3
		});
		header.add(btnSave);

		btnSave.addEventListener('click', function() {
			Titanium.Media.saveToPhotoGallery(photoView.toBlob());

			Titanium.UI.createAlertDialog({title:'Photo Gallery',message:'Check your photo gallery'}).show();
		});
	}

	self.add(header);

	var photoView = Ti.UI.createImageView({
		width: '100%',
		height: '100%',
//CBR old		image: 'http://farm' + image.farm + '.staticflickr.com/' + image.server + '/' + image.id + '_' + image.secret + '_n.jpg'
		image: image.url_n
	});

	self.add(photoView);

	btnClose.addEventListener('click', function() {
		self.close();
	});




/*
		 view.addEventListener('change', function(e) {
		 labelTitle.setText(image.title);
		 });

		 activityIndicator.hide();
		 self.add(view);
		 self.add(labelTitle);
*/


	return self;
}

module.exports = DetailWindow;