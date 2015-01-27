'use strict';
/*!
* Title unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    title = require('../lib/title'),
    createElement = require('virtual-dom/create-element'),
    elementClass = require('element-class'),
    event = require('synthetic-dom-events'),
    document = global.document,
    State = require('./helpers/state');

/**
* title
*/

test('title should be a function', function (t) {
  t.plan(1);
  t.equal(typeof title, 'function');
});

test('title should return a title component', function (t) {
  var element,
      state,
      heading,
      button;

  t.plan(6);

  state = State();
  element = createElement(title(state));
  document.body.appendChild(element);

  t.ok(elementClass(element).has('Title'), 'Component has class: Title');

  heading = element.querySelector('h1');
  t.ok(heading.innerText, 'Pop!');

  button = element.querySelector('.Title-play');
  t.ok(button, 'Component has button');
  t.equal(button.innerText, 'Play');
  t.ok(elementClass(button).has('Button'), 'Button has class: Button');
  t.ok(elementClass(button).has('Button--default'), 'Button has class: Button--default');

  document.body.removeChild(element);

});

test('when title button is clicked it should call state.updateView with countdown', function (t) {
  var element,
      state,
      button,
      updateView;

  t.plan(1);

  updateView = function (view) {
    t.equal(view, 'countdown');
    document.body.removeChild(element);
  };

  state = State({ updateView: updateView });
  element = createElement(title(state));
  document.body.appendChild(element);

  button = element.querySelector('.Title-play');

  button.dispatchEvent(event('click'));

});
