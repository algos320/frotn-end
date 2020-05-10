var gulp = require('gulp'),
    jade = require('gulp-jade'),
	sourcemaps = require('gulp-sourcemaps');
	sass = require('gulp-sass');
	less = require('gulp-less');
	stylus = require('gulp-stylus');
	concat = require('gulp-concat');
	autoprefixer = require('gulp-autoprefixer');
	cleanCSS = require('gulp-clean-css');
	uglify = require('gulp-uglify');
	del = require('del');
	browserSync = require('browser-sync').create();
	
	const cssFiles = []//пути до файлов
 
gulp.task('jade', function() {
    return gulp.src('src/templates/*.jade')
        .pipe(jade()) 
        .pipe(gulp.dest('builds/development')); 
});

function styles() {
   return gulp.src(cssFiles)
   .pipe(sourcemaps.init())
   .pipe(sass())
   //.pipe(less())
   //.pipe(stylus())
   .pipe(concat('style.css'))
   .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
   }))
   .pipe(cleanCSS({
      level: 2
   }))
   .pipe(sourcemaps.write())//где будет появляться map file
   .pipe(gulp.dest(''))//выходной файл
   .pipe(browserSync.stream());
}

function watch() {
   browserSync.init({
      server: {
          baseDir: "./"
      }
  });
	//gulp.watch('./src/css/**/*.css', styles)
	//gulp.watch('./src/css/**/*.scss', styles)
	//gulp.watch('./src/css/**/*.sass', styles)
	//gulp.watch('./src/css/**/*.less', styles)
	//gulp.watch('./src/css/**/*.styl', styles)
	
}

gulp.task('styles', styles);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles)));
gulp.task('dev', gulp.series('build','watch'));