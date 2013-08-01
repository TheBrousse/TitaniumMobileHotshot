var Cloud = require('ti.cloud');
Cloud.debug = true;

if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

function createAppUser() {
	Cloud.Users.create({
		username: Ti.App.id,
		password: '12345',
		password_confirmation: '12345',
		first_name: 'Marco',
		last_name: 'Polo App'

	}, function (e) {
		 if (e.success) {
	        var user = e.users[0];
	        alert('Success:\n' +
	            'id: ' + user.id + '\n' +
	            'sessionId: ' + Cloud.sessionId + '\n' +
	            'first name: ' + user.first_name + '\n' +
	            'last name: ' + user.last_name);
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function loginAppUser() {
	Cloud.Users.login({
	    login: Ti.App.id,
	    password: '12345'
	}, function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        alert('Success:\n' +
	            'id: ' + user.id + '\n' +
	            'sessionId: ' + Cloud.sessionId + '\n' +
	            'first name: ' + user.first_name + '\n' +
	            'last name: ' + user.last_name);

	        //deleteAppUser();
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function deleteAppUser() {
	Cloud.Users.remove(function (e) {
	    if (e.success) {
	        alert('Success: Removed');
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

// This is a single context application with mutliple windows in a stack
(function() {
	var tabs = Ti.UI.createTabGroup();

	//create app tabs
	var winMarco = require('MarcoWindow')();
	var winPolo = require('PoloWindow')();

	var tabMarco = Ti.UI.createTab({
		title: 'Marco',
		icon: 'KS_nav_ui.png',
		window: winMarco
	});

	var tabPolo = Ti.UI.createTab({
		title: 'Polo',
		icon: 'KS_nav_views.png',
		window: winPolo
	});

	tabs.addTab(tabMarco);
	tabs.addTab(tabPolo);

	tabs.open();

	loginAppUser();
})();