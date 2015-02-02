'use strict';
/*!
* Pop
*/

/**
* Module Dependencies
*/

var Pop,
    Kefir = require('kefir'),
    raf = require('raf'),
    DeltaStream = require('./delta-stream'),
    Bubble = require('./bubble'),
    CountdownStream = require('./countdown-stream'),
    PopStream = require('./pop-stream');

function equals (value) {
  return function (arg) {
    return (arg === value);
  };
};

Pop = function () {

  var self,
      viewStream = Kefir.emitter(),
      viewStreamWithDefault = viewStream.toProperty('title'),
      deltaStream = DeltaStream(raf, Date.now),
      titleStream,
      countdownStream,
      playStream,
      replayStream,
      bubbleLimit = 20,
      bubblesStream = Kefir.emitter(),
      bubbleStreamWithDefault = bubblesStream.toProperty(Bubble.createBubbles(bubbleLimit)),
      inputStream = Kefir.emitter(),
      countdownTime = 1000,
      playTime = 2000,
      scoreStream;

  // actions

  function updateView (view) {
    viewStream.emit(view);
  };

  function popBubbles (x, y) {
    inputStream.emit([x, y]);
  };

  function addActions (state) {
    state.updateView = updateView;
    state.popBubbles = popBubbles;
    return state;
  };

  titleStream = viewStreamWithDefault
    .filter(equals('title'))
    .map(function (view) {
      return {
        view: view
      };
    });

  countdownStream = viewStreamWithDefault
    .filter(equals('countdown'))
    .map(function (view) {
      return CountdownStream(deltaStream, countdownTime)
        .map(function (time) {
          return {
            view: view,
            countdown: time
          };
        });
    });

  playStream = viewStreamWithDefault
    .filter(equals('play'))
    .map(function (view) {
      return PopStream(bubbleStreamWithDefault, deltaStream, inputStream, playTime)
        .map(function (state) {
          state.view = view;
          return state;
        });
    });

  playStream
    .flatMap()
    .onValue(function (state) {
      bubblesStream.emit(state.bubbles);
    });

  scoreStream = playStream
    .flatMap()
    .map(function (state) {
      return state.score;
    })
    .toProperty(0);

  replayStream = scoreStream
    .sampledBy(
      viewStreamWithDefault.filter(equals('replay')),
      function (score, view) {
        return {
          view: view,
          score: score
        }
      });

  playStream.onValue(function (stream) {
    stream.onEnd(updateView.bind(null, 'replay'));
  });

  countdownStream.onValue(function (stream) {
    stream.onEnd(updateView.bind(null, 'play'));
  });

  var flat = Kefir.merge([
      countdownStream,
      playStream
    ])
    .flatMapConcat();

  self = flat
    .merge(titleStream)
    .merge(replayStream)
    .map(addActions);

  return self;

};

/**
* Module Exports
*/

exports = module.exports = Pop;
