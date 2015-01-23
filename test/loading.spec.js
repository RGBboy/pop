'use strict';
/*!
* Loading unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    loading = require('../lib/loading'),
    createElement = require('virtual-dom/create-element'),
    elementClass = require('element-class'),
    document = global.document;

/**
* loading
*/

test('loading should be a function', function (t) {
  t.plan(1);
  t.equal(typeof loading, 'function');
});

test('loading should return a loading component', function (t) {
  var element,
      heading;

  t.plan(2);

  element = createElement(loading());
  document.body.appendChild(element);

  t.ok(elementClass(element).has('Loading'), 'Component has class: Loading');

  heading = element.querySelector('h3');
  t.ok(heading.innerText, 'Loading...');

  document.body.removeChild(element);

});
