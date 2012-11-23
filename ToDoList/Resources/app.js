// Open the database and create schema (if needed)
var db = Ti.Database.open('todo.sqlite','todo');

db.execute('CREATE TABLE IF NOT EXISTS TODO_ITEMS  (ID INTEGER, NAME TEXT, IS_DONE INTEGER)');

var rows = db.execute('SELECT * FROM TODO_ITEMS');
var data = [];

while (rows.isValidRow()) {
	data.push({
		title: '' + rows.fieldByName('CATEGORY') + '',
		type: '' + rows.fieldByName('TYPE') + '',
		count: Math.floor(Math.random()*11),
		url: 'entries.js',
		hasChild: true
	});
	rows.next();
};

// User interface (UI) construction
var win = Ti.UI.createWindow({
	backgroundColor: '#ffffff',
	title: 'Sili',
	layout: 'vertical'
});

var headerView = Ti.UI.createView({
	height: '10%',
	width: '100%',
	backgroundColor: '#002EB8',
	layout: 'horizontal'
});

var txtTaskName = Ti.UI.createTextField({
	left: 15,
	width: '75%',
	height: Ti.UI.FILL,
	hintText: 'Enter New Task Name',
	borderColor: '#000000',
	backgroundColor: '#ffffff'
});
headerView.add(txtTaskName);

txtTaskName.addEventListener('return', function() {
	btnAdd.fireEvent('click');	
});

var btnAdd = Ti.UI.createButton({
	title: 'Add'
});

btnAdd.addEventListener('click', function(e) {
	addTask(txtTaskName.value);
});

headerView.add(btnAdd);

win.add(headerView);

var taskView = Ti.UI.createView({
	height: '80%',
	width: '100%'
});

var data = [
	{ title: 'Task 1', hasCheck: true },
	{ title: 'Task 2', hasCheck: 0 },
	{ title: 'Task 3', hasCheck: 1 },
	{ title: 'Task 4', hasCheck: 0 },
	{ title: 'Task 5', hasCheck: 1 }
];

var taskList = Ti.UI.createTableView({
	width: Ti.UI.FILL,
	height: Ti.UI.FILL,
	data: data
});

taskList.addEventListener('click', function(e) {
	e.rowData.hasCheck = !e.rowData.hasCheck;
});

taskView.add(taskList);
win.add(taskView);

var buttonBar = Ti.UI.createView({
	height: '10%',
	width: '100%',
	backgroundColor: 'green'
});

var basicSwitch = Ti.UI.createSwitch({
	value: true,
	left: 5,
	titleOn: 'All',
	titleOff: 'Active'
});

basicSwitch.addEventListener('change', function(e) {
	Ti.API.info(e.value); 
	var section = taskList.data[0];
	
	for (var i = 0; i < section.rowCount; i++) {
		var row = section.rows[i];
		Ti.API.info('Row ' + i + ': ' + row.title + ' checked: ' + row.hasCheck);
		if (row.hasCheck) {
			taskList.deleteRow(i);
		} else {
			taskList.setData(data);
		}
	}
});

buttonBar.add(basicSwitch);

var btnClearComplete = Ti.UI.createButton({
	title: 'Clear Complete',
	right: 5,
	height: 42
});

btnClearComplete.addEventListener('click', function(e) {
	var section = taskList.data[0];
 
	for (var j = 0; j < section.rowCount; j++) {
		var row = section.rows[j];
		// do something useful with the row object here, e.g.
		Ti.API.info('Row ' + j + ': ' + row.title + ' checked: ' + row.hasCheck);
	}
/*
	var sections = taskList.data;
	 
	for (var i = 0; i < sections.length; i++) {
	    var section = sections[i];
	 
	    for(var j = 0; j < section.rowCount; j++) {
	        var row = section.rows[j];
	        // do something useful with the row object here, e.g.
	        Ti.API.info('Section ' + i + ' row ' + j + ': ' + row.title);
	    }
	}*/
});

buttonBar.add(btnClearComplete);

win.add(buttonBar);

win.open();

function addTask(name) {
	var row = Ti.UI.createTableViewRow({
		title: name
	});
	
	taskList.appendRow(row);
	txtTaskName.value = '';
	txtTaskName.blur();
}