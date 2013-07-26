var win = Ti.UI.currentWindow;
var PageFlip = require('ti.pageflip');

var pdf = 'http://assets.appcelerator.com.s3.amazonaws.com/docs/Appcelerator-IDC-Q1-2011-Mobile-Developer-Report.pdf';
var fileName = pdf.split('/').pop();
var pdfFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, fileName);

function downloadPDF() {
    var progressBar = Ti.UI.createProgressBar({ max: 1, min: 0, value: 0, visible: true });
    win.add(progressBar);
    var xhr = Ti.Network.createHTTPClient({
        ondatastream: function(e) {
            progressBar.value = e.progress;
        },
        onload: function() {
            pdfFile.write(this.responseData);
            win.remove(progressBar);
            showPDF();
        }
    });
    xhr.open('GET', pdf);
    xhr.send();
}

function showPDF() {
    /**
     * "createView" will return a pageflip view. It can be sized and positioned like any other Titanium view. Here we
     * call it with a pdf and a transition; it will handle paging the PDF for us.
     */
    var pageflip = PageFlip.createView({
        /* All Options: TRANSITION_FLIP [default], TRANSITION_SLIDE, TRANSITION_FADE, TRANSITION_CURL */
        transition: PageFlip.TRANSITION_CURL,
        transitionDuration: 1,
        pdf: pdfFile.nativePath,
        tapToAdvanceWidth: '15%',
        landscapeShowsTwoPages: true
    });
    win.add(pageflip);

    function updateWindowTitle(evt) {
        win.title = 'PDF, 1 < ' + (evt.currentPage+1) + ' > ' + evt.pageCount;
    }
    updateWindowTitle(pageflip);

    pageflip.addEventListener('change', function(evt) {
        updateWindowTitle(evt);
    });
}

if (pdfFile.exists()) {
    showPDF();
}
else {
    downloadPDF();
}