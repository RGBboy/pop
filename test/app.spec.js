'use strict';
/*!
* App unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    elementClass = require('element-class'),
    App = require('../lib/app'),
    Loading = require('../lib/loading'),
    Title = require('../lib/title'),
    Countdown = require('../lib/countdown'),
    Play = require('../lib/play'),
    Replay = require('../lib/replay'),
    document = global.document,
    State = require('./helpers/state');

/**
* app
*/

test('App should be a React Class', function (t) {
  var app;
  t.plan(1);
  app = React.createElement(App, null);
  t.ok(TestUtils.isElementOfType(app, App), 'Component is a App Component');
});

test('app should return a app component', function (t) {
  var app,
      state;

  t.plan(1);

  state = State({ view: 'loading' });
  app = TestUtils.renderIntoDocument(React.createElement(App, state), document);
  t.ok(elementClass(app.getDOMNode()).has('App'), 'Component has class: App');

  React.unmountComponentAtNode(document);
});

test('when state.view === loading, app should return an app component with embedded loading component', function (t) {
  var app,
      state,
      loading;

  t.plan(1);

  state = State({ view: 'loading' });
  app = TestUtils.renderIntoDocument(React.createElement(App, state), document);

  loading = TestUtils.findRenderedComponentWithType(app, Loading);
  t.ok(loading, 'App has Loading component')

  React.unmountComponentAtNode(document);
});

test('when state.view === title, app should return an app component with embedded title component', function (t) {
  var app,
      state,
      title;

  t.plan(1);

  state = State({ view: 'title' });
  app = TestUtils.renderIntoDocument(React.createElement(App, state), document);

  title = TestUtils.findRenderedComponentWithType(app, Title);
  t.ok(title, 'App has Title component')

  React.unmountComponentAtNode(document);
});

test('when state.view === countdown, app should return an app component with embedded countdown component', function (t) {
  var app,
      state,
      countdown;

  t.plan(1);

  state = State({ view: 'countdown' });
  app = TestUtils.renderIntoDocument(React.createElement(App, state), document);

  countdown = TestUtils.findRenderedComponentWithType(app, Countdown);
  t.ok(countdown, 'App has Countdown component')

  React.unmountComponentAtNode(document);
});

test('when state.view === play, app should return an app component with embedded play component', function (t) {
  var app,
      state,
      play;

  t.plan(1);

  state = State({ view: 'play' });
  app = TestUtils.renderIntoDocument(React.createElement(App, state), document);

  play = TestUtils.findRenderedComponentWithType(app, Play);
  t.ok(play, 'App has Play component')

  React.unmountComponentAtNode(document);
});

test('when state.view === replay, app should return an app component with embedded replay component', function (t) {
  var app,
      state,
      replay;

  t.plan(1);

  state = State({ view: 'replay' });
  app = TestUtils.renderIntoDocument(React.createElement(App, state), document);

  replay = TestUtils.findRenderedComponentWithType(app, Replay);
  t.ok(replay, 'App has Replay component')

  React.unmountComponentAtNode(document);
});
