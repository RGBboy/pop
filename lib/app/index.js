'use strict';
/*!
 * App View
 */

/**
 * Module Dependencies
 */
var app,
    h = require('virtual-dom/h'),
    loading = require('../loading');


app = function (state) {

  return h('div', { id: 'App', className: 'App Arrange Arrange--middle' }, [
    h('div', { className: 'Arrange-sizeFit' }, [
      loading(state)
    ])
  ]);

};

/**
 * Module Exports
 */
exports = module.exports = app;
