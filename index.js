'use strict';
const electron = require('electron');
var login = require('./app/login/login.js');

const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 800,
		height: 600,
		frame: true
	});

	win.loadURL(`file://${__dirname}/app/login/login.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
		mainWindow.webContents.openDevTools();
	}
	/*
	login.OAuth();
	*/
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});

const {ipcMain} = require('electron')

ipcMain.on('asynchronous-userInfo', (event, arg) => {
  //console.log(arg)  // prints "ping"
  //event.sender.send('asynchronous-reply', 'pong')
  //console.log('userName = ' + arg['userName']);
  //console.log('password = ' + arg['password']);

	login.OAuth(arg);
});
