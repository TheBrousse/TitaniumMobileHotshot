// Load the native PageFlip Module
var PageFlip = require('ti.pageflip');

var win = Titanium.UI.createWindow({
    title: 'Interactive eBook for iPad',
    backgroundColor: 'black'
});

var v1 = Ti.UI.createView({ backgroundColor: 'red' });
var v2 = Ti.UI.createView({ backgroundColor: 'white' });
var v3 = Ti.UI.createView({ backgroundColor: 'blue' });
var v4 = require('mappage')();

var lblBottom = Ti.UI.createLabel({
		text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		left: 10,
		top: 10,
		width: '95%',
		height: Ti.UI.SIZE
	});
v1.add(lblBottom);

var pages = [v1, v2, v3, v4];

var pageflip = PageFlip.createView({
    /* All Options: TRANSITION_FLIP [default], TRANSITION_SLIDE, TRANSITION_FADE, TRANSITION_CURL */
    transition: PageFlip.TRANSITION_CURL,
    transitionDuration: 0.3,
    landscapeShowsTwoPages: true,
    pages: pages
});

win.add(pageflip);
//win.add(v4);

win.open();

//book.PageView(win, [require('webpage', require('mappage'), require('videopage'))]);