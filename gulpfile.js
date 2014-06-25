var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var htmlencode = require('./gulp-htmlencode');

gulp.task('less', function() {
  gulp.src('./component/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'common/base'), path.join(__dirname, 'common/component')]
    }))
    .pipe(gulp.dest(function (file) {
      return file.base.replace(file.cwd, '.');
    }));

  gulp.src('./common/img/**/*.*')
    .pipe(gulp.dest('./component/img/'));
});

gulp.task('htmlencode', function () {
  gulp.src('./component/**/*.html')
    .pipe(htmlencode())
    .pipe(gulp.dest(function (file) {
      return file.base.replace(file.cwd, '.');
    }))
})

gulp.task('default', ['less', 'htmlencode']);