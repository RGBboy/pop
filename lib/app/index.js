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
    title = require('../title');


app = function (state) {

  var element;

  if (state.view === 'loading') {
    element = loading(state);
  } else if (state.view === 'title') {
    element = title(state);
  };

  return h('div', { id: 'App', className: 'App Arrange Arrange--middle' }, [
    h('div', { className: 'Arrange-sizeFit' }, [
      element
    ])
  ]);

};

/**
 * Module Exports
 */
exports = module.exports = app;
