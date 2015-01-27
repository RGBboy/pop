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

  return state;

};

/**
* Module Exports
*/
exports = module.exports = State;
