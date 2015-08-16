/* global require:false, process:false */
'use strict';

var nconf = require('nconf').file({
  file: getUserHome() + '/sound-machine-config.json'
});

function saveSettings(settingKey, settingValue) {
  nconf.set(settingKey, settingValue);
  nconf.save();
}

function readSettings(settingKey) {
  nconf.load();
  return nconf.get(settingKey);
}

function getUserHome() {
  var home = 'HOME';
  if (process.platform === 'win32') {
    home = 'USERPROFILE';
  }

  return process.env[home];
}

module.exports = {
  saveSettings: saveSettings,
  readSettings: readSettings
};
