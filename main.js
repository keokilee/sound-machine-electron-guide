'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var globalShortcut = require('global-shortcut');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
      frame: false,
      height: 700,
      width: 368,
      resizable: false
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

    globalShortcut.register('ctrl+shift+1', function() {
      mainWindow.webContents.send('global-shortcut', 0);
    });

    globalShortcut.register('ctrl+shift+2', function() {
      mainWindow.webContents.send('global-shortcut', 1);
    })
});

ipc.on('close-main-window', function() {
  app.quit();
});
