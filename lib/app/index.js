'use strict';
/*!
 * App Component
 */

/**
 * Module Dependencies
 */
var App,
    React = require('react/addons'),
    Loading = require('../loading'),
    Title = require('../title'),
    Countdown = require('../countdown'),
    Play = require('../play'),
    Replay = require('../replay');

var App = React.createClass({
  render: function () {

    var element;

    if (this.props.view === 'loading') {
      element = React.createElement(Loading, this.props);
    } else if (this.props.view === 'title') {
      element = React.createElement(Title, this.props);
    } else if (this.props.view === 'countdown') {
      element = React.createElement(Countdown, this.props);
    } else if (this.props.view === 'play') {
      element = React.createElement(Play, this.props);
    } else if (this.props.view === 'replay') {
      element = React.createElement(Replay, this.props);
    };

    return React.createElement('div',
      { id: 'App', className: 'App u-posAbsoluteCenter' },
      React.createElement(React.addons.CSSTransitionGroup,
        { transitionName: 'App-animation' },
        React.createElement('div',
          { className: 'App-animation', key: this.props.view },
          React.createElement('div',
            { className: 'App-screen Arrange Arrange--middle' },
            React.createElement('div',
              { className: 'Arrange-sizeFill' },
              element
            )
          )
        )
      )
    );

  }
});

/**
 * Module Exports
 */
exports = module.exports = App;
