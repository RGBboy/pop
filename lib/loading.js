'use strict';
/*!
* Loading Component
*/

/**
* Module Dependencies
*/
var Loading,
    React = require('react');

Loading = React.createClass({
  render: function () {

    return React.createElement('div', { className: 'Loading' },
      React.createElement('h3', { className: 'u-textCenter' }, 'Loading...')
    );

  }
});

/**
* Module Exports
*/
exports = module.exports = Loading;
