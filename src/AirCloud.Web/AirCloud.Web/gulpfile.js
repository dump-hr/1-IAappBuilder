/// <binding AfterBuild='default' />
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('default', ['styles', 'vendor', 'app']);

gulp.task('styles', function () {
  gulp.src('Styles/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./Styles/Css/'))
      .pipe(cleanCSS())
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('./Styles/Css/'));
});

gulp.task('vendor', function () {
  gulp.src(['Scripts/Vendor/jquery-2.2.3.min.js', 'Scripts/Vendor/angular.min.js', 'Scripts/Vendor/*.js'])
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest('./Scripts/Dist/'))
      .pipe(uglify())
      .pipe(rename('vendor.min.js'))
      .pipe(gulp.dest('./Scripts/Dist/'));
});

gulp.task('app', function () {
  gulp.src(['Scripts/App/app.module.js', 'Scripts/App/app.config.js', 'Scripts/App/**/*.js'])
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./Scripts/Dist/'))
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('./Scripts/Dist/'));
});

gulp.task('watch', function () {
  gulp.watch('Styles/Scss/**/*.scss', ['styles']);
  gulp.watch('Scripts/Vendor/*.js', ['vendor']);
  gulp.watch('Scripts/App/**/*.js', ['app']);
});
