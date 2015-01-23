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
    element;

function init () {

  element = document.getElementById('App');
  renderer = Renderer(element);
  renderer.render(app({ view: 'title' }));

};

ready(init);
