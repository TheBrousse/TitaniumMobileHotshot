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
		text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut odio. Nam sed est. Nam a risus et est iaculis adipiscing. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer ut justo. In tincidunt viverra nisl. Donec dictum malesuada magna. Curabitur id nibh auctor tellus adipiscing pharetra. Fusce vel justo non orci semper feugiat. Cras eu leo at purus ultrices tristique.\nDuis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Eum ad nonumy dicunt. Ex mei suas omnes. Reque prompta interpretaris cu mea. Te tota inimicus forensibus mel.\n\nLaoreet admodum est ea. Ut simul possim minimum sit. Accusam indoctum mediocritatem usu an, vel ut odio possim labores, assum euripidis instructior vix eu. Eu esse atqui has. Apeirian detraxit duo no. Qui ridens dolorum vivendum ex, vel te nulla adipiscing disputando, vix cu ocurreret mediocritatem. Ut errem laboramus forensibus usu.',
		left: 10,
		top: 270,
		width: '95%',
		height: Ti.UI.SIZE
	});
v3.add(lblBottom);

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