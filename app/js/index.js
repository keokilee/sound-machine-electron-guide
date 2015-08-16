// Add your index.js code in this file
'use strict';

var ipc = require('ipc');

var soundButtons = document.querySelectorAll('.button-sound');
var forEach = Array.prototype.forEach;

forEach.call(soundButtons, function (button) {
  var name = button.attributes['data-sound'].value;
  prepareButton(button, name);
});

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function() {
  ipc.send('close-main-window');
});

ipc.on('global-shortcut', function (arg) {
  var event = new MouseEvent('click');
  soundButtons[arg].dispatchEvent(event);
});

function prepareButton(buttonEl, soundName) {
  var url = 'url("img/icons/' + soundName + '.png")';
  var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');

  buttonEl.querySelector('span').style.backgroundImage  = url;
  buttonEl.addEventListener('click', function() {
    audio.currentTime = 0;
    audio.play();
  });
}
