const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const preset = require('postcss-preset-env');
const cleancss = require('gulp-clean-css');
const minjs = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

/*### CSS Task ###*/
gulp.task('scss', () => {
  const precss=[preset({stage: 0,browsers:'last 4 version'})]
  return gulp.src('src/scss/style.scss')
  .pipe(sass().on('error',sass.logError))
  .pipe(cleancss())
  .pipe(rename({suffix:'.min'}))
  .pipe(sourcemaps.init())
  .pipe(postcss(precss))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/assets/css'));
});

/*### JS Task ###*/
gulp.task('js', () => {
  return gulp.src('src/js/main.js')
  .pipe(rename({suffix:'.min'}))
  .pipe(sourcemaps.init())
  .pipe(minjs())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/assets/js/'));
});

/*### HTML Task ###*/
gulp.task('html', () => {
  return gulp.src('src/html/*.html')
  .pipe(gulp.dest('dist'));
});

/*### Image Task ###*/
gulp.task('img', () => {
   return gulp.src('src/img/**/*')
  .pipe(gulp.dest('dist/assets/img'));
});

/*### CSS Vendor Folder ###*/
gulp.task('cssvendor',()=>{
  return gulp.src('src/cssvendor/**')
  .pipe(gulp.dest('dist/assets/css/'));
 });

/*### JS Vendor Folder ###*/
gulp.task('jsvendor', () => {
   return gulp.src('src/jsvendor/**/*')
  .pipe(gulp.dest('dist/assets/js'));
});

/*### Watch Task ###*/
gulp.task('watch', () => {
  gulp.watch("src/scss/**/*.scss", gulp.task('scss'));
  gulp.watch("src/cssvendor/**", gulp.task('cssvendor'));
  gulp.watch("src/js/main.js", gulp.task('js'));
  gulp.watch("src/jsvendor/**/*.*", gulp.task('jsvendor'));
  gulp.watch("src/html/*.html", gulp.task('html'));
  gulp.watch("src/img/**/*.*", gulp.task('img'));
  
});

/*### Default Task ###*/
gulp.task('default', gulp.parallel('scss', 'cssvendor', 'js', 'jsvendor' ,'html', 'img', 'watch'));