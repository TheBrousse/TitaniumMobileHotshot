// Open the database and create schema (if needed)
var db = Ti.Database.open('todo.sqlite');

db.execute('CREATE TABLE IF NOT EXISTS TODO_ITEMS (ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT, IS_COMPLETE INTEGER)');

// User interface (UI) construction
var win = Ti.UI.createWindow({
	backgroundColor: '#ffffff',
	title: 'To Do List'
});

var headerView = Ti.UI.createView({
	height: '50dp',
	width: '100%',
	backgroundColor: '#447294',
	layout: 'horizontal',
	top: 0
});

var txtTaskName = Ti.UI.createTextField({
	left: 15,
	width: '75%',
	hintText: 'Enter New Task Name',
	backgroundColor: '#ffffff',
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
headerView.add(txtTaskName);

var btnAdd = Ti.UI.createButton({
	backgroundImage: 'add_button.png',
	left: 15,
	height: '45dp',
	width: '45dp'
});

btnAdd.addEventListener('click', function(e) {
	addTask(txtTaskName.value);
});

txtTaskName.addEventListener('return', function() {
	btnAdd.fireEvent('click');
});

headerView.add(btnAdd);
win.add(headerView);

var taskView = Ti.UI.createView({
	top: '50dp',
	width: '100%',
	backgroundColor: '#eeeeee'
});

var taskList = Ti.UI.createTableView({
	width: Ti.UI.FILL,
	height: Ti.UI.FILL,
	backgroundColor: '#f8e4cc',
	separatorColor: '#447294'
});

taskList.addEventListener('click', function(e) {
	var todoItem = e.rowData;
	var isComplete = (todoItem.hasCheck ? 0 : 1);

	db.execute('UPDATE TODO_ITEMS SET IS_COMPLETE = ? WHERE ID = ?',
				isComplete, todoItem.id);
	refreshTaskList();
});

taskView.add(taskList);
win.add(taskView);

var buttonBar = Ti.UI.createView({
	height: '50dp',
	width: '100%',
	backgroundColor: '#447294',
	bottom: 0
});

var basicSwitch;

if (!Ti.Android) {
	basicSwitch = Ti.UI.iOS.createTabbedBar({
		labels: ['All', 'Active'],
		left: 5,
		backgroundColor: '#e9e9e9',
		style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
		index: 0,
	});

	basicSwitch.addEventListener('click', function(e) {
		toggleAllTasks(e.index === 0);
	});
} else {
	basicSwitch = Ti.UI.createSwitch({
		value: true,
		left: 5,
		titleOn: 'All',
		titleOff: 'Active'
	});

	basicSwitch.addEventListener('change', function(e) {
		toggleAllTasks(e.value === true);
	});
}

buttonBar.add(basicSwitch);

var btnClearComplete = Ti.UI.createButton({
	title: 'Clear Complete',
	right: 5,
	color: '##e9e9e9'
});

btnClearComplete.addEventListener('click', function(e) {
	db.execute('DELETE FROM TODO_ITEMS WHERE IS_COMPLETE = 1;');
	refreshTaskList();
});

buttonBar.add(btnClearComplete);

win.add(buttonBar);

// Make sure the dababase is closed when the app exits
win.addEventListener('close', function() {
	db.close();
});

refreshTaskList();
win.open();

function addTask(name) {
	db.execute('INSERT INTO TODO_ITEMS (NAME, IS_COMPLETE) VALUES (?, 0)', name);

	txtTaskName.value = '';
	txtTaskName.blur();
	refreshTaskList();
}

function refreshTaskList() {
	var rows = db.execute('SELECT * FROM TODO_ITEMS');
	var data = [];

	while (rows.isValidRow()) {
		var isComplete = rows.fieldByName('IS_COMPLETE');

		data.push({
			title: '' + rows.fieldByName('NAME') + '',
			hasCheck: (isComplete===1) ? true : false,
			id: rows.fieldByName('ID'),
			color: '#153450',
			className: 'task'
		});

		rows.next();
	};

	taskList.setData(data);
}

function toggleAllTasks(showAll) {
	if (showAll) {
		refreshTaskList();
	} else {
		var section = taskList.data[0];

		for (var i = 0; i < section.rowCount; i++) {
			var row = section.rows[i];

			if (row.hasCheck) {
				taskList.deleteRow(i);
			}
		}
	}
}