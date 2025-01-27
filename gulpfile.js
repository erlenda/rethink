var fs = require('fs');
var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var websocketServer = require('./js/server/index');
var webserver = require('gulp-webserver');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var duration = require('gulp-duration');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');

function handleError() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
}

function notifyNewBundle () {
  var args = Array.prototype.slice.call(arguments);
  notify({
    title: 'Bundle update',
    message: '<%= update.message %>'
  }).apply(this, args);
}

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: {
        enable: true
      },
      fallback: 'index.html',
      directoryListing: false
    }));
});

function scripts(watch) {
  var bundler,
      rebundle,
      pkg = JSON.parse(fs.readFileSync('./package.json'));

  bundler = browserify('./app.js', {
    basedir: __dirname,
    debug: true,
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: watch // required to be true only for watchify
  });
  if(watch) {
    bundler = watchify(bundler);
  }

  bundler.transform(reactify);
  var rebundleTimer;

  rebundle = function() {
    rebundleTimer = duration('bundle time');
    var stream = bundler.bundle();
    stream.on('error', handleError);
    stream = stream.pipe(source('app.js'));
    return stream.pipe(gulp.dest('./app/dist'));
  };

  bundler.on('update', function () {
    rebundle();
    gutil.log("Rebundle...");
  });
  return rebundle();
}

gulp.task("bundle-js", function () {
  return scripts(false);
});

gulp.task("websocketServer", function() {
  websocketServer(true);
});

gulp.task('bundle-js-watch', ['bundle-js'], function () {
  return scripts(true);
});

gulp.task("default", ['webserver', 'websocketServer', 'bundle-js-watch']);
