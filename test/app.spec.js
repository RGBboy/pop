'use strict';
/*!
* App unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    app = require('../lib/app'),
    createElement = require('virtual-dom/create-element'),
    elementClass = require('element-class'),
    document = global.document,
    State = require('./helpers/state');

/**
* app
*/

test('app should be a function', function (t) {
  t.plan(1);
  t.equal(typeof app, 'function');
});

test('app should return a app component', function (t) {
  var element,
      state;

  t.plan(1);

  state = State({ view: 'loading' });
  element = createElement(app(state));
  document.body.appendChild(element);

  t.ok(elementClass(element).has('App'), 'Component has class: App');

  document.body.removeChild(element);

});

test('when state.view === loading, app should return an app component with embedded loading component', function (t) {
  var element,
      state,
      loading;

  t.plan(1);

  state = State({ view: 'loading' });
  element = createElement(app(state));
  document.body.appendChild(element);

  loading = element.querySelector('.Loading');
  t.ok(loading, 'App has Loading component')

  document.body.removeChild(element);

});

test('when state.view === title, app should return an app component with embedded title component', function (t) {
  var element,
      state,
      title;

  t.plan(1);

  state = State({ view: 'title' });
  element = createElement(app(state));
  document.body.appendChild(element);

  title = element.querySelector('.Title');
  t.ok(title, 'App has Title component')

  document.body.removeChild(element);

});

test('when state.view === countdown, app should return an app component with embedded countdown component', function (t) {
  var element,
      state,
      countdown;

  t.plan(1);

  state = State({ view: 'countdown' });
  element = createElement(app(state));
  document.body.appendChild(element);

  countdown = element.querySelector('.Countdown');
  t.ok(countdown, 'App has Countdown component')

  document.body.removeChild(element);

});

test('when state.view === play, app should return an app component with embedded play component', function (t) {
  var element,
      state,
      play;

  t.plan(1);

  state = State({ view: 'play' });
  element = createElement(app(state));
  document.body.appendChild(element);

  play = element.querySelector('.Play');
  t.ok(play, 'App has Play component')

  document.body.removeChild(element);

});

test('when state.view === replay, app should return an app component with embedded replay component', function (t) {
  var element,
      state,
      replay;

  t.plan(1);

  state = State({ view: 'replay' });
  element = createElement(app(state));
  document.body.appendChild(element);

  replay = element.querySelector('.Replay');
  t.ok(replay, 'App has Replay component')

  document.body.removeChild(element);

});
