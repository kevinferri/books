var gulp = require('gulp');
var uglify = require('gulp-uglify');

// Uglifies js
gulp.task('scripts', function() {
  gulp.src('./public/javascripts/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
});

// Uglifies css
gulp.task('styles', function() {
  console.log('styles')
});

// Watches js
gulp.task('watch', function() {
  gulp.watch('./public/javascripts/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);