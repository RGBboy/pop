'use strict';
/*!
* Mock State
*/

/**
* Module Dependencies
*/
var State,
    noop = function () {};


State = function (state) {

  state = state || {};
  state.updateView = state.updateView || noop;

  state.countdownTime = state.countdownTime || 0;

  state.playTime = state.playTime || 0;

  return state;

};

/**
* Module Exports
*/
exports = module.exports = State;
