'use strict';
/*!
* Loading unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    elementClass = require('element-class'),
    Loading = require('../lib/loading'),
    document = global.document;

/**
* Loading
*/

test('Loading should be a React Class', function (t) {
  var loading;
  t.plan(1);
  loading = React.createElement(Loading, null);
  t.ok(TestUtils.isElementOfType(loading, Loading), 'Component is a Loading Component')
});

test('loading should have correct markup', function (t) {
  var loading,
      heading;

  t.plan(2);

  loading = TestUtils.renderIntoDocument(React.createElement(Loading, null), document);
  t.ok(elementClass(loading.getDOMNode()).has('Loading'), 'Component has class: Loading');

  heading = TestUtils.findRenderedDOMComponentWithTag(loading, 'h3');
  t.equal(heading.getDOMNode().innerText, 'Loading...');

  React.unmountComponentAtNode(document);
});
