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
    document = global.document,
    State = require('./helpers/state');

/**
* play
*/

test('play should be a function', function (t) {
  t.plan(1);
  t.equal(typeof play, 'function');
});

test('play should return a play component', function (t) {
  var element,
      state;

  t.plan(1);

  state = State();
  element = createElement(play(state));
  document.body.appendChild(element);

  t.ok(elementClass(element).has('Play'), 'Component has class: Play');

  document.body.removeChild(element);

});

test('play should show the seconds until game ends', function (t) {
  var element,
      state,
      time = 2000,
      counter;

  t.plan(1);

  state = State({ countdown: time });
  element = createElement(play(state));
  document.body.appendChild(element);

  counter = element.querySelector('.Play-time');

  t.equal(counter.innerText, '' + (time / 1000) );

  document.body.removeChild(element);

});

test('play should show the score', function (t) {
  var element,
      state,
      score = 500,
      scoreElement;

  t.plan(1);

  state = State({ score: score });
  element = createElement(play(state));
  document.body.appendChild(element);

  scoreElement = element.querySelector('.Play-score');

  t.equal(scoreElement.innerText, '' + score );

  document.body.removeChild(element);

});
