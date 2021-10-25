const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const preset = require('postcss-preset-env');
const cleancss = require('gulp-clean-css');
const minjs = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

/*
### SCSS To CSS Task ###
*/
gulp.task('scss', () => {
  const precss=[preset({stage: 0,browsers:'last 4 version'})]
  return gulp.src('scss/style.scss')
  .pipe(sass().on('error',sass.logError))
  .pipe(cleancss())
  .pipe(rename({suffix:'.min'}))
  .pipe(sourcemaps.init())
  .pipe(postcss(precss))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('css'))
  .pipe(gulp.dest('app/css'));
 
});

/*
### CSS Framework Folder Task ###
CSS Framework dosyalarını buraya yükleyin.
css/vendor -> içeriğini public/css/vendor içine yazıyor.
*/
gulp.task('css-framework',()=>{
  return gulp.src('css/vendor/**/*.*')
  .pipe(gulp.dest('app/css/vendor/'));
 });

/*
### Script Folder Task ###
*/
gulp.task('js', () => {
  return gulp.src('script/*.js')
  .pipe(babel({presets:['@babel/preset-env']}))
  .pipe(rename({suffix:'.min'}))
  .pipe(sourcemaps.init())
  .pipe(minjs())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('js'))
  .pipe(gulp.dest('app/js'));
});

/*
### JS Framework Folder Task ###
JS Framework dosyalarını buraya yükleyin.
js/vendor -> içeriğini app/js/vendor içine yazıyor.
*/
gulp.task('js-framework', () => {
  return gulp.src('js/vendor/**/*.*')
  .pipe(gulp.dest('app/js/vendor/'));
});

/*
### HTML Task ###
*/
gulp.task('html', () => {
  return gulp.src('*.html')
  .pipe(gulp.dest('app'));
});

/*
### Font Folder Task ###
*/
gulp.task('font', () => {
  return gulp.src('font/**/*.*')
  .pipe(gulp.dest('app/font'));
});

/*
### Image Task ###
*/
gulp.task('img', () => {
   return gulp.src('img/**/*')
  .pipe(gulp.dest('app/img'));
});

/*
### Watch Task ###
*/
gulp.task('watch', () => {
  gulp.watch("scss/style.scss", gulp.task('scss'));
  gulp.watch("css/vendor/**/*.*", gulp.task('css-framework'));
  gulp.watch("script/*.js", gulp.task('js'));
  gulp.watch("js/vendor/**/*.*", gulp.task('js-framework'));
  gulp.watch("*.html", gulp.task('html'));
  gulp.watch("font",gulp.task('font'));
  gulp.watch("img/**/*.*", gulp.task('img'));
 });
 
/*
### Default Task ###
*/

gulp.task('default', gulp.parallel('scss', 'css-framework', 'js', 'js-framework' ,'html', 'img', 'font', 'watch'));
