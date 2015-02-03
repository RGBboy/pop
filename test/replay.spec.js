'use strict';
/*!
* Replay unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    elementClass = require('element-class'),
    Replay = require('../lib/replay'),
    document = global.document,
    State = require('./helpers/state');

/**
* replay
*/

test('Replay should be a React Class', function (t) {
  var replay;
  t.plan(1);
  replay = React.createElement(Replay, null);
  t.ok(TestUtils.isElementOfType(replay, Replay), 'Component is a Replay Component');
});

test('replay should have correct markup', function (t) {
  var replay,
      state,
      score = 500,
      scoreElement,
      replayButton,
      menuButton;

  t.plan(10);

  state = State({ score: score });
  replay = TestUtils.renderIntoDocument(React.createElement(Replay, state), document);
  t.ok(elementClass(replay.getDOMNode()).has('Replay'), 'Component has class: Replay');

  scoreElement = TestUtils.findRenderedDOMComponentWithClass(replay, 'Replay-score');
  t.equal(scoreElement.getDOMNode().innerText, 'You scored ' + score + ' points!');

  replayButton = TestUtils.findRenderedDOMComponentWithClass(replay, 'Replay-replay');
  t.ok(replayButton, 'Component has button');
  t.equal(replayButton.getDOMNode().innerText, 'Replay');
  t.ok(elementClass(replayButton.getDOMNode()).has('Button'), 'Button has class: Button');
  t.ok(elementClass(replayButton.getDOMNode()).has('Button--default'), 'Button has class: Button--default');

  menuButton = TestUtils.findRenderedDOMComponentWithClass(replay, 'Replay-menu');
  t.ok(menuButton, 'Component has button');
  t.equal(menuButton.getDOMNode().innerText, 'Menu');
  t.ok(elementClass(menuButton.getDOMNode()).has('Button'), 'Button has class: Button');
  t.ok(elementClass(menuButton.getDOMNode()).has('Button--default'), 'Button has class: Button--default');

  React.unmountComponentAtNode(document);

});

test('when replay button is clicked it should call state.updateView with countdown', function (t) {
  var replay,
      state,
      button,
      updateView;

  t.plan(1);

  updateView = function (view, e) {
    t.equal(view, 'countdown');
    React.unmountComponentAtNode(document);
  };

  state = State({ updateView: updateView });
  replay = TestUtils.renderIntoDocument(React.createElement(Replay, state), document);

  button = TestUtils.findRenderedDOMComponentWithClass(replay, 'Replay-replay');

  TestUtils.Simulate.click(button.getDOMNode());

});

test('when menu button is clicked it should call state.updateView with title', function (t) {
  var replay,
      state,
      button,
      updateView;

  t.plan(1);

  updateView = function (view, e) {
    t.equal(view, 'title');
    React.unmountComponentAtNode(document);
  };

  state = State({ updateView: updateView });
  replay = TestUtils.renderIntoDocument(React.createElement(Replay, state), document);

  button = TestUtils.findRenderedDOMComponentWithClass(replay, 'Replay-menu');

  TestUtils.Simulate.click(button.getDOMNode());

});
