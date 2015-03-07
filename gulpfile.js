var gulp = require("gulp"),

    // gulp plugins and helpers
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    jshint = require('gulp-jshint'),
    source = require('vinyl-source-stream'),
    stylish = require('jshint-stylish'),
    stylus = require('gulp-stylus'),

    // configuration
    paths = {
      js: {
        main: './examples/index.js',
        all: ['./js/**/*', './examples/**/*.js', './gulpfile.js'],
        dest: './dist/examples'
      },
      stylus: {
        main: './examples/index.styl',
        all: ['./examples/**/*.styl'],
        dest: './dist/examples'
      },
      html: {
        // main: '',
        all: ['./examples/**/*.html'],
        dest: './dist/examples'
      }
    };

gulp.task('stylus', function () {
  return gulp.src(paths.stylus.main)
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.stylus.dest));
});

gulp.task('lint', function () {
  return gulp.src(paths.js.all)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('js', ['lint'], function () {
  return browserify({ entries: paths.js.main })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task('copy:html', function () {
  return gulp.src(paths.html.all)
    .pipe(gulp.dest(paths.html.dest));
});

gulp.task('build', ['stylus', 'js', 'copy:html']);

gulp.task('watch', ['build'], function () {
  gulp.watch(paths.stylus.all, ['stylus']);
  gulp.watch(paths.js.all, ['js']);
  gulp.watch(paths.html.all, ['copy:html']);
});

gulp.task('default', ['build']);
