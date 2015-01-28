'use strict';
/*!
* Bubble
*/

/**
* Module Dependencies
*/

var Bubble = {};

Bubble.createBubble = function (id) {
  var bubble = {};
  bubble.id = id;
  bubble.radius = Math.round(Math.random() * 20) + 20;
  bubble.x = Math.random() * (320 - 2 * bubble.radius) + bubble.radius;
  bubble.y = Math.random() * 480;
  bubble.speed = Math.random();
  bubble.color = 'rgba(255, 255, 255, 0.5)';
  return bubble;
};

Bubble.createBubbles = function (limit) {
  var bubbles = [],
      i;
  for (i = 0; i < limit; i += 1) {
    bubbles.push(Bubble.createBubble(i));
  };
  return bubbles;
};

Bubble.update = function (delta, time, bubble) {
  bubble.y -= (bubble.speed * 100 + 50) * delta / 1000;
  bubble.x += Math.sin((Math.PI * time/1000) + (bubble.speed * 3));
  // move bubble back to start
  if (bubble.y < -2 * bubble.radius) {
    bubble.y = 480 + 2 * bubble.radius;
  };
  return bubble;
};

Bubble.isColliding = function (x, y, bubble) {
  return (Math.pow(x - bubble.x, 2) + Math.pow(y - bubble.y, 2)) <= Math.pow(bubble.radius, 2);
};

/**
* Module Exports
*/

exports = module.exports = Bubble;
