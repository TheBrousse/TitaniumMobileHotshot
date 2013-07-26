/*
    The Ti.PageFlip module has two methods for displaying books:

    1. PDF based, as demonstrated in pdf.js. Pass in the URL to a PDF and it will be displayed.
    2. Views based, as demonstrated in views.js. Pass in an array of views.

    Check out the specific js files to learn more about each approach.
*/

var tabGroup = Ti.UI.createTabGroup();

tabGroup.addTab(Ti.UI.createTab({
    title: 'PDF',
    window: Ti.UI.createWindow({
        backgroundColor: '#fff',
        title: 'PDF',
        url: 'pdf.js'
    })
}));

tabGroup.addTab(Ti.UI.createTab({
    title: 'Views',
    window: Ti.UI.createWindow({
        backgroundColor: '#fff',
        title: 'Views',
        url: 'views.js'
    })
}));

tabGroup.open();