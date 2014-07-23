var http = require('http');
var path = require('path');
var gulp = require('gulp');
var ecstatic = require('ecstatic');
var stylus = require('gulp-stylus');
var lint = require('gulp-jshint');
var jade = require('gulp-jade');
var wrap = require('gulp-wrap-amd');
var livereload = require('gulp-livereload');

gulp.task('stylus', function(){
  gulp.src('client/css/*.styl')
  .pipe(stylus())
  .pipe(gulp.dest('public/css'))
  .pipe(livereload());
});

gulp.task('templates', function(){
  gulp.src('./client/templates/**/*.jade')
  .pipe(jade({client:true}))
  .pipe(wrap({
    deps: ['vendor/jade'],
    params: ['jade']
  }))
  .pipe(gulp.dest('./public/templates'))
  .pipe(livereload());

});

gulp.task('jade', function(){
  gulp.src('./client/index.jade')
  .pipe(jade())
  .pipe(gulp.dest('./public'))
  .pipe(livereload());
});

gulp.task('scripts', function(){
  gulp.src('client/js/**/*.js')
  .pipe(gulp.dest('public/js'))
  .pipe(lint())
  .pipe(lint.reporter())
  .pipe(livereload());
});

gulp.task('watch', function(){
  gulp.watch('client/css/*.styl', ['stylus']);
  gulp.watch('client/**/*.js', ['scripts']);
  gulp.watch('client/index.jade', ['jade']);
  gulp.watch('client/templates/**/*.jade', ['templates'])
});

gulp.task('default', ['stylus', 'templates', 'jade', 'scripts', 'watch']);
