'use strict';
/*!
 * HTML View
 */

/**
 * Module Dependencies
 */
var html,
    h = require('virtual-dom/h'),
    stringify = require('virtual-dom-stringify'),
    app = require('./app');

html = function () {

  var contents;

  contents = h('html', { lang: 'en' }, [
    h('head', [
      h('meta', { charset: 'utf-8' }),
      h('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
      h('title', 'Pop!'),
      h('meta', {  name: 'description', content: '' }),
      h('meta', {  name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' }),
      h('meta', {  name: 'apple-mobile-web-app-capable', content: 'yes' }),
      h('link', { rel: 'stylesheet', href: '/style.css' })
    ]),
    h('body', [
      app(),
      h('script', { src: '/index.js' })
    ])
  ]);

  return '<!doctype html> \n' + stringify(contents);

};

/**
 * Module Exports
 */
exports = module.exports = html;
