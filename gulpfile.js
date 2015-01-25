var gulp = require("gulp");

gulp.task('stylus', function () {
  var stylus = require('gulp-stylus');
  var autoprefixer = require('gulp-autoprefixer');

  return gulp.src('./styl/index.styl')
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('lint', function () {
  var jshint = require('gulp-jshint');
  var stylish = require('jshint-stylish');

  return gulp.src(['./js/**/*', './examples/**/*.js', './gulpfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('js', ['lint'], function () {
  var browserify = require('browserify');
  var source = require('vinyl-source-stream');
  var bundler = browserify({ entries: './examples/index.js' });

  return bundler
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/examples'));
});

gulp.task('copy:examples', function () {
  return gulp.src('./examples/index.html')
    .pipe(gulp.dest('./dist/examples'));
});

gulp.task('default', ['stylus', 'js', 'copy:examples']);