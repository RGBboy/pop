'use strict';
/*!
 * Server
 */

/**
 * Module Dependencies
 */

var http = require('http'),
    fs = require('fs'),
    html = require('./lib/html'),
    page = function (req, res, next) {
      if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.end(html());
      } else {
        next();
        return;
      };
    },
    browserify = require('browserify'),
    script = function (req, res, next) {
      if (req.url === '/index.js') {
        res.setHeader('Content-Type', 'text/javascript');
        browserify([__dirname + '/lib/client'])
          .bundle()
          .pipe(res);
      } else {
        next();
        return;
      };
    },
    processCSS = require('suitcss-preprocessor'),
    style = function (req, res, next) {
      if (req.url === '/style.css') {
        res.setHeader('Content-Type', 'text/css');
        fs.readFile(__dirname + '/lib/style.css', 'utf-8', function (err, data) {
          if (err) {
            next(err);
            return;
          };
          res.end(processCSS(data, {
            source: __dirname + '/lib/style.css'
          }));
        });
      } else {
        next();
      };
    },
    stack = require('stack'),
    server = http.createServer(
      stack(
        page,
        script,
        style
      )
    );

server.listen(8080);
console.log('Listening on :8080');
