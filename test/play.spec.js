'use strict';
/*!
* Play unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    play = require('../lib/play'),
    createElement = require('virtual-dom/create-element'),
    elementClass = require('element-class'),
    document = global.document;

/**
* play
*/

test('play should be a function', function (t) {
  t.plan(1);
  t.equal(typeof play, 'function');
});

test('play should return a play component', function (t) {
  var element,
  heading,
  button;

  t.plan(1);

  element = createElement(play());
  document.body.appendChild(element);

  t.ok(elementClass(element).has('Play'), 'Component has class: Play');

  document.body.removeChild(element);

});
