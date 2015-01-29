'use strict';
/*!
* Countdown Stream unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    CountdownStream = require('../lib/countdown-stream'),
    Kefir = require('kefir');

/**
* CountdownStream
*/

test('CountdownStream should be a function', function (t) {
  t.plan(1);
  t.equal(typeof CountdownStream, 'function');
});

test('CountdownStream should return a Kefir Property', function (t) {

  var countdownStream,
      deltaStream,
      time = 2000;

  t.plan(1);

  deltaStream = Kefir.emitter();
  countdownStream = CountdownStream(deltaStream, time);

  t.ok(countdownStream instanceof Kefir.Property, 'instance is Kefir Property');

});

test('countdownStream should have a current value equal to time', function (t) {
  var countdownStream,
      deltaStream,
      delta = 50,
      time = 2000;

  t.plan(1);

  deltaStream = Kefir.emitter();
  countdownStream = CountdownStream(deltaStream, time);

  countdownStream.take(1).onValue(function (v) {
    t.equal(v, time);
  });

  deltaStream.end();

});

test('countdownStream should emit a value equal to time - delta', function (t) {
  var countdownStream,
      deltaStream,
      delta = 50,
      time = 2000;

  t.plan(1);

  deltaStream = Kefir.emitter();
  countdownStream = CountdownStream(deltaStream, time);

  countdownStream.skip(1).take(1).onValue(function (v) {
    t.equal(v, time - delta);
  });

  deltaStream.emit(delta);
  deltaStream.end();

});

test('countdownStream should end when value is equal to 0', function (t) {
  var countdownStream,
      deltaStream,
      delta = 2000,
      time = 2000;

  t.plan(1);

  deltaStream = Kefir.emitter();
  countdownStream = CountdownStream(deltaStream, time);

  countdownStream.onEnd(function () {
    t.pass('Stream ended');
  });

  deltaStream.emit(delta);

});

test('countdownStream should end when value less than 0', function (t) {
  var countdownStream,
      deltaStream,
      delta = 2050,
      time = 2000;

  t.plan(1);

  deltaStream = Kefir.emitter();
  countdownStream = CountdownStream(deltaStream, time);

  countdownStream.onEnd(function () {
    t.pass('Stream ended');
  });

  deltaStream.emit(delta);

});

test('countdownStream should end when deltaStream ends', function (t) {
  var countdownStream,
      deltaStream,
      time = 2000;

  t.plan(1);

  deltaStream = Kefir.emitter();
  countdownStream = CountdownStream(deltaStream, time);

  countdownStream.onEnd(function () {
    t.pass('Stream ended');
  });

  deltaStream.end();

});
