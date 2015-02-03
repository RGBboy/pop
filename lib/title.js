'use strict';
/*!
* Title Component
*/

/**
* Module Dependencies
*/
var Title,
    React = require('react');

Title = React.createClass({
  render: function () {

    return React.createElement('div', { className: 'Title' },
      React.createElement('h1', { className: 'u-textCenter' }, 'Pop!'),
      React.createElement('div', { className: 'u-textCenter' },
        React.createElement('button', {
          className: 'Title-play Button Button--default',
          onClick: this.props.updateView.bind(null, 'countdown')
        }, 'Play')
      )
    );

  }
});

/**
* Module Exports
*/
exports = module.exports = Title;
