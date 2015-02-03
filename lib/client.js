'use strict';
/*!
 * Client
 */

/**
 * Module Dependencies
 */

var document = global.document,
    ready = require('domready'),
    React = require('react'),
    App = require('./app'),
    Pop = require('./pop'),
    pop,
    element;

function init () {

  element = document.getElementById('App');
  pop = Pop();

  React.render(React.createElement(App, { view: 'loading' }), element);

  pop.onValue(function (state) {
    React.render(React.createElement(App, state), element);
  });

};

ready(init);
