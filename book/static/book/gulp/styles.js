'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

gulp.task('styles', ['sass'] ,function () {

  var lessOptions = {
    paths: [
      'bower_components',
    ]
  };

  var injectFiles = gulp.src([
    'bower_components/**/*.less',
    paths.src + '/css/**/*.less',
    '!' + paths.src + '/css/index.less',
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(paths.src + '/app/', '');
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };


  return gulp.src([
    paths.src + '/css/index.less',
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe($.less())

  .pipe($.autoprefixer())
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest(paths.src+'/css/'));
});
