'use strict';

var gulp = require('gulp');

gulp.paths = {
  src: '.',
  bower: 'bower_components'
};

require('require-dir')('./gulp');

gulp.task('default', ['clean','test'], function () {
    gulp.start('build');
});
