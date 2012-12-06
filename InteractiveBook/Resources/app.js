var sh = require('com.infinery.pageflip');
var cont = null;
var win = Titanium.UI.createWindow({
    //fullscreen: true,
    backgroundColor: 'black'
});

var goNext = function(pg)
{
    //var cp = sh.GetActivePageIndex();
    //var np = 1 + parseInt(cp);
    
    sh.SetActivePage(pg);
}

sh.addEventListener('ready', function(e)
{
    //alert('gor ready');
});

var v0 = Ti.UI.createWebView({
    url: 'note.html',
    touchEnabled: false
});

var v1 = Ti.UI.createWebView({
    url: 'http://mrdoob.github.com/three.js/examples/canvas_particles_sprites.html',
    //width: 777,
    //height: 999
});

var v2 = Ti.UI.createView({
    backgroundColor: '#4390f3',
    //width: 777,
    //height: 999
});

var v3 = Ti.UI.createView({
    backgroundColor: '#2b4771',
    //width: 777,
    //height: 999
});

var v4 = Ti.Map.createView({
    mapType: Ti.Map.STANDARD_TYPE,
    animate: true,
    regionFit: true,
    userLocation: true
});

v4.addEventListener('longpress', function()
{
    goNext(1);
});

v1.addEventListener('longpress', function()
{
    goNext(2);
});

var v5 = Ti.UI.createView({
    backgroundColor: 'pink',
    //width: 777,
    //height: 999
});

var v6 = Ti.UI.createView({
    backgroundColor: 'yellow',
    //width: 777,
    //height: 999
});

var v7 = Ti.UI.createView({
    backgroundColor: 'green',
    //width: 777,
    //height: 999
});

var b1 = Ti.UI.createButton({
    title: 'go back to page 1...',
    width: 444,
    height: 123
});

b1.addEventListener('click', function()
{
    sh.SetActivePage(0);
    //sh.PartialCurl();
});

v3.add(b1);

cont = win;

win.addEventListener('open', function()
{
    //alert('ddd');
    //sh.PageView(cont, [v3, v1, v2]);  
})

win.open();

sh.PageView(win, [v0, v4, v3]);
