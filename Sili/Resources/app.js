// Write dummy files
/*
for (i=0; i<6; i++) {
    var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'jambon'+i+'.wav');
    f.write('something inside jambon file');
}
*/


// mock recorder made for testing on simulator
var VR_MOCK = {
    recording: false,
    start: function() { 
		this.recording=true; 
		Ti.API.info('recorder.START');
	},
    stop: function() { 
    	this.recording=false; 
    	Ti.API.info('recorder.STOP'); 
    	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, '/jambon1.wav');

    	return file;
    },
    compression: Ti.Media.AUDIO_FORMAT_ULAW,
    format: Ti.Media.AUDIO_FILEFORMAT_WAVE
};
////////////////////



if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// User interface (UI) construction
var win = Ti.UI.createWindow({
	backgroundColor: '#ffffff',
	title: 'Sili',
	layout: 'vertical'
});

var headerView = Ti.UI.createView({
	height: '10%',
	width: '100%',
	backgroundColor: '#002EB8'
});

headerView.add(Ti.UI.createLabel({ 
	text: 'Sili',
	left: 7,
	color: '#ffffff',
    height: Ti.UI.FILL,
    verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
    font:{
		fontSize: '22sp',
		fontWeight: 'bold'
	}
}));

var edit = Titanium.UI.createButton({
	title: 'Edit',
	right: 5,
	visible: true
});

var done = Titanium.UI.createButton({
	title: 'Done',
	right: 5,
	visible: false
});

headerView.add(edit);
headerView.add(done);

win.add(headerView);

var recordingsView = Ti.UI.createView({
	height: '65%',
	width: '100%'
});

var table = Ti.UI.createTableView({
	width: Ti.UI.FILL,
	height: Ti.UI.FILL,
	editable: true
});

recordingsView.add(table);
win.add(recordingsView);

var buttonView = Ti.UI.createView({
	width: '100%',
	height: '25%',
	backgroundColor: '#404040',
	bottom: 0
});

var recordButton = Ti.UI.createImageView({
	image: '/images/recording_off.png',
	height: '95%'
});

buttonView.add(recordButton);

win.add(buttonView);

// Make Table view editable to allow file deletion.
edit.addEventListener('click', function(e) {
	toggleEditMode();
});

done.addEventListener('click', function() {
	toggleEditMode();
});

function toggleEditMode() {
	edit.visible = !edit.visible;
	done.visible = !done.visible;
	table.editing = !table.editing;
}

// Table view events
table.addEventListener('click', function(e) {
	sound = Ti.Media.createSound({ url: e.rowData.fileName });
	sound.play();
});

table.addEventListener('delete', function(e) {
	var fileToDelete = Ti.Filesystem.getFile(e.rowData.fileName);
	
	Titanium.API.info("deleting file= " +  JSON.stringify(fileToDelete));
	fileToDelete.deleteFile();
});

// Load the table view with previously recorded audio files
loadExixtingAudioFiles();

// Record audio file
Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAY_AND_RECORD;

var recorder = Ti.Media.createAudioRecorder(); // For on device testing
//var recorder = VR_MOCK; // For Simulator testing (won't work, but allows to test UI)
recorder.compression = Ti.Media.AUDIO_FORMAT_ULAW;
recorder.format = Ti.Media.AUDIO_FILEFORMAT_WAVE;

recordButton.addEventListener('click', function(e) {
	if (recorder.recording) {
		var buffer = recorder.stop();
		var newFile =Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, new Date().getTime() + '.wav');
		
		newFile.write(buffer);
		
		table.setData([]);
		loadExixtingAudioFiles();

		e.source.image = '/images/recording_off.png';
	} else {
		recorder.start();
		e.source.image = '/images/recording_on.png';
	}
});

win.open();

function loadExixtingAudioFiles() {
	// Read the audio files from device
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory);
	var files = f.getDirectoryListing();
	var tableData = []

	for (var i = 0; i < files.length; i++) {
		var recording = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, files[i]);
		var recordingTimestamp = new Date(recording.createTimestamp());
		var rowLabel = String.formatDate(recordingTimestamp, 'medium') + ' - ' + String.formatTime(recordingTimestamp);

		var row = Ti.UI.createTableViewRow({ 
			title: rowLabel,
			leftImage: '/images/tape.png',
			color: '#404040',
			className: 'recording',
			font:{
				fontSize: '24sp',
				fontWeight: 'bold'
			},
			fileName: Ti.Filesystem.applicationDataDirectory + '/' + recording.name
		});
		tableData.push(row);	
	}

	table.setData(tableData);
}