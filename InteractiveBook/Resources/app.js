// Load the native PageFlip Module
var PageFlip = require('ti.pageflip');

var win = Titanium.UI.createWindow({
    title: 'Interactive eBook for iPad',
    backgroundColor: 'black'
});

var v1 = Ti.UI.createView({ backgroundColor: 'red' });
var v2 = require('videopage')();
var v3 = Ti.UI.createView({ backgroundColor: 'blue' });
var v4 = require('mappage')();
var v5 = require('webpage')();

var pages = [v1, v2, v3, v4, v5];

v2.add(Ti.UI.createButton({ title: 'button 1'}));

var pageflip = PageFlip.createView({
    /* All Options: TRANSITION_FLIP [default], TRANSITION_SLIDE, TRANSITION_FADE, TRANSITION_CURL */
    transition: PageFlip.TRANSITION_CURL,
    transitionDuration: 0.3,
    landscapeShowsTwoPages: false,
    pages: pages
});

win.add(pageflip);



win.open();

//book.PageView(win, [require('webpage', require('mappage'), require('videopage'))]);