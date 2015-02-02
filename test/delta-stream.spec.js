'use strict';
/*!
* Delta Stream unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    DeltaStream = require('../lib/delta-stream'),
    Kefir = require('kefir'),
    noop = function () {};

/**
* DeltaStream
*/

test('DeltaStream should be a function', function (t) {
  t.plan(1);
  t.equal(typeof DeltaStream, 'function');
});

test('DeltaStream should return a Kefir Stream', function (t) {

  var deltaStream,
      loop = noop,
      getTime,
      time = 0;

  t.plan(1);

  getTime = function () {
    return time;
  };

  deltaStream = DeltaStream(loop, getTime);

  t.ok(deltaStream instanceof Kefir.Stream, 'instance is Kefir Stream');

});

test('DeltaStream should emit the time taken since last callback', function (t) {

  var deltaStream,
      loop,
      callbacks = [],
      callback,
      getTime,
      time = 200,
      delta = 50;

  t.plan(3);

  loop = function (cb) {
    callbacks.push(cb);
  };

  getTime = function () {
    return time;
  };

  deltaStream = DeltaStream(loop, getTime);

  deltaStream.take(1).onValue(function (value) {
    t.equal(value, 50);
  });

  deltaStream.skip(1).take(1).onValue(function (value) {
    t.equal(value, 50);
  })

  deltaStream.skip(2).take(1).onValue(function (value) {
    t.equal(value, 50);
  })

  callback = callbacks.shift();
  time += delta;
  callback();
  callback = callbacks.shift();
  time += delta;
  callback();
  callback = callbacks.shift();
  time += delta;
  callback();

});
