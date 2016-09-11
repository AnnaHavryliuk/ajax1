var gulp = require('gulp')
  , sass = require('gulp-sass')
  , runSequence = require('run-sequence')
  , cleanCSS = require('gulp-clean-css')
  , uglify = require('gulp-uglify')
  , wiredep = require('wiredep').stream
  , useref = require('gulp-useref');

gulp.task('bower', function () {
  gulp.src('src/*.html')
    .pipe(wiredep({
      css: ['../bower_components/normalize-css/normalize.css'],
      js: ['../bower_components/underscore/underscore-min.js']
    }))
    .pipe(gulp.dest('src'));
});

gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
});

gulp.task('useref', function() {
  return gulp.src('src/**/*.html')
  .pipe(useref())
  .pipe(gulp.dest('./'))
});

gulp.task('css:compress', function () {
    return gulp.src('css/main.min.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest('css'));
});

gulp.task('js:compress', function () {
   gulp.src('js/main.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('compress', ['css:compress', 'js:compress']);

gulp.task('build', function() {
  runSequence('useref', 'compress');
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/css/**/*.css', ['build']);
  gulp.watch('src/js/**/*.js', ['build']);
});