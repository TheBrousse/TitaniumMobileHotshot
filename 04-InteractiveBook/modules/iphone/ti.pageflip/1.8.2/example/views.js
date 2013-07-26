var win = Ti.UI.currentWindow;
var PageFlip = require('ti.pageflip');

function createPage(number) {
    return Ti.UI.createLabel({
        text: 'p' + number, textAlign: 'center',
        font: { fontSize: 150, fontWeight: 'bold' },
        backgroundColor: '#fff'
    });
}

var pages = [], count;
for (count = 1; count <= 4; count++) {
    pages.push(createPage(count));
}

var pageflip = PageFlip.createView({
    /* All Options: TRANSITION_FLIP [default], TRANSITION_SLIDE, TRANSITION_FADE, TRANSITION_CURL */
    transition: PageFlip.TRANSITION_CURL,
    transitionDuration: 0.3,
    landscapeShowsTwoPages: true,
    pages: pages
});
win.add(pageflip);

function updateWindowTitle() {
    win.title = 'Views, 1 < ' + (pageflip.currentPage + 1) + ' > ' + pageflip.pageCount;
}
updateWindowTitle();

pageflip.addEventListener('change', function (evt) {
    // evt.currentPage
    updateWindowTitle();
});

pageflip.addEventListener('tap', function (evt) {
    // evt.currentPage
    Ti.API.info('User tapped inside the paging margins! Maybe we should show them an overlay menu?');
});
pageflip.addEventListener('flipStarted', function (evt) {
    Ti.API.info('flip started!');
});

var previous = Ti.UI.createButton({ title: '<', style: Ti.UI.iPhone.SystemButtonStyle.BORDERED });
previous.addEventListener('click', function () {
    var offsetLandscape = pageflip.landscapeShowsTwoPages && win.size.width > win.size.height;
    var previousPage = pageflip.currentPage - (offsetLandscape ? 2 : 1);
    if (offsetLandscape && previousPage < 0 && pageflip.currentPage == 1) {
        // We can already see both pages; don't change the page.
        return;
    }
    pageflip.changeCurrentPage(previousPage, true);
    updateWindowTitle();
});
var insert = Ti.UI.createButton({ title: 'Insrt', style: Ti.UI.iPhone.SystemButtonStyle.BORDERED });
insert.addEventListener('click', function () {
    pageflip.insertPageBefore(0, createPage(++count));
    updateWindowTitle();
});
var append = Ti.UI.createButton({ title: 'Apnd', style: Ti.UI.iPhone.SystemButtonStyle.BORDERED });
append.addEventListener('click', function () {
    pageflip.appendPage(createPage(++count));
    updateWindowTitle();
});
var remove = Ti.UI.createButton({ title: 'Del', style: Ti.UI.iPhone.SystemButtonStyle.BORDERED });
remove.addEventListener('click', function () {
    pageflip.deletePage(Math.max(0, pageflip.currentPage));
    updateWindowTitle();
});
var gestures = Ti.UI.createButton({ title: 'Gstrs', style: Ti.UI.iPhone.SystemButtonStyle.BORDERED });
gestures.addEventListener('click', function () {
    pageflip.enableBuiltInGestures = !pageflip.enableBuiltInGestures;
});
var next = Ti.UI.createButton({ title: '>', style: Ti.UI.iPhone.SystemButtonStyle.BORDERED });
next.addEventListener('click', function () {
    var offsetLandscape = pageflip.landscapeShowsTwoPages && win.size.width > win.size.height;
    var nextPage = pageflip.currentPage + (offsetLandscape ? 2 : 1);
    if (offsetLandscape && pageflip.pageCount % 2 == 0 && nextPage >= pageflip.pageCount && pageflip.currentPage == pageflip.pageCount - 2) {
        // We can already see both pages; don't change the page.
        return;
    }
    pageflip.changeCurrentPage(Math.min(nextPage, pageflip.pageCount - 1), true);
    updateWindowTitle();
});
var flexSpace = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE });
win.toolbar = [ previous, flexSpace, gestures, insert, append, remove, flexSpace, next ];