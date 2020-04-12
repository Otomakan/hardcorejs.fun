const gulp = require('gulp')
const { series,parallel } = require('gulp')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const gulpCleanCSS= require('gulp-clean-css')
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
// const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const transform = require('vinyl-transform')
const concat = require('gulp-concat');
const source = require('vinyl-source-stream');
const imagemin = require('gulp-imagemin');
const util = require('util')
const templatePrefixer = require('./gulpUtils/templatePrefixer.js')
const jsonLoader =  require('./gulpUtils/jsonLoader.js')
const rename = require('gulp-rename')
const htmlmin = require('gulp-htmlmin');
const indexIsSoSpecial = require('./gulpUtils/indexIsSoSpecial')
const webpack = require('webpack-stream')

const named = require('vinyl-named')

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
]

const babelSettings = {
	presets: ["@babel/preset-env"],
	plugins: ['@babel/plugin-transform-modules-commonjs', '@babel/plugin-proposal-export-default-from']
}

const serve =  ()=> {
    browserSync.init({
        server: "./dist/"
    })
    gulp.watch('src/js/*.js', series(webpackify)).on('change',browserSync.reload)
    gulp.watch('src/styles/*.scss', cleanCSS).on('change',browserSync.reload)
    // gulp.watch('src/js/*.js',['browserify']).on('change',browserSync.reload)
    // gulp.watch('*').on('change',browserSync.reload)
    // gulp.watch(['src/js/main.js','src/js/transitions.js','src/js/history.js','src/js/serviceWorkers.js'],series( , webpackify)).on('change',browserSync.reload)
    gulp.watch(['src/content/templates/*.html','src/content/contentJson/*.json','src/content/contentJson/**/*.json','src/content/contentJson/**/**.json'], jsonhtml).on('change',browserSync.reload)
    gulp.watch('src/content.html', indexhtml).on('change',browserSync.reload)
}


const compress =  ()=> 
        gulp.src('src/js/*.js')
        // .pipe(concat('bundle.js'))
        .pipe(babel(babelSettings)).on('error', function(e){
            console.log(e);})
         // .pipe(uglify().on('error', function(e){
            // console.log(e);}))
        .pipe(gulp.dest('./dist/js'))

// const mainBundle =  ()=>
// 		gulp.src(['src/js/main.js','src/js/history.js','src/js/serviceWorkers.js'])
// 				.pipe(concat('bundle.js'))
// 				.pipe(named())
//         .pipe(webpack())
// 				.pipe(gulp.dest('./dist/js'))

const webpackify = () =>  {
		console.log('webpackifying')
		return	gulp.src('src/js/*.js')			
			.pipe(named())
			.pipe(webpack())
		

			.pipe(gulp.dest('./dist/js'));

}
// DONT MIND THIS FOR NOW, MIGHT USE FOR BROWSERIFY LATER
// const browserify =  function () {
//   // return browserify({entries: './src/js/main1.js', debug: true})
//   //       .transform("babelify", {presets: ["@babel/preset-env"]})
//   //       .bundle()
//   //       .pipe(source('main1.js'))
//   //       .pipe(buffer())
//   //       // .pipe(uglify())
//   //       .pipe(gulp.dest('./dist/'));;
//    gulp.src('src/js/*.js')
//          .pipe(babel({
//             presets: ['@babel/env']
//         }))
//          .pipe(uglify().on('error', function(e){
//             console.log(e);}))
//         .pipe(gulp.dest('./dist/'))
// });

// const browserifyJS  = () => {
//   // var b = browserify({
//   //   entries: './entry.js',
//   //   debug: true,
//   //   // defining transforms here will avoid crashing your stream
//   //   transform: [reactify]
//   // });

//   return browserify.bundle()
//     .pipe(source('app.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({loadMaps: true}))
//         // Add transformation tasks to the pipeline here.
//         .pipe(uglify())
//         .on('error', console.log('error'))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./dist/js/'));
// }


const cleanCSS = ()=>
  gulp.src('src/styles/*.scss')
  // .pipe(concat('bundle.css'))
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
  // .pipe(gulpCleanCSS())
  .pipe(gulp.dest('./dist/'))


const imageMin =  () =>
    gulp.src('src/assets/images/*')
        // .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images/'))



const fonts =  () =>
    gulp.src('src/assets/fonts/*')
        // .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/fonts/'))




const html = ()=>
  gulp.src('src/*.html')
  .pipe(gulp.dest('dist'))
  

const jsonhtml = ()=>
  gulp.src(['src/content/contentJson/*.json','src/content/contentJson/**.json','src/content/contentJson/***/*.json','src/content/contentJson/**/**/**/*.json'],
    {base: './src/content/contentJson/'}) 
  .pipe(jsonLoader())
  .pipe(rename({extname:'.html'}))
  .pipe(gulp.dest('dist/content'))
  
const htmlutils = ()=>
  gulp.src('src/content/utils/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('dist/utils'))
  
const indexhtml = ()=>
  gulp.src('src/content/*.html')
  .pipe(indexIsSoSpecial())
  .pipe(gulp.dest('dist/'))
  
// Remember to put imagemin later on in
exports.default= series(parallel(series(webpackify), fonts, html,indexhtml,htmlutils,jsonhtml,cleanCSS) ,serve)


