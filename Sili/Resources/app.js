// Write dummy files
/*
for (i=0; i<6; i++) {
    var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'jambon'+i+'.wav');
    f.write('something inside jambon file');
}

*/

// mock recorder for android
var VR_MOCK = {
    recording: false,
    start: function() { 
		this.recording=true; 
		Ti.API.info('recorder.START');
	},
    stop: function() { 
    	this.recording=false; 
    	Ti.API.info('recorder.STOP'); 
    	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'jambon1.wav');

    	return file;
    },
    compression: Ti.Media.AUDIO_FORMAT_ULAW,
    format: Ti.Media.AUDIO_FILEFORMAT_WAVE
};
////////////////////



if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

var win = Ti.UI.createWindow({
	backgroundColor: '#ffffff',
	title: 'Sili'
});

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

var recordingsView = Ti.UI.createView({
	width: '100%',
	height: '75%',
	top: 0
});

var table = Ti.UI.createTableView({
	width: Ti.UI.FILL,
	height: Ti.UI.FILL,
	editable: true
});

// Make Table view editable to allow file deletion.
var edit = Titanium.UI.createButton({
	title: 'Edit'
});

edit.addEventListener('click', function() {
	win.setRightNavButton(cancel);
	table.editing = true;
});

var cancel = Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});

cancel.addEventListener('click', function() {
	win.setRightNavButton(edit);
	table.editing = false;
});

win.setRightNavButton(edit);

// Table view events
table.addEventListener('click', function(e) {
	sound = Ti.Media.createSound({url:file});
	sound.play();
});

table.addEventListener('delete', function(e) {
	Titanium.API.info("deleted - row=" +  e.rowData.fileName);
});

recordingsView.add(table);
win.add(recordingsView);

// Load the table view with previously recorded audio files
loadExixtingAudioFiles();

// Record audio file
var recorder = VR_MOCK;

recordButton.addEventListener('click', function(e) {
	if (recorder.recording) {
		var buffer = recorder.stop();
		var newFile =Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, buffer.createTimestamp() + '.wav');
		
		newFile.write(buffer);

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

	for (var i=0; i<files.length; i++) {
		var recording = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, files[i]);
		var recordingTimestamp = new Date(recording.createTimestamp());
		var rowLabel = String.formatDate(recordingTimestamp, 'medium') + ' - ' + String.formatTime(recordingTimestamp);

		var row = Ti.UI.createTableViewRow({ 
			title: rowLabel,
			leftImage: '/images/tape.png',
			color: '#404040',
			className: 'lap',
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



/*
var currentSessionMode = Ti.Media.audioSessionMode;
Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAY_AND_RECORD;
var recorder = Ti.Media.createAudioRecorder();


function log() {
	Ti.API.info('recording ' + recorder.recording);
	Ti.API.info('stopped ' + recorder.stopped);
	Ti.API.info('paused ' + recorder.paused);
}
// default compression is Ti.Media.AUDIO_FORMAT_LINEAR_PCM
// default format is Ti.Media.AUDIO_FILEFORMAT_CAF

// this will give us a wave file with µLaw compression which
// is a generally small size and suitable for telephony recording
// for high end quality, you'll want LINEAR PCM - however, that
// will result in uncompressed audio and will be very large in size
recorder.compression = Ti.Media.AUDIO_FORMAT_ULAW;
recorder.format = Ti.Media.AUDIO_FILEFORMAT_WAVE;

Ti.Media.addEventListener('recordinginput', function(e) {
	Ti.API.info('Input availability changed: '+e.available);
	if (!e.available && recording.recording) {
		b1.fireEvent('click', {});
	}
});

win.addEventListener('close',function(e) {
	Ti.Media.audioSessionMode = currentSessionMode;
});

var file;
var timer;
var sound;


var label = Ti.UI.createLabel({
	text:'',
	top:150,
	color:'#999',
	textAlign:'center',
	width:'auto',
	height:'auto'
});

win.add(label);

b1.addEventListener('click', function()
{
	if (recorder.recording)
	{
		file = recording.stop();
		b1.title = "Start Recording";
		b2.show();
		pause.hide();
		clearInterval(timer);
		Ti.Media.stopMicrophoneMonitor();
	}
	else
	{
		if (!Ti.Media.canRecord) {
			Ti.UI.createAlertDialog({
				title:'Error!',
				message:'No audio recording hardware is currently connected.'
			}).show();
			return;
		}
		b1.title = "Stop Recording";
		recorder.start();
		b2.hide();
		pause.show();
		Ti.Media.startMicrophoneMonitor();
		duration = 0;
		timer = setInterval(showLevels,1000);
	}
});
win.add(b1);

var pause = Ti.UI.createButton({
	title:'Pause recording',
	width:200,
	height:40,
	top:80
});
win.add(pause);
pause.hide();

pause.addEventListener('click', function() {
	if (recorder.paused) {
		pause.title = 'Pause recording';
		recorder.resume();
		timer = setInterval(showLevels,1000);
	}
	else {
		pause.title = 'Unpause recording';
		recorder.pause();
		clearInterval(timer);
	}
});

var b2 = Ti.UI.createButton({
	title:'Playback Recording',
	width:200,
	height:40,
	top:80
});

win.add(b2);
b2.hide();
b2.addEventListener('click', function()
{
	if (sound && sound.playing)
	{
		sound.stop();
		sound.release();
		sound = null;
		b2.title = 'Playback Recording';
	}
	else
	{
		Ti.API.info("recording file size: "+file.size);
		sound = Ti.Media.createSound({url:file});
		sound.addEventListener('complete', function()
		{
			b2.title = 'Playback Recording';
		});
		sound.play();
		b2.title = 'Stop Playback';
	}
});

var switchLabel = Ti.UI.createLabel({
	text:'Hi-fidelity:',
	width:'auto',
	height:'auto',
	textAlign:'center',
	color:'#999',
	bottom:115
});
var switcher = Ti.UI.createSwitch({
	value:false,
	bottom:80
});

switcher.addEventListener('change',function(e)
{
	if (!switcher.value)
	{
		recorder.compression = Ti.Media.AUDIO_FORMAT_ULAW;
	}
	else
	{
		recorder.compression = Ti.Media.AUDIO_FORMAT_LINEAR_PCM;
	}
});
win.add(switchLabel);
win.add(switcher);
*/

