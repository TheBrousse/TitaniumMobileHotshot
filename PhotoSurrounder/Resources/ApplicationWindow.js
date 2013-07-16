var DetailWindow = require('DetailWindow');

function ApplicationWindow() {

	var FLICKR_KEY = '48920d0d16a507334ff621ec016e56e4';
	var longitude;
	var latitude;

	var self = Ti.UI.createWindow({
		backgroundColor: '#fffbd0'
	});

	Ti.Geolocation.purpose = "Getting device location to search photos nearby.";

	self.addEventListener('open', function() {
		Titanium.Geolocation.getCurrentPosition(function(e) {
			if (!e.success || e.error) {
				Ti.API.error(JSON.stringify(e.error));
				alert('error ' + JSON.stringify(e.error));

				return;
			}

			longitude = e.coords.longitude;
			latitude = e.coords.latitude;

			Titanium.API.info('geo - current location:  long ' + longitude + ' lat ' + latitude);

			self.refreshData();
		});
	});

	var header = Ti.UI.createView({
		backgroundColor: '#c13100',
		top: 0,
		width: Ti.UI.FILL,
		height: 50
	});

	header.add(Ti.UI.createLabel({
		text: 'Photos',
		color: '#fff',
		left: 10,
		font:{
			fontSize: '22sp',
			fontWeight: 'bold'
		}
	}));

	var btnRefresh = Ti.UI.createImageView({
		image: 'refresh.png',
		right: 3
	});
	header.add(btnRefresh);

	self.add(header);

	btnRefresh.addEventListener('click', function() {
		self.refreshData();
	});

	var plainTemplate = {
		properties: {
			height: 60,
			accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
		},
		childTemplates: [{
			type: 'Ti.UI.ImageView', // Use an image view
			bindId: 'pic', // Bind ID for this image view
			properties: {// Sets the ImageView.image property
				left: 0,
				width: 45
			}
		}, {
			type: 'Ti.UI.Label', // Use a label
			bindId: 'rowtitle', // Bind ID for this label
			properties: {// Sets the Label.left property
				left: 48,
				top: 1,
				color: '#cc6600'
			}
		}, {
			type: 'Ti.UI.Label', // Use a label
			bindId: 'coordinates', // Bind ID for this label
			properties: {// Sets the Label.left property
				left: 48,
				bottom: 2,
				width: '75%',
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				color: '#fff',
				backgroundColor: '#ff9900',
				font: {
					size: '6sp'
				}

			}
		}]
	};

	var listView = Ti.UI.createListView({
		top: 50,
		// Maps the plainTemplate object to the 'plain' style name
		templates : {
			'plain' : plainTemplate
		},
		// Use the plain template, that is, the plainTemplate object defined earlier
		// for all data list items in this list view
		defaultItemTemplate : 'plain'
	});

	var xhr = Titanium.Network.createHTTPClient();
	xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.onload = function() {
		var json = JSON.parse(this.responseText),
			jsonImages = json.photos.photo,
			images = [],
			preview = [],
			image;

		for (index in jsonImages) {
			image = jsonImages[index];
			images[index] = image;
			preview[index] = image.url_t;
		}

		var data = [];

		for (var i = 0; i < images.length; i++) {
			data.push({
				// Maps to the rowtitle component in the template
				// Sets the text property of the Label component
				rowtitle: {
					text: images[i].title
				},
				pic: {
					image: preview[i]
				},
				coordinates: {
					text: images[i].longitude + ', ' + images[i].latitude
				},
				// Sets the regular list data properties
				properties: {
					itemId: JSON.stringify(images[i]), // It only uses a string on Android
				}
			});
		}

		var section = Ti.UI.createListSection({
			items : data
		});

		listView.appendSection(section);
	};

	self.add(listView);

	listView.addEventListener('itemclick', function(e){
	    var detailWin = new DetailWindow(e.itemId);

	    detailWin.open();
	});

	self.refreshData = function() {
		listView.deleteSectionAt(0);

		xhr.open('GET', 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
					+ FLICKR_KEY +'&has_geo=true'
					+ '&lat=' + latitude
					+ '&lon=' + longitude
					+ '&extras=geo%2Curl_t%2Curl_n&format=json&nojsoncallback=1');
		xhr.send();
	}

	return self;
};

module.exports = ApplicationWindow;