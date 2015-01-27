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
    document = global.document,
    State = require('./helpers/state');

/**
* countdown
*/

test('countdown should be a function', function (t) {
  t.plan(1);
  t.equal(typeof countdown, 'function');
});

test('countdown should return a countdown component', function (t) {
  var element,
      state;

  t.plan(1);

  state = State();
  element = createElement(countdown(state));
  document.body.appendChild(element);

  t.ok(elementClass(element).has('Countdown'), 'Component has class: Countdown');

  document.body.removeChild(element);

});

test('countdown should show the seconds until game starts', function (t) {
  var element,
      state,
      time = 2000,
      counter;

  t.plan(1);

  state = State({ countdownTime: time });
  element = createElement(countdown(state));
  document.body.appendChild(element);

  counter = element.querySelector('.Countdown-time');

  t.equal(counter.innerText, '' + (time / 1000) );

  document.body.removeChild(element);

});
