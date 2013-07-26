function WebContentPage() {
	var htmlPage = Ti.UI.createWebView({
		url: 'webpage.html'
	});

	return htmlPage;
}

module.exports = WebContentPage;