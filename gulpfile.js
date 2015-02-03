'use strict';
/*!
 * Gulp Tasks
 */

/**
 * Module Dependencies
 */
var gulp = require('gulp'),
    del = require('del'),
    serve = require('gulp-serve'),
    file = require('gulp-file'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    through = require('through2'),
    html = require('./lib/html'),
    processCSS = require('suitcss-preprocessor'),
    browserify = require('browserify');

gulp.task('default', function () {});

gulp.task('html', function () {
  return file('index.html', html(), { src: true })
    .pipe(gulp.dest('./build'));
});

gulp.task('css', function () {
  return gulp.src('./lib/style.css')
    .pipe(through.obj(function (data, enc, next) {
      var compress = false;
      if (process.env.NODE_ENV === 'production') {
        compress = true;
      };
      data.contents = new Buffer(
        processCSS(data.contents.toString('utf8'), {
          compress: compress,
          source: data.path
        })
      );
      this.push(data);
      next();
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('js', function () {
  return gulp.src('./lib/client.js', { buffer: false })
    .pipe(rename('index.js'))
    .pipe(through.obj(function (file, enc, next) {
      var stream = browserify(file.contents, { basedir: __dirname + '/lib' });

      if (process.env.NODE_ENV === 'production') {
        stream = stream.transform({ global: true }, 'uglifyify');
      };

      file.contents = stream.bundle();
      this.push(file);
      next();
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('public', function () {
  return gulp.src('./public/**/*')
    .pipe(gulp.dest('./build'));
});

gulp.task('clean', function (cb) {
  del(['./build/**/*', '!./build/*'], cb);
});

gulp.task('dev', ['build', 'serve', 'watch']);

gulp.task('build', function (callback) {
  runSequence('clean', ['html', 'css', 'js', 'public'], callback);
});

gulp.task('serve', serve({
  port: 8080,
  root: 'build',
  livereload: true
}));

gulp.task('watch', function () {
  gulp.watch(['./lib/**/*', './public/**/*'], ['build']);
});
