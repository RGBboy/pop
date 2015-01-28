'use strict';
/*!
* Bubble unit tests
*/

/**
* Module Dependencies
*/

var test = require('tape'),
    Bubble = require('../lib/bubble');

function testBubble (t, bubble, id) {
  t.equal(bubble.id, id);
  t.ok(bubble.radius >= 20 && bubble.radius <= 40);
  t.ok(bubble.x >= bubble.radius && bubble.x <= (320 - 2 * bubble.radius) + bubble.radius);
  t.ok(bubble.y >= 0 && bubble.y <= 480);
  t.ok(bubble.speed >= 0 && bubble.speed <= 1);
  t.equal(bubble.color, 'rgba(255, 255, 255, 0.5)');
};

/**
* Bubble.createBubble
*/

test('Bubble.createBubble should be a function', function (t) {
  t.plan(1);
  t.equal(typeof Bubble.createBubble, 'function');
});

test('Bubble.createBubble should return a Bubble', function (t) {
  var bubble,
      id = 0;

  t.plan(6);

  bubble = Bubble.createBubble(id);

  testBubble(t, bubble, id);

});

/**
* Bubble.createBubbles
*/

test('Bubble.createBubbles should be a function', function (t) {
  t.plan(1);
  t.equal(typeof Bubble.createBubbles, 'function');
});

test('Bubble.createBubbles should an array of Bubbles', function (t) {
  var bubbles,
      limit = 10;

  t.plan(7);

  bubbles = Bubble.createBubbles(limit);

  t.equal(bubbles.length, limit);

  testBubble(t, bubbles[0], 0);

});

/**
* Bubble.update
*/

test('Bubble.update should be a function', function (t) {
  t.plan(1);
  t.equal(typeof Bubble.update, 'function');
});

test('Bubble.update should update a bubble', function (t) {
  var bubble,
      delta = 50,
      time = 1000;

  t.plan(3);

  bubble = Bubble.createBubble(0);

  bubble.speed = 1;
  bubble.radius = 10;
  bubble.x = 0;
  bubble.y = 0;

  bubble = Bubble.update(delta, time, bubble);

  t.equal(bubble.x, Math.sin((Math.PI * time/1000) + (bubble.speed * 3)));
  t.equal(bubble.y, -(bubble.speed * 100 + 50) * delta / 1000);

  bubble.x = 0;
  bubble.y = -100;

  bubble = Bubble.update(delta, time, bubble);

  t.equal(bubble.y, 480 + 2 * bubble.radius);

});

/**
* Bubble.isColliding
*/

test('Bubble.isColliding should be a function', function (t) {
  t.plan(1);
  t.equal(typeof Bubble.isColliding, 'function');
});

test('Bubble.isColliding should return true when bubble collides with x and y', function (t) {
  var bubble;

  t.plan(5);

  bubble = Bubble.createBubble(0);

  bubble.radius = 10;
  bubble.x = 0;
  bubble.y = 0;

  t.equal(Bubble.isColliding(0, 0, bubble), true);
  t.equal(Bubble.isColliding(10, 0, bubble), true);
  t.equal(Bubble.isColliding(0, 10, bubble), true);
  t.equal(Bubble.isColliding(-10, 0, bubble), true);
  t.equal(Bubble.isColliding(0, -10, bubble), true);
});

test('Bubble.isColliding should return false when bubble collides with x and y', function (t) {
  var bubble;

  t.plan(4);

  bubble = Bubble.createBubble(0);

  bubble.radius = 10;
  bubble.x = 0;
  bubble.y = 0;

  t.equal(Bubble.isColliding(11, 0, bubble), false);
  t.equal(Bubble.isColliding(0, 11, bubble), false);
  t.equal(Bubble.isColliding(-11, 0, bubble), false);
  t.equal(Bubble.isColliding(0, -11, bubble), false);
});
