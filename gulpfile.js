var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-ruby-sass'),
		ngannotate = require('gulp-ng-annotate'),
		htmlmin = require('gulp-minify-html'),
		plumber = require('gulp-plumber'),
		del = require('del');
		concat = require('gulp-concat');

// Scripts
gulp.task('scripts', function(){
	gulp.src('src/js/**/*.js')
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(concat('isInViewport.min.js'))
	.pipe(ngannotate())
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/js/'));
});

// Styles
gulp.task('styles',function(){
	sass('src/scss/main.scss', {style:"compressed"})
	.pipe(gulp.dest('dist/css'));
});

// Image minify
gulp.task('image',function(){
	gulp.src('src/img/**/*')
	.pipe(gulp.dest('dist/img/'));
});

// HTML minify
gulp.task('html', function(){
	gulp.src('src/**/*.html')
	.pipe(htmlmin({empty:true}))
	.pipe(gulp.dest('dist'));
});

// Clean primary folder
gulp.task('clean', function(){
	del('dist/*', function(){
		console.log('Dict Cleaned');
	});
});

// Watch Task
gulp.task('watch', function(){
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('src/scss/**/*.scss',['styles']);
	gulp.watch('src/img/**/*', ['image']);
	gulp.watch('src/**/*.html',['html']);
});

// Default
gulp.task('default',['clean','scripts','styles','image','html']);
