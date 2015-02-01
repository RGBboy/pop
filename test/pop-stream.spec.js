'use strict';
/*!
* Pop Stream unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    PopStream = require('../lib/pop-stream'),
    Kefir = require('kefir'),
    Bubble = require('../lib/bubble');

/**
* CountdownStream
*/

test('PopStream should be a function', function (t) {
  t.plan(1);
  t.equal(typeof PopStream, 'function');
});

test('PopStream should return a Kefir Stream', function (t) {

  var popStream,
      bubbleStream,
      deltaStream,
      inputStream;

  t.plan(1);

  bubbleStream = Kefir.emitter();
  deltaStream = Kefir.emitter();
  inputStream = Kefir.emitter();

  popStream = PopStream(bubbleStream, deltaStream, inputStream);

  t.ok(popStream instanceof Kefir.Stream, 'instance is Kefir Stream');

});

test('popStream should emit a state', function (t) {

  var popStream,
      bubbleStream,
      deltaStream,
      inputStream,
      time = 10000,
      delta = 50;

  t.plan(3);

  bubbleStream = Kefir.emitter();
  deltaStream = Kefir.emitter();
  inputStream = Kefir.emitter();

  popStream = PopStream(bubbleStream, deltaStream, inputStream, time);

  popStream.take(1).onValue(function (v) {
    t.equal(v.score, 0);
    t.equal(v.countdown, time - delta);
    t.equal(v.bubbles.length, 1);
  });

  bubbleStream.emit([Bubble.createBubble(0)]);
  deltaStream.emit(delta);

});

test('popStream should emit state with moved bubbles', function (t) {

  var popStream,
      bubbleStream,
      deltaStream,
      inputStream,
      bubble,
      bubbleX,
      bubbleY;

  t.plan(2);

  bubbleStream = Kefir.emitter();
  deltaStream = Kefir.emitter();
  inputStream = Kefir.emitter();

  popStream = PopStream(bubbleStream, deltaStream, inputStream);

  bubble = Bubble.createBubble(0);

  bubbleX = bubble.x;
  bubbleY = bubble.y;

  popStream.take(1).onValue(function (v) {
    t.notEqual(v.bubbles[0].x, bubbleX);
    t.notEqual(v.bubbles[0].y, bubbleY);
  });

  bubbleStream.emit([bubble]);
  deltaStream.emit(50);

});

test('popStream should move popped bubbles off screen', function (t) {

  var popStream,
      bubbleStream,
      deltaStream,
      inputStream,
      bubbles;

  t.plan(1);

  bubbleStream = Kefir.emitter();
  deltaStream = Kefir.emitter();
  inputStream = Kefir.emitter();

  popStream = PopStream(bubbleStream, deltaStream, inputStream);

  bubbles = [Bubble.createBubble(0)];

  bubbles[0].x = 50;
  bubbles[0].y = 50;
  bubbles[0].radius = 10;

  popStream.take(1).onValue(function (v) {
    t.ok(v.bubbles[0].y > 480, 'offscreen');
  });

  bubbleStream.emit(bubbles);
  inputStream.emit([50, 50])
  deltaStream.emit(50);

});

test('popStream should emit state with correct score', function (t) {

  var popStream,
      bubbleStream,
      deltaStream,
      inputStream,
      bubbles;

  t.plan(1);

  bubbleStream = Kefir.emitter();
  deltaStream = Kefir.emitter();
  inputStream = Kefir.emitter();

  popStream = PopStream(bubbleStream, deltaStream, inputStream);

  bubbles = [Bubble.createBubble(0), Bubble.createBubble(1), Bubble.createBubble(2)];

  bubbles[0].x = 0;
  bubbles[0].y = 0;
  bubbles[0].radius = 10;

  bubbles[1].x = 2;
  bubbles[1].y = 2;
  bubbles[1].radius = 10;

  bubbles[2].x = 10;
  bubbles[2].y = 10;
  bubbles[2].radius = 10;

  popStream.take(1).onValue(function (v) {
    t.equal(v.score, 200);
  });

  bubbleStream.emit(bubbles);
  inputStream.emit([0, 0])
  deltaStream.emit(50);

});
