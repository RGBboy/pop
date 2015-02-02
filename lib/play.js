'use strict';
/*!
* Play View
*/

/**
* Module Dependencies
*/
var play,
    h = require('virtual-dom/h'),
    render = require('./canvas-render');

function hook (element) {
  render(element.getContext('2d'), this.bubbles);
};

play = function (state) {

  var timeLeft = '' + Math.ceil(state.countdown/1000);

  return h('div', { className: 'Play' }, [
    h('h3', { className: 'Play-time u-textCenter' }, timeLeft),
    h('h3', { className: 'Play-score u-textCenter' }, '' + state.score),
    h('canvas',
      {
        width: 320,
        height: 480,
        style: {
          position: 'absolute',
          top: '0px',
          left: '0px'
        },
        className: 'Play-canvas u-textCenter',
        onclick: function (event) {
          var bounds = this.getBoundingClientRect();
          state.popBubbles(event.clientX - bounds.left, event.clientY - bounds.top);
        },
        ontouchstart: function (event) {
          var bounds = this.getBoundingClientRect(),
              i;
          // changedTouches is not an array, its just an object with length !! derp DOM
          for (i = 0; i < event.changedTouches.length; i += 1) {
            state.popBubbles(event.changedTouches[i].clientX - bounds.left, event.changedTouches[i].clientY - bounds.top);
          };
        },
        updateHook: Object.create({
          hook: hook,
          bubbles: state.bubbles
        })
      }
    )
  ]);

};

/**
* Module Exports
*/
exports = module.exports = play;
