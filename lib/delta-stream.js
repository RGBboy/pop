'use strict';
/*!
* Delta Stream
*/

/**
* Module Dependencies
*/
var DeltaStream,
    Kefir = require('kefir');

DeltaStream = function (loop, getTime) {

  var self = Kefir.fromBinder(function (emitter) {
    var paused,
        time = getTime(),
        newTime,
        delta = 0;

    function tick () {
      if (!paused) {
		    loop(tick);
        newTime = getTime();
        delta = newTime - time;
        time = newTime;
        emitter.emit(delta);
      };
    };

    loop(tick);

    return function () {
      paused = true;
    };

  });

  return self;

};

/**
* Module Exports
*/
exports = module.exports = DeltaStream;
