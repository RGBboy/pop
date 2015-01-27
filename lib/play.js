'use strict';
/*!
* Play View
*/

/**
* Module Dependencies
*/
var play,
    h = require('virtual-dom/h');


play = function (state) {

  var timeLeft = '' + Math.ceil(state.playTime/1000);

  return h('div', { className: 'Play' }, [
    h('h3', { className: 'Play-time u-textCenter' }, timeLeft)
  ]);

};

/**
* Module Exports
*/
exports = module.exports = play;
