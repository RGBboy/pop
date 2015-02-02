'use strict';
/*!
 * Client
 */

/**
 * Module Dependencies
 */

var document = global.document,
    ready = require('domready'),
    Renderer = require('./renderer'),
    renderer,
    app = require('./app'),
    Pop = require('./pop'),
    pop,
    element;

function init () {

  element = document.getElementById('App');
  renderer = Renderer(element);
  pop = Pop();

  pop.onValue(function (state) {
    renderer.render(app(state));
  });

};

ready(init);
