'use strict';
/*!
* Pop Stream
*/

/**
* Module Dependencies
*/
var PopStream,
    Kefir = require('kefir'),
    CountdownStream = require('./countdown-stream'),
    Bubble = require('./bubble');

function copy (v) {
  return JSON.parse(JSON.stringify(v));
};

function updateBubbles (bubbles, elapsed, delta) {
  return bubbles.map(Bubble.update.bind(null, delta, elapsed));
};

function getId (obj) {
  return obj.id;
};

function sum (acc, v) {
  return acc + v;
};

/**
* Pop Stream
*
* @param {Kefir.Stream} bubbleStream, a stream of [Bubble]
* @param {Kefir.Stream} deltaStream, a stream of {Number}
* @param {Kefir.Stream} inputStream, a stream of [{Number}, {Number}]
* @param {Number} time
* @return {Kefir.Stream}
*/
PopStream = function (bubbleStream, deltaStream, inputStream, time) {

  var countdownStream,
      elapsedStream,
      poppedBubbleStream,
      scoreStream,
      updateBubbleStream,
      resetBubbleStream;

  bubbleStream = bubbleStream.map(copy);

  countdownStream = CountdownStream(deltaStream, time);

  elapsedStream = deltaStream.scan(sum, 0).toProperty(0);

  poppedBubbleStream = bubbleStream.sampledBy(
    inputStream,
    function (bubbles, hit) {
      return bubbles.filter(
        Bubble.isColliding.bind(null, hit[0], hit[1])
      ).map(getId);
    }
  );

  updateBubbleStream = Kefir.sampledBy(
    [
      bubbleStream,
      elapsedStream
    ],
    [ deltaStream ],
    updateBubbles
  );

  resetBubbleStream = Kefir.sampledBy(
    [bubbleStream],
    [poppedBubbleStream],
    function (bubbles, hit) {
      var i;
      for (i = 0; i < hit.length; i += 1) {
        bubbles[hit[i]].y += 480;
      };
      return bubbles;
    }
  );

  scoreStream = poppedBubbleStream.map(
    function (arr) {
      return arr.length * 100;
    }
  ).scan(sum, 0)

  bubbleStream = Kefir.merge([
    updateBubbleStream,
    resetBubbleStream
  ]);

  self = Kefir.sampledBy(
    [
      countdownStream,
      bubbleStream,
      scoreStream
    ],
    [ deltaStream ],
    function (countdown, bubbles, score) {
      return {
        countdown: countdown,
        bubbles: bubbles,
        score: score
      };
    }
  );

  return self;

};

/**
* Module Exports
*/
exports = module.exports = PopStream;
