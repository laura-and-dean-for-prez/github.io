'use strict';

const lines = [];
const maxLines = 500;

const scrollback = document.querySelector('.scrollback');
const input = document.querySelector('input');

const verbs = ['go', 'fart'];

function print(text, raw = false) {
  lines.push(raw ? text : escapeHtml(text));
  while(lines.length > maxLines) {
  	lines.shift();
  }
  scrollback.innerHTML = lines.join('\n');
  scrollback.scrollTop = Math.pow(2, 30); // Firefox doesn't like Number.MAX_SAFE_INTEGER for this
}

function action(text) {
	print('\n<kbd>' + escapeHtml(text) + '</kbd>', true);
  let [verb, noun] = text.split(' ');
  if (!verbs.includes(verb)) {
  	print('Funny you say that.');
    return;
  }
  if (verb === 'go' && noun == 'west') {
  	print('Where the skies are blue.');
    return;
  }
  if (verb === 'fart' && !noun) {
    let things = ['Teen Spirit', 'Eggs'];
  	print(`Smells like ${things[Math.random() * things.length | 0]}.`);
    return;
  }
}

input.addEventListener('keydown', function(e) {
	if (e.keyCode === 13 /* return */ && input.value.trim()) {
  	action(input.value.trim());
    input.value = '';
  }
});

// "escapeHtml" function borrowed from:
// https://github.com/janl/mustache.js/blob/master/mustache.js
const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};
function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, s => entityMap[s]);
}

(function main() {
  input.focus();
	print('You are standing in an open field west of a white house, with a boarded front door.');
  print('There is a small mailbox here.');
})();
