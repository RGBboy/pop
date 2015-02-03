'use strict';
/*!
* Countdown Component
*/

/**
* Module Dependencies
*/
var Countdown,
    React = require('react');


Countdown = React.createClass({
  render: function () {

    var timeLeft = '' + Math.ceil(this.props.countdown/1000) || 0;

    return React.createElement('div', { className: 'Countdown' },
      React.createElement('h2', { className: 'u-textCenter' }, 'Get ready!'),
      React.createElement('h3', { className: 'Countdown-time u-textCenter' }, timeLeft)
    );

  }
});

/**
* Module Exports
*/
exports = module.exports = Countdown;
