'use strict';
/*!
* Title unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    elementClass = require('element-class'),
    Title = require('../lib/title'),
    document = global.document,
    State = require('./helpers/state');

/**
* title
*/

test('Title should be a React Class', function (t) {
  var title;
  t.plan(1);
  title = React.createElement(Title, null);
  t.ok(TestUtils.isElementOfType(title, Title), 'Component is a Title Component');
});

test('title should have correct markup', function (t) {
  var title,
      state,
      heading,
      button;

  t.plan(6);

  state = State();

  title = TestUtils.renderIntoDocument(React.createElement(Title, state), document);
  t.ok(elementClass(title.getDOMNode()).has('Title'), 'Component has class: Title');

  heading = TestUtils.findRenderedDOMComponentWithTag(title, 'h1');
  t.ok(heading.getDOMNode().innerText, 'Pop!');

  button = TestUtils.findRenderedDOMComponentWithClass(title, 'Title-play');
  t.ok(button, 'Component has button');
  t.equal(button.getDOMNode().innerText, 'Play');
  t.ok(elementClass(button.getDOMNode()).has('Button'), 'Button has class: Button');
  t.ok(elementClass(button.getDOMNode()).has('Button--default'), 'Button has class: Button--default');

  React.unmountComponentAtNode(document);
});

test('when title button is clicked it should call state.updateView with countdown', function (t) {
  var title,
      state,
      button,
      updateView;

  t.plan(1);

  updateView = function (view) {
    t.equal(view, 'countdown');
    React.unmountComponentAtNode(document);
  };

  state = State({ updateView: updateView });
  title = TestUtils.renderIntoDocument(React.createElement(Title, state), document);

  button = TestUtils.findRenderedDOMComponentWithClass(title, 'Title-play');

  TestUtils.Simulate.click(button.getDOMNode());
});
