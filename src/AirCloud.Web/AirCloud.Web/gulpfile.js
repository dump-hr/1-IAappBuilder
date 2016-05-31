/// <binding AfterBuild='default' />
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('default', ['styles']);

gulp.task('styles', function () {
  gulp.src('Styles/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./Styles/Css/'))
      .pipe(cleanCSS())
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('./Styles/Css/'));
});

gulp.task('watch', function () {
  gulp.watch('Styles/*.scss', ['styles']);
  gulp.watch('Scripts/Vendor/*.js', ['vendor']);
  gulp.watch('Scripts/App/**/*.js', ['app']);
});
