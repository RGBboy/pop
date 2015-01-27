'use strict';
/*!
* Countdown View
*/

/**
* Module Dependencies
*/
var countdown,
    h = require('virtual-dom/h');


countdown = function (state) {

  var timeLeft = '' + Math.ceil(state.countdownTime/1000) || 0;

  return h('div', { className: 'Countdown' }, [
    h('h2', { className: 'u-textCenter' }, 'Get ready!'),
    h('h3', { className: 'Countdown-time u-textCenter' }, timeLeft)
  ]);

};

/**
* Module Exports
*/
exports = module.exports = countdown;
