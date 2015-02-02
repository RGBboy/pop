'use strict';
/*!
 * App View
 */

/**
 * Module Dependencies
 */
var app,
    h = require('virtual-dom/h'),
    loading = require('../loading'),
    title = require('../title'),
    countdown = require('../countdown'),
    play = require('../play'),
    replay = require('../replay');


app = function (state) {

  var element;

  if (state.view === 'loading') {
    element = loading(state);
  } else if (state.view === 'title') {
    element = title(state);
  } else if (state.view === 'countdown') {
    element = countdown(state);
  } else if (state.view === 'play') {
    element = play(state);
  } else if (state.view === 'replay') {
    element = replay(state);
  };

  return h('div', { id: 'App', className: 'App u-posAbsoluteCenter' }, [
    h('div', { className: 'App-screen Arrange Arrange--middle' }, [
      h('div', { className: 'Arrange-sizeFill' }, [
        element
      ])
    ])
  ]);

};

/**
 * Module Exports
 */
exports = module.exports = app;
