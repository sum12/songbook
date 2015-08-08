'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

gulp.task('inject', ['styles'], function () {

  var injectStyles = gulp.src([
    paths.src + '/css/**/*.css',
  ], { read: false });

  var injectScripts = gulp.src([
    paths.src + '/js/**/*.js',
    '!' + paths.src + '/js/**/*.spec.js',
    '!' + paths.src + '/js/**/*.mock.js'
  ]).pipe($.angularFilesort());

  var injectOptions = {
    addRootSlash: false,
    addPrefix:'board',
    transform: function (filepath) {
                if (filepath.slice(-3) === '.js') {
                    return "<script src=\"{% static \""+ filepath +"\" %}\" type=\"text/javascript\" charset=\"utf-8\"></script>";
                }
                if (filepath.slice(-4) === '.css') {
                    return "<link rel=\"stylesheet\" href=\"{% static \""+filepath+"\" %}\" />";
                }
            return $.inject.transform.apply($.inject.transform, arguments);
     }
  }

  var wiredepOptions = {
    read:false,
    devDependencies: true,
    ignorePath:'../../static/',
    directory: 'bower_components',
    exclude: [/bootstrap\.css/, /bootstrap\.css/, /foundation\.css/],
    relative:false,
    fileTypes:{
        html:{
            replace:{
                js:function(filepath){
                        return "<script src=\"{% static \""+ filepath + "\" %}\" type=\"text/javascript\" charset=\"utf-8\"></script>";
                },
                css:function(filepath){
                        return "<link rel=\"stylesheet\" href=\"{% static \""+filepath+"\" %}\" />";
                }
            }
        }
    }
  };

  return gulp.src(paths.src + '/../../templates/book/base.html')
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(paths.src + '/../../templates/book/'));

});
