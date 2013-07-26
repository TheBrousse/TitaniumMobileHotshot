// Load the native PageFlip Module
var PageFlip = require('ti.pageflip');

var win = Titanium.UI.createWindow({
    title: 'Interactive eBook for iPad'/*,
    orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT ]*/
});

var page1 = require('webpage')();
var page2 = require('videopage')();
var page3 = require('mappage')();

var pageflip = PageFlip.createView({
    /* All Options: TRANSITION_FLIP [default], TRANSITION_SLIDE, TRANSITION_FADE, TRANSITION_CURL */
    transition: PageFlip.TRANSITION_CURL,
    transitionDuration: 0.3,
    landscapeShowsTwoPages: false,
    pages: [ page1, page3, page2 ]
});

win.add(pageflip);

win.open();