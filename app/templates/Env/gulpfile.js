
var gulp = require('gulp');
var jade = require('gulp-jade');
var server = require('gulp-server-livereload');
var stylus = require('gulp-stylus');
var sourcemaps=require('gulp-sourcemaps');
//--validators
var htmlhint = require("gulp-htmlhint");

var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
//---------------------------------------


//TASKS

//jade compile
gulp.task('jade-compile',function(){
  gulp.src('source/templates/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist/'));
});
//--------------------------------

//stylus-compile
gulp.task('stylus-compile',function(){
  gulp.src('source/styles/*.styl')
    .pipe(sourcemaps.init())
      .pipe(stylus({
        'compress':true,
        'include css': true
      }))
    .pipe(sourcemaps.write('sourcemaps'))
    .pipe(gulp.dest('dist/css/'));
});
//------------------------------------
//web-server
gulp.task('web-server',function(){
  gulp.src('dist')
    .pipe(server({
      livereload:true,
      open:true,
      host:'localhost',
      port:'8000',
      defaultfile:'index.html',
      log:'debug'
    }));
});
//validators
gulp.task('jshint',function(){
  gulp.src('source/js/app/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('htmlhint',function(){
  gulp.src('dist/*.html')
  .pipe(htmlhint({
    'doctype-html5':true,
    'img-alt-require':true,
    'head-script-disabled':true,
    'head-script-disabled':true // put false for modernizr
  }))
  .pipe(htmlhint.reporter());
});
//gulp copy js files
gulp.task('copy-Js',function(){
  gulp.src('source/js/**/*')
    .pipe(gulp.dest('dist/js'));
});
//gulp min js
gulp.task('uglify',function(){
  gulp.src('source/js/app/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/app/'))
});
//---------------------------------------------

//watch changes
gulp.task('watch',function(){
  //watch jade
  gulp.watch(['source/templates/*.jade',
              'source/templates/layout/*.jade'],
              ['jade-compile','htmlhint']);
  //watch sass
  gulp.watch(['source/styles/*.styl'],
              ['stylus-compile']);
  //js
  gulp.watch(['source/js/app/main.js'],['uglify']);

});
//-----------------------------------

//run gulp for start all task in that array
gulp.task('default',['watch','web-server','copy-Js']);
