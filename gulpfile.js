const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const preset = require('postcss-preset-env');
const cleancss = require('gulp-clean-css');
const minjs = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');


/*### SCSS To CSS Task ###*/
gulp.task('scss', () => {
  const precss=[preset({stage: 0,browsers:'last 4 version'})]
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass().on('error',sass.logError))
  .pipe(cleancss())
  .pipe(rename({suffix:'.min'}))
  .pipe(sourcemaps.init())
  .pipe(postcss(precss))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('src/assets/css'));
});

/*
### CSS dist Task ###
src/assets/css -> içeriğini, dist/assets/css içine yazıyor.
*/
gulp.task('cssdist',()=>{
  return gulp.src('src/assets/css/**/*.*')
  .pipe(gulp.dest('dist/assets/css'));
});

/*
### CSS Vendor Folder ###
CSS Framework dosyalarını buraya yükleyin.
src/cssvendor -> içeriğini dist/assets/css/vendor içine yazıyor.
*/
gulp.task('cssvendor',()=>{
  return gulp.src('src/cssvendor/**/*.*')
  .pipe(gulp.dest('src/assets/css/'));
 });

/*### JS Task ###*/
gulp.task('js', () => {
  return gulp.src('src/js/**/*.js')
  .pipe(rename({suffix:'.min'}))
  .pipe(sourcemaps.init())
  .pipe(minjs())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('src/assets/js'));
});

/*
### JS dist Task ###
src/assets/js -> içeriğini, dist/assets/js içine yazıyor.
*/
gulp.task('jsdist',()=>{
  return gulp.src('src/assets/js/**/*.*')
  .pipe(gulp.dest('dist/assets/js'));
});

/*### JS Vendor Folder ###
JS Framework dosyalarını buraya yükleyin.
src/jsvendor -> içeriğini dist/assets/js/vendor içine yazıyor.
*/
gulp.task('jsvendor', () => {
  return gulp.src('src/jsvendor/**/*.*')
 .pipe(gulp.dest('src/assets/js'));
});

/*### HTML Task ###*/
gulp.task('html', () => {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('dist'));
});

/*### Image Task ###*/
gulp.task('img', () => {
   return gulp.src('src/assets/img/**/*')
  .pipe(gulp.dest('dist/assets/img'));
});

/*### Watch Task ###*/
gulp.task('watch', () => {
  gulp.watch("src/scss/**/*.scss", gulp.task('scss'));
  gulp.watch("src/assets/css/**/*.*", gulp.task('cssdist'));
  gulp.watch("src/cssvendor/**/*.*", gulp.task('cssvendor'));
  gulp.watch("src/js/**/*.js", gulp.task('js'));
  gulp.watch("src/assets/js/**/*.*", gulp.task('jsdist'));
  gulp.watch("src/jsvendor/**/*.*", gulp.task('jsvendor'));
  gulp.watch("src/*.html", gulp.task('html'));
  gulp.watch("src/assets/img/**/*.*", gulp.task('img'));
});

/*### Default Task ###*/
gulp.task('default', gulp.parallel('scss','cssdist', 'cssvendor', 'js', 'jsdist', 'jsvendor' ,'html', 'img', 'watch'));