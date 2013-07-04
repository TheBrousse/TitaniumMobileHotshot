var fb = require('facebook');
var social = require('social_plus');

var win = Ti.UI.createWindow({
	title: 'Unified Status',
	backgroundGradient: {
			type: 'linear',
			startPoint: { x: '0%', y: '0%' },
			endPoint: { x: '0%', y: '100%' },
			colors: [ { color: '#813eba'}, { color: '#000' } ]
		}
});

win.add(Ti.UI.createLabel({
	text: 'Post a message',
	color: '#fff',
	top: 4,
	width: '90%',
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	font: {
		fontSize: '22sp'
	}
}));

var txtStatus = Ti.UI.createTextArea({
	top: 37,
	width: '90%',
	height: 100,
	color: '#000',
	maxLength: 140,
	borderWidth: 3,
	borderRadius: 4,
	borderColor: '#401b60',
	font: {
		fontSize: '16sp'
	}
});

var lblCount = Ti.UI.createLabel({
	text: '0/140',
	top: 134,
	width: '90%',
	color: '#fff',
	textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
});

txtStatus.addEventListener('change', function(e) {
	lblCount.text = e.value.length + '/140';

	if (e.value.length > 120) {
		lblCount.color = '#ff0000';
	} else {
		lblCount.color = '#fff'
	}

	btnPost.enabled = !(e.value.length === 0);
});

win.add(lblCount);
win.add(txtStatus);

var btnPost = Ti.UI.createButton({
	title: 'Post',
	top: 140
});

win.add(btnPost);

win.addEventListener('click', function() {
	txtStatus.blur();
});

var bottomView = Ti.UI.createView({
	bottom: 4,
	width: '90%',
	height: Ti.UI.SIZE
});

var fbView = Ti.UI.createImageView({
	backgroundColor: '#3B5998',
	image: 'images/fb-logo-disabled.png',
	borderRadius: 4,
	width: 100,
	left: 10,
	height: 100
});

fbView.addEventListener('click', function() {
	toggleFacebook(!fb.loggedIn);
});

bottomView.add(fbView);

var twitView = Ti.UI.createImageView({
	backgroundColor: '#9AE4E8',
	image: 'images/twitter-logo-disabled.png',
	borderRadius: 4,
	width: 100,
	right: 10,
	height: 100
});

twitView.addEventListener('click', function() {
	toggleTwitter(!twitter.isAuthorized())
});

bottomView.add(twitView);

win.add(bottomView);

if (Ti.Platform.osname == "android") {
	var activity = Ti.Android.currentActivity;

	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		var menuItem = menu.add({
			title: "Settings"
		});

		menuItem.setIcon(Ti.Android.R.drawable.ic_menu_preferences);

		menuItem.addEventListener("click", function(e) {
			Ti.UI.Android.openPreferences();
		});
	};
}

function toggleFacebook(isActive) {
	if (isActive) {
		if (!fb.loggedin) {
			fb.authorize();
		}
	} else {
		fb.logout();
	}

	Ti.App.Properties.setBool('facebook_preference', isActive);
}

function toggleTwitter(isActive) {
	if (isActive) {
		if (!twitter.isAuthorized()) {
			 twitter.authorize(function() {
				twitView.image = 'images/twitter-logo.png';
			 });
		} else {
			twitView.image = 'images/twitter-logo.png';
		}
	} else {
		 twitter.deauthorize();
		 twitView.image = 'images/twitter-logo-disabled.png';
	}

	Ti.App.Properties.setBool('twitter_preference', isActive);
}

function postFacebookMessage(msg) {
	fb.requestWithGraphPath('me/feed', {
			message: msg
		}, "POST", function(e) {
			if (e.success) {
				Ti.API.info("Success!  From FB: " + e.result);
			} else {
				if (e.error) {
					alert(e.error);
					Ti.API.error(e);
				} else {
					alert("Unkown result from Facebook");
				}
			}
		}
	);
}

function postTwitterMessage(msg) {
	twitter.share({
		message: msg,
		success: function() {
			Ti.API.info('Tweeted!');
		},
		error: function() {
			alert('ERROR from Twitter Tweeter');
		}
	});
}

function loadSettings() {
	Ti.API.info('Facebook ' + Ti.App.Properties.getBool('facebook_preference'));
	Ti.API.info('Twitter ' + Ti.App.Properties.getBool('twitter_preference'));

	var enableFacebook = Ti.App.Properties.getBool('facebook_preference');
	var enableTwitter = Ti.App.Properties.getBool('twitter_preference');

	if (enableFacebook) {
		toggleFacebook(enableFacebook);
	}

	if (enableTwitter) {
		toggleTwitter(enableTwitter);
	}
}


/////////// FACEBOOK
fb.appid = Ti.App.Properties.getString('ti.facebook.appid');
//fb.appid = '561673983883162'
fb.permissions = ['publish_actions'];

fb.addEventListener('login', function(e) {
	if (e.success) {
		fbView.image = 'images/fb-logo.png';
		Ti.API.debug("http://graph.facebook.com/"+e.uid+"/picture");
	  //  Ti.API.info(e);
	} else if (e.error) {
		alert(e.error);
	} else if (e.cancelled) {
		alert("Canceled");
	}
});

fb.addEventListener('logout', function(e) {
	fbView.image = 'images/fb-logo-disabled.png';
});

///////////////// TWITTER
var twitter = social.create({
	consumerSecret: Ti.App.Properties.getString('twitter.consumerSecret'),
	consumerKey: Ti.App.Properties.getString('twitter.consumerKey')
});

btnPost.addEventListener('click', function() {

	if (fb.loggedIn) {
		postFacebookMessage(txtStatus.value);
	}

	if (twitter.isAuthorized()) {
		postTwitterMessage(txtStatus.value);
	}

	txtStatus.blur();
	txtStatus.value = '';
	lblCount.text = '0/140';
});

loadSettings();

win.open();
