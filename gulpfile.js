const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const preset = require('postcss-preset-env');
const cleancss = require('gulp-clean-css');
const minjs = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

/*
### SCSS To CSS Task ###
*/
gulp.task('scss', () => {
  const precss=[preset({stage: 0,browsers:'last 4 version'})]
  return gulp.src('src/assets/scss/style.scss')
  .pipe(sass().on('error',sass.logError))
  .pipe(cleancss())
  .pipe(rename({suffix:'.min'}))
  .pipe(sourcemaps.init())
  .pipe(postcss(precss))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('src/assets/css'))
  .pipe(gulp.dest('dist/assets/css'));
 
});

/*
### CSS Framework Folder Task ###
CSS Framework dosyalarını buraya yükleyin.
src/assets/css/vendor -> içeriğini dist/assets/css/vendor içine yazıyor.
*/
gulp.task('css-framework',()=>{
  return gulp.src('src/assets/css/vendor/**/*.*')
  .pipe(gulp.dest('dist/assets/css/vendor/'));
 });

/*
### Script Folder Task ###
*/
gulp.task('js', () => {
  return gulp.src('src/assets/script/*.js')
  .pipe(rename({suffix:'.min'}))
  .pipe(sourcemaps.init())
  .pipe(minjs())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('src/assets/js'))
  .pipe(gulp.dest('dist/assets/js'));
});

/*
### JS Framework Folder Task ###
JS Framework dosyalarını buraya yükleyin.
src/assets/js/vendor -> içeriğini dist/assets/js/vendor içine yazıyor.
*/
gulp.task('js-framework', () => {
  return gulp.src('src/assets/js/vendor/**/*.*')
  .pipe(gulp.dest('dist/assets/js/vendor/'));
});

/*
### HTML Task ###
*/
gulp.task('html', () => {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('dist'));
});

/*
### Font Folder Task ###
*/
gulp.task('font', () => {
  return gulp.src('src/assets/font/**/*.*')
  .pipe(gulp.dest('dist/assets/font'));
});

/*
### Image Task ###
*/
gulp.task('img', () => {
   return gulp.src('src/assets/img/**/*')
  .pipe(gulp.dest('dist/assets/img'));
});


/*
### Watch Task ###
*/
gulp.task('watch', () => {
  gulp.watch("src/assets/scss/style.scss", gulp.task('scss'));
  gulp.watch("src/assets/css/vendor/**/*.*", gulp.task('css-framework'));
  gulp.watch("src/assets/script/*.js", gulp.task('js'));
  gulp.watch("src/assets/js/vendor/**/*.*", gulp.task('js-framework'));
  gulp.watch("src/*.html", gulp.task('html'));
  gulp.watch("src/assets/font",gulp.task('font'));
  gulp.watch("src/assets/img/**/*.*", gulp.task('img'));
 });
 
/*
### Default Task ###
*/

gulp.task('default', gulp.parallel('scss', 'css-framework', 'js', 'js-framework' ,'html', 'img', 'font', 'watch'));
