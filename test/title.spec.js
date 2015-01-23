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
    document = global.document;

/**
* title
*/

test('title should be a function', function (t) {
  t.plan(1);
  t.equal(typeof title, 'function');
});

test('title should return a title component', function (t) {
  var element,
      heading,
      button;

  t.plan(6);

  element = createElement(title());
  document.body.appendChild(element);

  t.ok(elementClass(element).has('Title'), 'Component has class: Title');

  heading = element.querySelector('h1');
  t.ok(heading.innerText, 'Pop!');

  button = element.querySelector('button');
  t.ok(button, 'Component has button');
  t.equal(button.innerText, 'Play');
  t.ok(elementClass(button).has('Button'), 'Button has class: Button');
  t.ok(elementClass(button).has('Button-default'), 'Button has class: Button-default');

  document.body.removeChild(element);

});
