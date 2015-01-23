'use strict';
/*!
* Countdown unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    countdown = require('../lib/countdown'),
    createElement = require('virtual-dom/create-element'),
    elementClass = require('element-class'),
    document = global.document;

/**
* countdown
*/

test('countdown should be a function', function (t) {
  t.plan(1);
  t.equal(typeof countdown, 'function');
});

test('countdown should return a countdown component', function (t) {
  var element;

  t.plan(1);

  element = createElement(countdown());
  document.body.appendChild(element);

  t.ok(elementClass(element).has('Countdown'), 'Component has class: Countdown');

  document.body.removeChild(element);

});
