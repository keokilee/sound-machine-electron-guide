'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
      frame: false,
      height: 700,
      width: 368,
      resizable: false
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
});
