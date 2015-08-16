/* global __dirname:false, require:false */
'use strict';

var app = require('app');
var config = require('./configuration');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var globalShortcut = require('global-shortcut');

var mainWindow = null;
var settingsWindow = null;

app.on('ready', function() {
  if (!config.readSettings('shortcutKeys')) {
    config.saveSettings('shortcutKeys', ['ctrl', 'shift']);
  }

  mainWindow = new BrowserWindow({
    frame: false,
    height: 700,
    width: 368,
    resizable: false
  });

  mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
  setGlobalShortcuts();
});

ipc.on('close-main-window', function() {
  app.quit();
});

ipc.on('open-settings-window', function() {
  if (settingsWindow) {
    return;
  }

  settingsWindow = new BrowserWindow({
    frame: false,
    height: 200,
    resizable: false,
    width: 200
  });

  settingsWindow.loadUrl('file://' + __dirname + '/app/settings.html');
  settingsWindow.on('closed', function() {
    settingsWindow = null;
  });
});

ipc.on('close-settings-window', function() {
  if (settingsWindow) {
    settingsWindow.close();
  }
});

ipc.on('set-global-shortcuts', function () {
  setGlobalShortcuts();
});

function setGlobalShortcuts() {
  globalShortcut.unregisterAll();

  var keysSetting = config.readSettings('shortcutKeys');
  var prefix = keysSetting.length === 0 ? '' : keysSetting.join('+') + '+';

  globalShortcut.register(prefix + '1', function() {
    mainWindow.webContents.send('global-shortcut', 0);
  });

  globalShortcut.register(prefix + '2', function() {
    mainWindow.webContents.send('global-shortcut', 1);
  });
}
