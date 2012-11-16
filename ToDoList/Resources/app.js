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

var taskText = Ti.UI.createTextField({
	width: '80%',
	hintText: 'Enter New Task Name',
	borderColor: '#000000',
	backgroundColor: '#ffffff'
});
headerView.add(taskText);

taskText.addEventListener('return', function() {
	addButton.fireEvent('click');	
});

var addButton = Ti.UI.createButton({
	title: 'Add'
});

function addTask(name) {
	var row = Ti.UI.createTableViewRow({
		title: name
	});
	
	taskList.appendRow(row);
	taskText.value = '';
	taskText.blur();
}

addButton.addEventListener('click', function(e) {
	addTask(taskText.value);
});

headerView.add(addButton);

win.add(headerView);

var taskView = Ti.UI.createView({
	height: '80%',
	width: '100%'
});

var data = [
	{ title: 'Task 1', hasCheck: 1 },
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
	layout: 'horizontal',
	backgroundColor: 'green'
});

var deleteButton = Ti.UI.createButton({
	title: 'Delete'
});
var doneButton = Ti.UI.createButton({
	title: 'Done'
});

deleteButton.addEventListener('click', function(e) {
	var sections = taskList.data;
	 
	for (var i = 0; i < sections.length; i++) {
	    var section = sections[i];
	 
	    for (var j = 0; j < section.rowCount; j++) {
	        var row = section.rows[j];
	        // do something useful with the row object here, e.g.
	        Ti.API.info('Row ' + j + ': ' + row.title + ' checked: ' + row.hasCheck);
	    }
	}
});

buttonBar.add(deleteButton);
buttonBar.add(doneButton);

win.add(buttonBar);

win.open();