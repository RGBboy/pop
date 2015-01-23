'use strict';
/*!
* Loading View
*/

/**
* Module Dependencies
*/
var loading,
    h = require('virtual-dom/h');


loading = function (state) {

  return h('div', { className: 'Loading' }, [
    h('h3', { className: 'u-textCenter' }, 'Loading...')
  ]);

};

/**
* Module Exports
*/
exports = module.exports = loading;
