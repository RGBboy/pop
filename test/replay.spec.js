'use strict';
/*!
* Replay unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    replay = require('../lib/replay'),
    createElement = require('virtual-dom/create-element'),
    elementClass = require('element-class'),
    document = global.document;

/**
* replay
*/

test('replay should be a function', function (t) {
  t.plan(1);
  t.equal(typeof replay, 'function');
});

test('replay should return a replay component', function (t) {
  var element;

  t.plan(1);

  element = createElement(replay());
  document.body.appendChild(element);

  t.ok(elementClass(element).has('Replay'), 'Component has class: Replay');

  document.body.removeChild(element);

});
