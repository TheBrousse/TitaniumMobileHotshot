var fb = require('facebook');

var win = Ti.UI.createWindow({
	title: 'Unified Status',
	backgroundColor: '#fff'
});

win.add(Ti.UI.createLabel({
	text : 'Post a status:',
	top : 3,
	left: 3,
	width : Ti.UI.SIZE
}));

var txtStatus = Ti.UI.createTextArea({
	top: 15,
	maxLength: 140,
	height: 100,
	top: 37,
	width: '90%',
	borderWidth: 3,
	borderRadius: 4,
	borderColor: '#000',
	color: '#000',
	font: {
	    fontSize: '16sp'
	}
});

var lblCount = Ti.UI.createLabel({
	text: '0/140',
	top: 210,
	width: '100%',
	textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
});

txtStatus.addEventListener('change', function(e) {
	lblCount.text = e.value.length + '/140';
});

win.add(lblCount);
win.add(txtStatus);

fb.appid = '561673983883162';
fb.permissions = ['publish_actions'];
fb.forceDialogAuth = true;

fb.addEventListener('login', function(e) {
    if (e.success) {
        alert('Logged In');
        Ti.API.debug("http://graph.facebook.com/"+e.uid+"/picture");
      //  Ti.API.info(e);
    } else if (e.error) {
        alert(e.error);
    } else if (e.cancelled) {
        alert("Canceled");
    }
});

fb.addEventListener('logout', function(e) {
    alert('Logged out');
});

//cbr later fb.logout();

fb.authorize();


var btnFb = Ti.UI.createButton({
	title: 'Post on facebook'
});

//CBR win.add(btnFb);

btnFb.addEventListener('click', function(e) {
	fb.requestWithGraphPath('me/feed', {message: "First test port from new app. (Please ignore)"},
         "POST", function(e) {
    if (e.success) {
        alert("Success!  From FB: " + e.result);
    } else {
        if (e.error) {
            alert(e.error);
            Ti.API.debug(e);
        } else {
            alert("Unkown result");
        }
    }
});
});

/*
function showRequestResult(e) {
	var s = '';
	if (e.success) {
		s = "SUCCESS";
		if (e.result) {
			s += "; " + e.result;
		}
		if (e.data) {
			s += "; " + e.data;
		}
		if (!e.result && !e.data) {
			s = '"success", but no data from FB.  I am guessing you cancelled the dialog.';
		}
	} else if (e.cancelled) {
		s = "CANCELLED";
	} else {
		s = "FAIL";
		if (e.error) {
			s += "; " + e.error;
		}
	}
	alert(s);
}

var login = facebook.createLoginButton({
	top : 10
});
login.style = facebook.BUTTON_STYLE_NORMAL;
win.add(login);

var actionsView = Ti.UI.createView({
	top : 55,
	left : 0,
	right : 0,
	visible : facebook.loggedIn,
	height : 'auto'
});

facebook.addEventListener('login', function(e) {
	if (e.success) {
		actionsView.show();
	}
	if (e.error) {
		alert(e.error);
	}
});

facebook.addEventListener('logout', function(e) {
	Ti.API.info('logout event');
	actionsView.hide();
});

var statusText = Ti.UI.createTextField({
	top : 0,
	left : 10,
	right : 10,
	height : 40,
	hintText : 'Enter your FB status'
});
actionsView.add(statusText);
var statusBtn = Ti.UI.createButton({
	title : 'Publish status with GRAPH API',
	top : 45,
	left : 10,
	right : 10,
	height : 40
});
statusBtn.addEventListener('click', function() {
	var text = statusText.value;
	if ((text === '')) {
		Ti.UI.createAlertDialog({
			tile : 'ERROR',
			message : 'No text to Publish !! '
		}).show();
	} else {
		facebook.requestWithGraphPath('me/feed', {
			message : text
		}, "POST", showRequestResult);
	}
});
actionsView.add(statusBtn);



// iOS BUG: Android does some kind of layout magic here which:
// 1. Positions the text correctly so that it doesn't overlap with other UI elements
// 2. Possibly even SIZES the text.
if (Titanium.Platform.name == 'android') {
	var description = "FYI, the 'Publish wall post with GRAPH API' button will publish a post with a link to the Mozilla MDN JavaScript page, saying 'Best online Javascript reference'.\n\nDo the 'Publish wall post with DIALOG' option more than once, and be sure the 'iteration n' gets incremented each time.  This proves that cached post data is *not* being re-used, which is important.";
	actionsView.add(Ti.UI.createLabel({
		bottom : 10,
		text : description
	}));
}

win.add(actionsView);
*/
win.open();
