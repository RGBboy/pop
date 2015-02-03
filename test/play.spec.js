'use strict';
/*!
* Play unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    elementClass = require('element-class'),
    Play = require('../lib/play'),
    document = global.document,
    State = require('./helpers/state');

/**
* play
*/

test('Play should be a React Class', function (t) {
  var play;
  t.plan(1);
  play = React.createElement(Play, null);
  t.ok(TestUtils.isElementOfType(play, Play), 'Component is a Play Component')
});

test('play should have correct markup', function (t) {
  var play,
      state;

  t.plan(1);

  state = State();

  play = TestUtils.renderIntoDocument(React.createElement(Play, state), document);
  t.ok(elementClass(play.getDOMNode()).has('Play'), 'Component has class: Play');

  React.unmountComponentAtNode(document);
});

test('play should show the seconds until game ends', function (t) {
  var play,
      state,
      time = 2000,
      counter;

  t.plan(1);

  state = State({ countdown: time });

  play = TestUtils.renderIntoDocument(React.createElement(Play, state), document);

  counter = TestUtils.findRenderedDOMComponentWithClass(play, 'Play-time');
  t.equal(counter.getDOMNode().innerText, '' + (time / 1000) );

  React.unmountComponentAtNode(document);
});

test('play should show the seconds until game ends', function (t) {
  var play,
      state,
      score = 500,
      scoreElement;

  t.plan(1);

  state = State({ score: score });

  play = TestUtils.renderIntoDocument(React.createElement(Play, state), document);

  scoreElement = TestUtils.findRenderedDOMComponentWithClass(play, 'Play-score');
  t.equal(scoreElement.getDOMNode().innerText, '' + score );

  React.unmountComponentAtNode(document);
});
