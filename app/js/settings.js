// Add your settings.js code in this file
'use strict';

var ipc = require('ipc');
var config = require('../configuration.js');
var checkboxes = document.querySelectorAll('.global-shortcut');

Array.prototype.forEach.call(checkboxes, function (checkbox) {
  var keys = config.readSettings('shortcutKeys');
  var modifier = checkbox.attributes['data-modifier-key'].value;
  checkbox.checked = keys.indexOf(modifier) !== '-1';

  checkbox.addEventListener('click', function (e) {
    bindCheckboxes(e);
  });
});

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function () {
  ipc.send('close-settings-window');
});

function bindCheckboxes(e) {
  var keys = config.readSettings('shortcutKeys');
  var modifier = e.target.attributes['data-modifier-key'].value;

  if (keys.indexOf(modifier) !== -1) {
    var keyIndex = keys.indexOf(modifier);
    keys.splice(keyIndex, 1);
  } else {
    keys.push(modifier);
  }

  config.saveSettings('shortcutKeys', keys);
  ipc.send('set-global-shortcuts');
}
