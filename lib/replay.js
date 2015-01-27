'use strict';
/*!
* Replay View
*/

/**
* Module Dependencies
*/
var replay,
    h = require('virtual-dom/h');


replay = function (state) {

  return h('div', { className: 'Replay' }, [
    h('h2', { className: 'u-textCenter' }, 'Time\'s Up!'),
    h('p', { className: 'Replay-score u-textCenter' }, 'You scored ' + state.score + ' points!' ),
    h('div', { className: 'u-textCenter' }, [
      h('button', {
        className: 'Replay-replay Button Button--default',
        onclick: state.updateView.bind(null, 'countdown')
      }, 'Replay'),
      ' ',
      h('button', {
        className: 'Replay-menu Button Button--default',
        onclick: state.updateView.bind(null, 'title')
      }, 'Menu')
    ])
  ]);


};

/**
* Module Exports
*/
exports = module.exports = replay;
