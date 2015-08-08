'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

gulp.task('watch', ['inject'], function () {

  gulp.watch([
    paths.src + '/**/*.less',
    paths.src + '/**/*.js',
    paths.src + '/js/*.js',
    paths.src + '/css/*.css',
    paths.src + '/less/*.less',
    'bower.json'
  ], ['inject']);
});
