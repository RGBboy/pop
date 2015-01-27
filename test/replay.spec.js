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
    event = require('synthetic-dom-events'),
    document = global.document,
    State = require('./helpers/state');

/**
* replay
*/

test('replay should be a function', function (t) {
  t.plan(1);
  t.equal(typeof replay, 'function');
});

test('replay should return a replay component', function (t) {
  var element,
      state,
      score = 500,
      scoreElement,
      replayButton,
      menuButton;

  t.plan(10);

  state = State({ score: score });
  element = createElement(replay(state));
  document.body.appendChild(element);

  t.ok(elementClass(element).has('Replay'), 'Component has class: Replay');

  scoreElement = element.querySelector('.Replay-score');
  t.equal(scoreElement.innerText, 'You scored ' + score + ' points!');

  replayButton = element.querySelector('.Replay-replay');
  t.ok(replayButton, 'Component has button');
  t.equal(replayButton.innerText, 'Replay');
  t.ok(elementClass(replayButton).has('Button'), 'Button has class: Button');
  t.ok(elementClass(replayButton).has('Button--default'), 'Button has class: Button--default');

  menuButton = element.querySelector('.Replay-menu');
  t.ok(menuButton, 'Component has button');
  t.equal(menuButton.innerText, 'Menu');
  t.ok(elementClass(menuButton).has('Button'), 'Button has class: Button');
  t.ok(elementClass(menuButton).has('Button--default'), 'Button has class: Button--default');

  document.body.removeChild(element);

});

test('when replay button is clicked it should call state.updateView with countdown', function (t) {
  var element,
      state,
      button,
      updateView;

  t.plan(1);

  updateView = function (view, e) {
    t.equal(view, 'countdown');
    document.body.removeChild(element);
  };

  state = State({ updateView: updateView });
  element = createElement(replay(state));
  document.body.appendChild(element);

  button = element.querySelector('.Replay-replay');

  button.dispatchEvent(event('click'));

});

test('when menu button is clicked it should call state.updateView with title', function (t) {
  var element,
      state,
      button,
      updateView;

  t.plan(1);

  updateView = function (view, e) {
    t.equal(view, 'title');
    document.body.removeChild(element);
  };

  state = State({ updateView: updateView });
  element = createElement(replay(state));
  document.body.appendChild(element);

  button = element.querySelector('.Replay-menu');

  button.dispatchEvent(event('click'));

});
