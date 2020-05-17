const gulp = require('gulp')
const { series,parallel } = require('gulp')
// const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')
// const browserify = require('browserify')
const imagemin = require('gulp-imagemin')
const rename = require('gulp-rename')
const htmlmin = require('gulp-htmlmin')
const indexIsSoSpecial = require('./gulpUtils/indexIsSoSpecial')
const webpack = require('webpack-stream')
const faLoader  = require('./gulpUtils/faLoader')
var gulpsitemap = require('gulp-sitemap')
const named = require('vinyl-named')

const webpackOptions = {
	output : {
		filename : '[name].js'    
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					"plugins": [
						"@babel/plugin-transform-modules-commonjs", 
						"@babel/plugin-transform-regenerator",
						'@babel/plugin-transform-runtime',
						"@babel/plugin-proposal-export-default-from"]

					}
				}
			}
		]
	}
}


// const AUTOPREFIXER_BROWSERS = [
//   'ie >= 10',
//   'ie_mob >= 10',
//   'ff >= 10',
//   'chrome >= 34',
//   'safari >= 7',
// 'opera >= 23',
//   'ios >= 7',
//   'android >= 4.4',
//   'bb >= 10'
// ]

const babelSettings = {
	presets: ["@babel/preset-env"],
	plugins: ['@babel/plugin-transform-modules-commonjs', '@babel/plugin-proposal-export-default-from']
}

const serve =  ()=> {
    browserSync.init({
        server: "./docs/"
    })
    gulp.watch(['src/js/*.js', 'src/js/**/*.js'], series(webpackify,sw)).on('change',browserSync.reload)
    gulp.watch('src/styles/**/**/*.scss', cleanCSS).on('change',browserSync.reload)
    gulp.watch(['src/content/templates/*.html', 'src/utils/*.html','src/content/contentFA/*.fa','src/content/contentFA/**/**/*.fa','src/content/contentFA/**/**/**/*.fa'], fa2html).on('change',browserSync.reload)
    gulp.watch('src/content.html', indexhtml).on('change',browserSync.reload)
		gulp.watch('src/content/utils/*.html', series(webpackify,sw, htmlutils, fa2html,indexhtml) ).on('change',browserSync.reload),
		gulp.watch('src/assets/data/**/*', data).on('change',browserSync.reload),
		gulp.watch('src/assets/images/**/*', imageMin).on('change',browserSync.reload)
	
	}

const sitemap =  () =>	gulp.src(['dist/**/**/**/**/*.html', '!dist/utils/*', '!dist/content/*', '!dist/content/**/*', '!dist/content/**/**/*'], {
					read: false
			})
			.pipe(gulpsitemap({
					siteUrl: 'http://hardcorejs.fun'
			}))
			.pipe(gulp.dest('dist/'))


// const compress =  ()=> 
//         gulp.src('src/js/*.js', 'src/js/**/*.js')
//         // .pipe(concat('bundle.js'))
//         .pipe(babel(babelSettings)).on('error', function(e){
//             console.log(e)})
//          // .pipe(uglify().on('error', function(e){
//             // console.log(e)}))
//         .pipe(gulp.dest('./docs/js'))

// const mainBundle =  ()=>
// 		gulp.src(['src/js/main.js','src/js/history.js','src/js/serviceWorkers.js'])
// 				.pipe(concat('bundle.js'))
// 				.pipe(named())
//         .pipe(webpack())
// 				.pipe(gulp.dest('./docs/js'))

const webpackify = () =>  {
	const tmp = {}
	return	gulp.src(['src/js/*.js', 'src/js/**/*.js'])		
		.pipe(named())
		.pipe(named())
		.pipe(rename((path) => {
			tmp[path.basename] = path
		}))    
		.pipe(webpack(webpackOptions))
		.pipe(rename((path) => {
			path.dirname = tmp[path.basename].dirname
		}))    
		.pipe(gulp.dest('./docs/js/'))
}

