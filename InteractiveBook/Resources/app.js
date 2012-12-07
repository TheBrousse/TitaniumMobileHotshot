// Load the native PageFlip Module
var book = require('com.infinery.pageflip');

var win = Titanium.UI.createWindow({
    //fullscreen: true,
    title: 'Interactive eBook for iPad'
    backgroundColor: 'black'
});
/*
var goNext = function(pg) {
    //var cp = sh.GetActivePageIndex();
    //var np = 1 + parseInt(cp);
    sh.SetActivePage(pg);
}
sh.addEventListener('ready', function(e){
    alert('PageFlip is ready');
});
var v1 = Ti.UI.createWebView({
    url: 'http://mrdoob.github.com/three.js/examples/canvas_particles_sprites.html'
});
var v2 = Ti.UI.createView({
    backgroundColor: '#4390f3'
});
var v3 = Ti.UI.createView({
    backgroundColor: '#2b4771'
});
var v4 = Ti.Map.createView({
    mapType: Ti.Map.STANDARD_TYPE,
    animate: true,
    regionFit: true,
    userLocation: true
});
v4.addEventListener('longpress', function() {
    goNext(1);
});
v1.addEventListener('longpress', function() {
    goNext(2);
});
var v5 = Ti.UI.createView({
    backgroundColor: 'pink'
});
var v6 = Ti.UI.createView({
    backgroundColor: 'yellow'
});
var v7 = Ti.UI.createView({
    backgroundColor: 'green'
});
var b1 = Ti.UI.createButton({
    title: 'go back to page 1...',
    width: 444,
    height: 123
});
b1.addEventListener('click', function() {
    sh.SetActivePage(0);
});
v3.add(b1);
*/
win.open();

book.PageView(win, [require('webpage', require('mappage'), require('videopage'))]);