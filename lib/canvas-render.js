'use strict';
/*!
* Canvas Render
*/

/**
* Module Dependencies
*/
var Render;

function drawBubble (context, bubble) {
  context.beginPath();
  context.fillStyle = bubble.color;
  context.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
  context.fill();
};


Render = function (context, bubbles) {

  var i;

  context.save();
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  for (i = 0; i < bubbles.length; i += 1) {
    drawBubble(context, bubbles[i]);
  };

  context.restore();

};

/**
* Module Exports
*/
exports = module.exports = Render;
