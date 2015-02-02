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

  state.countdown = state.countdown || 0;

  state.score = state.score || 0;

  state.bubbles = [];

  return state;

};

/**
* Module Exports
*/
exports = module.exports = State;
