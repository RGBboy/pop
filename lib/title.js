'use strict';
/*!
* Title View
*/

/**
* Module Dependencies
*/
var title,
    h = require('virtual-dom/h');


title = function (state) {

  return h('div', { className: 'Title' }, [
    h('h1', { className: 'u-textCenter' }, 'Pop!'),
    h('div', { className: 'u-textCenter' }, [
      h('button', { className: 'Button Button-default' }, 'Play')
    ])
  ]);

};

/**
* Module Exports
*/
exports = module.exports = title;
