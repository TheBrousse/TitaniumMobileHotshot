/*
//require the UI components necessary to drive the test
var NavigationController = require('NavigationController').NavigationController,
	TestWindow = require('TestWindow').TestWindow;

//create NavigationController which will drive our simple application
var controller = new NavigationController();

//open initial window
controller.open(new TestWindow(controller));
*/

/*
var win1 = Titanium.UI.createWindow();

var win2 = Titanium.UI.createWindow({
    backgroundColor: 'red',
        barColor: 'orange',
    title: 'Red Window',
    layout: 'vertical'
});

var win3 = Titanium.UI.createWindow({
    backgroundColor: 'blue',
    title: 'Blue Window',
    barColor: 'pink'
});

var button = Titanium.UI.createButton({
    title: 'Open Blue Window'
});
button.addEventListener('click', function(){
    nav.open(win3, {animated:true});
});

var nav = Titanium.UI.iPhone.createNavigationGroup({
   window: win2
});

win2.add(button);
win1.add(nav);
win1.open();
*/

var ApplicationWindow = require('ApplicationWindow');
var win = new ApplicationWindow();

win.open();