const gulp = require('gulp')
const { parallel } = require('gulp')

const gulpBabel = require('gulp-babel')
const gulpSass = require('gulp-sass')
const gulpImagemin = require('gulp-imagemin')

const babelifyJavascript = () =>
// In src (source) we enter the name of the file we want to transform
	gulp.src('src/main.js')
	// we 'pipe' the content of 'src' and apply the function 'gulpBabel'
		.pipe(gulpBabel({
				presets: ['@babel/env']
		}))
	// we use dest to define the destination folder of the transformed content
		.pipe(gulp.dest('dist'))

const minifyImages = () =>     
// The little stars means 'all files'
	gulp.src('src/images/*')
		.pipe(gulpImagemin())
		// We define anew
		.pipe(gulp.dest('dist/images'))

const createCSSFromSCSS = () => 
gulp.src('src/styles/*.scss')
.pipe(gulpSass({outputStyle: 'compressed'})
// .on is a special event listener, here for errors
.on('error', gulpSass.logError))
.pipe(gulp.dest('./dist/'))

const copyHTML = () => 
// the double star means 'all folders' and the *.html means 'all files that end with '.html''
		gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'))

exports.default= parallel(minifyImages, babelifyJavascript, createCSSFromSCSS, copyHTML)