'use strict';
/*!
* Countdown unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    elementClass = require('element-class'),
    Countdown = require('../lib/countdown'),
    document = global.document,
    State = require('./helpers/state');

/**
* countdown
*/

test('Countdown should be a React Class', function (t) {
  var countdown;
  t.plan(1);
  countdown = React.createElement(Countdown, null);
  t.ok(TestUtils.isElementOfType(countdown, Countdown), 'Component is a Countdown Component')
});

test('countdown should have correct markup', function (t) {
  var countdown,
      state;

  t.plan(1);

  state = State();

  countdown = TestUtils.renderIntoDocument(React.createElement(Countdown, state), document);
  t.ok(elementClass(countdown.getDOMNode()).has('Countdown'), 'Component has class: Countdown');

  React.unmountComponentAtNode(document);
});

test('countdown should show the seconds until game starts', function (t) {
  var countdown,
      state,
      time = 2000,
      counter;

  t.plan(1);

  state = State({ countdown: time });

  countdown = TestUtils.renderIntoDocument(React.createElement(Countdown, state), document);

  counter = TestUtils.findRenderedDOMComponentWithClass(countdown, 'Countdown-time');
  t.equal(counter.getDOMNode().innerText, '' + (time / 1000) );

  React.unmountComponentAtNode(document);
});
