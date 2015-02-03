'use strict';
/*!
* Play Component
*/

/**
* Module Dependencies
*/
var Play,
    React = require('react'),
    render = require('../canvas-render');

Play = React.createClass({
  getInitialState: function () {
    return {
      canvas: null,
      context: null
    };
  },
  componentDidMount: function () {
    var canvas = this.refs.playCanvas.getDOMNode();
    this.setState({
      canvas: canvas,
      context: canvas.getContext('2d')
    });
  },
  componentDidUpdate: function () {
    render(this.state.context, this.props.bubbles);
  },
  handleMouseDown: function (event) {
    var bounds = this.state.canvas.getBoundingClientRect();
    this.props.popBubbles(event.clientX - bounds.left, event.clientY - bounds.top);
  },
  handleTouchStart: function (event) {
    var bounds = this.state.canvas.getBoundingClientRect(),
        i;
    // changedTouches is not an array, its just an object with length !! derp DOM
    for (i = 0; i < event.changedTouches.length; i += 1) {
      this.props.popBubbles(event.changedTouches[i].clientX - bounds.left, event.changedTouches[i].clientY - bounds.top);
    };
  },
  render: function () {

    var timeLeft = '' + Math.ceil(this.props.countdown/1000);

    return React.createElement('div', { className: 'Play' },
      React.createElement('h3', { className: 'Play-time u-textCenter' }, timeLeft),
      React.createElement('h3', { className: 'Play-score u-textCenter' }, '' + this.props.score),
      React.createElement('canvas',
        {
          ref: 'playCanvas',
          width: 320,
          height: 480,
          className: 'Play-canvas u-textCenter',
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart
        }
      )
    );

  }
});

/**
* Module Exports
*/
exports = module.exports = Play;
