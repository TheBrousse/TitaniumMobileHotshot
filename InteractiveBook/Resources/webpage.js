function WebContentPage() {
	var self = Ti.UI.createView({ backgroundColor: 'green' });

	var htmlPage = Ti.UI.createWebView({
		url: 'webpage.html'
	});

	self.add(htmlPage);

	return self;
}

module.exports = WebContentPage;