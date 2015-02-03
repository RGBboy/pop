'use strict';
/*!
* Replay Component
*/

/**
* Module Dependencies
*/
var Replay,
    React = require('react');


Replay = React.createClass({
  render: function () {

    return React.createElement('div', { className: 'Replay' },
      React.createElement('h2', { className: 'u-textCenter' }, 'Time\'s Up!'),
      React.createElement('p', { className: 'Replay-score u-textCenter' }, 'You scored ' + this.props.score + ' points!' ),
      React.createElement('div', { className: 'u-textCenter' },
        React.createElement('button', {
          className: 'Replay-replay Button Button--default',
          onClick: this.props.updateView.bind(null, 'countdown')
        }, 'Replay'),
        ' ',
        React.createElement('button', {
          className: 'Replay-menu Button Button--default',
          onClick: this.props.updateView.bind(null, 'title')
        }, 'Menu')
      )
    );

  }
});

/**
* Module Exports
*/
exports = module.exports = Replay;
