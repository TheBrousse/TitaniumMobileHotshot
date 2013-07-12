function DetailWindow(param) {
	var image = JSON.parse(param);

	var self = Ti.UI.createWindow({
		backgroundColor: '#000',
		navBarHidden: false   //hack - setting this property ensures the window is "heavyweight" (associated with an Android activity)
	});
Ti.API.info('http://farm' + image.farm + '.staticflickr.com/' + image.server + '/' + image.id + '_' + image.secret + '_n.jpg');
	 var image = Ti.UI.createImageView({
		 image: 'http://farm' + image.farm + '.staticflickr.com/' + image.server + '/' + image.id + '_' + image.secret + '_n.jpg'
	 });

	 self.add(image);



/*
		 view.addEventListener('change', function(e) {
		 labelTitle.setText(image.title);
		 });

		 view.addEventListener('click', function(e) {
		 var detail = Ti.UI.createWindow({
		 title: image.title,
		 backgroundColor: '#000'
		 });

		 var image = Ti.UI.createImageView({
		 image: 'http://farm' + image.farm + '.staticflickr.com/' + image.server + '/' + image.id + '_' + image.secret + '_n.jpg'
		 });

		 detail.add(image);

		 detail.open();
		 });

		 activityIndicator.hide();
		 self.add(view);
		 self.add(labelTitle);
*/


	return self;
}

module.exports = DetailWindow;


