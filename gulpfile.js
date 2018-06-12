var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify');

gulp.task("sass", function(){
    return gulp.src('./sass/style.scss')
      .pipe(sass())
      .pipe(cssnano())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest("./public"))
})

gulp.task('scripts', function () {
  gulp.src('./js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('./public'))
});


gulp.task('watch', function(){
  gulp.watch('./sass/*.scss', ["sass"]);
  gulp.watch('./js/*.js', ['scripts']);
})

gulp.task('default', ['watch']);