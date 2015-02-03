'use strict';
/*!
 * Server
 */

/**
 * Module Dependencies
 */

var http = require('http'),
    fs = require('fs'),
    zlib = require('zlib'),
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
        var gzip = zlib.createGzip();
        res.setHeader('Content-Type', 'text/javascript');
        res.setHeader('Content-Encoding', 'gzip');
        browserify([__dirname + '/lib/client'])
          .transform({ global: true }, 'uglifyify')
          .bundle()
          .pipe(gzip)
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
    ecstatic = require('ecstatic')(__dirname + '/public'),
    stack = require('stack'),
    server = http.createServer(
      stack(
        page,
        script,
        style,
        ecstatic
      )
    );

server.listen(8080);
console.log('Listening on :8080');
