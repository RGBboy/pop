'use strict';
/*!
* Countdown Stream
*/

/**
* Module Dependencies
*/
var CountdownStream,
    Kefir = require('kefir');

/**
* Countdown Stream
*
* @param {Kefir.Stream} deltaStream, a stream of numbers
* @param {Number} time, time to countdown from
* @return {Kefir.Property}
*/
CountdownStream = function (deltaStream, time) {

  var self = deltaStream
    .scan(function (acc, value) {
      acc = acc - value;
      if (acc < 0) {
        acc = acc;
      };
      return acc;
    }, time)
    .toProperty(time)
    .takeWhile(function(x) {
      return x > 0;
    });

  return self;

};

/**
* Module Exports
*/
exports = module.exports = CountdownStream;
