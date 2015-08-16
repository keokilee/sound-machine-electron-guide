// Add your settings.js code in this file
'use strict';

var ipc = require('ipc');

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function () {
  ipc.send('close-settings-window');
});
