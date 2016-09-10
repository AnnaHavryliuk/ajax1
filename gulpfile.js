var gulp = require('gulp')
  , sass = require('gulp-sass')
  , wiredep = require('wiredep').stream;

gulp.task('bower', function () {
  gulp.src('index.html')
    .pipe(wiredep({
      js: ['bower_components/underscore/underscore.min.js']
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', ['sass']);
});