'use strict';
/*!
 * App View
 */

/**
 * Module Dependencies
 */
var app,
    h = require('virtual-dom/h');

app = function (state) {

  return h('div', { id: 'App', className: 'App Arrange Arrange--middle' }, [
    h('div', { className: 'Arrange-sizeFit' }, [
      h('h1', { className: 'u-textCenter' }, 'Pop!')
    ])
  ]);

};

/**
 * Module Exports
 */
exports = module.exports = app;
