"use strict"

var gulp = require('gulp'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css');

// server connect
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

// css
gulp.task('css', function () {
  return gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(cleanCSS())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('app/'))
    .pipe(connect.reload())
});
// html
gulp.task('html', function(){
	gulp.src('app/index.html')
	.pipe(connect.reload());
})
// watch
gulp.task('watch', function(){
	gulp.watch('scss/*.scss', ['css'])
	gulp.watch('app/index.html', ['html'])
})
// default
gulp.task('default', ['connect', 'css', 'html','watch']);