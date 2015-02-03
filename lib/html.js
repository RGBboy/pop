'use strict';
/*!
 * HTML Component
 */

/**
 * Module Dependencies
 */
var Html,
    render,
    React = require('react'),
    App = require('./app');

Html = React.createClass({
  render: function () {

    return React.createElement('html', { lang: 'en' },
      React.createElement('head', null,
        React.createElement('meta', { charSet: 'utf-8' }),
        React.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
        React.createElement('title', null, 'Pop!'),
        React.createElement('meta', { name: 'description', content: '' }),
        React.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' }),
        React.createElement('meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }),
        React.createElement('link', { rel: 'stylesheet', href: '/style.css' })
      ),
      React.createElement('body', null,
        React.createElement(App, { view: 'loading' }),
        React.createElement('script', { src: '/index.js' })
      )
    );

  }
});

render = function () {
  return '<!doctype html> \n' + React.renderToStaticMarkup(React.createElement(Html));
};

/**
 * Module Exports
 */
exports = module.exports = render;
