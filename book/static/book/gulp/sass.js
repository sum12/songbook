'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  //return gulp.src(['./js/**/*.scss','./bower_components/**/*.scss' ])
  return gulp.src(['./css/**/*.scss','./bower_components/**/*.scss' ])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
