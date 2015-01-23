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
    document = global.document;

/**
* app
*/

test('app should be a function', function (t) {
  t.plan(1);
  t.equal(typeof app, 'function');
});

test('app should return a app component', function (t) {
  var element,
  heading;

  t.plan(1);

  element = createElement(app());
  document.body.appendChild(element);

  t.ok(elementClass(element).has('App'), 'Component has class: App');

  document.body.removeChild(element);

});