const registerJS = ()=>{
	return gulp.src('src/js/sw.js')	
.pipe(named())
.pipe(webpack(webpackOptions))
.pipe(gulp.dest('./docs/'))
}
const registerManifest = ()=> {
	return gulp.src('src/manifest.json')	
	.pipe(gulp.dest('./docs/'))
}
const sw = series(registerJS, registerManifest)

const fa2html =  ()=>
gulp.src(
	['src/content/contentFA/*.fa','src/content/contentFA/**.fa','src/content/contentFA/***/*.fa','src/content/contentFA/**/**/**/*.fa'],
	// 'src/content/contentFa/node/**/*.fa',
{base: './src/content/contentFA/'}) 
.pipe(faLoader()).on('error', (e)=>{
	console.error(e)
	throw e
})
.pipe(rename({extname:'.html'}))
.pipe(gulp.dest('./docs'))


gulp.task('pwa', ()=>
  gulp.src(['src/pwa/manifest.json','src/js/sw.js'])
  .pipe(gulp.dest('./docs')
  )
 
)
// DONT MIND THIS FOR NOW, MIGHT USE FOR BROWSERIFY LATER
// const browserify =  function () {
//   // return browserify({entries: './src/js/main1.js', debug: true})
//   //       .transform("babelify", {presets: ["@babel/preset-env"]})
//   //       .bundle()
//   //       .pipe(source('main1.js'))
//   //       .pipe(buffer())
//   //       // .pipe(uglify())
//   //       .pipe(gulp.dest('./docs/'))
//    gulp.src('src/js/*.js')
//          .pipe(babel({
//             presets: ['@babel/env']
//         }))
//          .pipe(uglify().on('error', function(e){
//             console.log(e)}))
//         .pipe(gulp.dest('./docs/'))
// })

// const browserifyJS  = () => {
//   // var b = browserify({
//   //   entries: './entry.js',
//   //   debug: true,
//   //   // defining transforms here will avoid crashing your stream
//   //   transform: [reactify]
//   // })

//   return browserify.bundle()
//     .pipe(source('app.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({loadMaps: true}))
//         // Add transformation tasks to the pipeline here.
//         .pipe(uglify())
//         .on('error', console.log('error'))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./docs/js/'))
// }


const cleanCSS = ()=>
  gulp.src('src/styles/**/*.scss')
	// .pipe(concat('bundle.css'))
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer())
  // .pipe(gulpCleanCSS())
  .pipe(gulp.dest('./docs/'))


const imageMin =  () =>
    gulp.src('src/assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('docs/assets/images/'))



const fonts =  () =>
    gulp.src('src/assets/fonts/**/*')
        // .pipe(imagemin())
				.pipe(gulp.dest('docs/assets/fonts/'))
const data =  () =>
				gulp.src('src/assets/data/**/*')
						// .pipe(imagemin())
						.pipe(gulp.dest('docs/assets/data/'))

const CNAME = () => 
	gulp.src('CNAME')
	.pipe(gulp.dest('docs/'))


const html = ()=>
  gulp.src('src/*.html')
  .pipe(gulp.dest('docs'))
  

const jsonhtml = ()=>
  gulp.src(['src/content/contentJson/*.json','src/content/contentJson/**.json','src/content/contentJson/***/*.json','src/content/contentJson/**/**/**/*.json'],
    {base: './src/content/contentJson/'}) 
  .pipe(jsonLoader())
  .pipe(rename({extname:'.html'}))
  .pipe(gulp.dest('docs/content'))
  
const htmlutils = ()=>
  gulp.src('src/content/utils/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('docs/utils'))
  
const indexhtml = ()=>
  gulp.src('src/content/*.html')
  .pipe(indexIsSoSpecial())
  .pipe(gulp.dest('docs/'))
  
// Remember to put imagemin later on in
exports.default= series(parallel(series(webpackify,sw), fonts,data, imageMin, fa2html,indexhtml,htmlutils,cleanCSS,sitemap) ,serve)


