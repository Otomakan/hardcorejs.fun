var Transform = require('stream').Transform;

var through = require('through2');    // npm install --save through2
const loadBodyPrefixer = require('./scriptsToString.js').loadBody
const log  = require('fancy-log')
const faParse = require('./faParser')
const path = require('path')
const findCSS = require('./findCSS')
const populateHTMLPage = require('./populateHTMLPage')
const marked = require('marked')
const frontMatter = require('front-matter')
// const cheerio = require('cheerio')
// Thanks https://codereview.stackexchange.com/questions/179471/find-the-corresponding-closing-parenthesis
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
module.exports =  ()=> {
	let allPosts = {}
	const allPostTitles = []
   return through.obj(function(file, encoding, cb) {
    try{
		const fileContent = file.contents.toString('utf-8')
		const category = path.relative(file.base, file.path).split(path.sep)[0]
		const fm = frontMatter(fileContent)
		const attributes = fm.attributes
		const mdBody = fm.body
		if(attributes.template == 'blog-page'){
			if(!allPosts[category])
				allPosts[category] = []
			allPosts[category].push(attributes)
		}
		 const html = marked(mdBody)
		 let targetHTMLFile = ''
		 if (attributes.template)
		 	targetHTMLFile =  file.cwd+'/src/content/templates/'+attributes.template+'.html'
				

			const jsonData = {...attributes, content: mdBody}
		 if (jsonData.template === 'example') { 
			file.contents = Buffer.from(jsonData.content,'utf-8')
		 } else {
    	file.contents = populateHTMLPage(targetHTMLFile, jsonData)
		 }
      // console.log(file)
     cb(null,file)
    }
    catch(e){
		 log.error(file.path)
		 console.log('Error in file ', file.path)
     cb(e, null)
    }
	},
	function (callback) {
		this.allPosts = allPosts
		callback();	
	})
};



// return through.obj((file, encoding, callback) => {
// 	if (file.isNull()) {
// 		callback(null, file);
// 		return;
// 	}

// 	const finish = (error, size) => {
// 		if (error) {
// 			callback(new PluginError('gulp-size', error));
// 			return;
// 		}

// 		totalSize += size;

// 		if (options.showFiles === true && size > 0) {
// 			log(chalk.blue(file.relative), size);
// 		}

// 		fileCount++;
// 		callback(null, file);
// 	};

// 	if (file.isStream()) {
// 		if (options.gzip) {
// 			file.contents.pipe(gzipSize.stream())
// 				.on('error', finish)
// 				.on('end', function () {
// 					finish(null, this.gzipSize);
// 				});
// 		} else {
// 			file.contents.pipe(new StreamCounter())
// 				.on('error', finish)
// 				.on('finish', function () {
// 					finish(null, this.bytes);
// 				});
// 		}

// 		return;
// 	}

// 	if (options.gzip) {
// 		(async () => {
// 			try {
// 				finish(null, await gzipSize(file.contents));
// 			} catch (error) {
// 				finish(error);
// 			}
// 		})();
// 	} else {
// 		finish(null, file.contents.length);
// 	}
// }, function (callback) {
// 	this.size = totalSize;
// 	this.prettySize = prettyBytes(totalSize);

// 	if (!(fileCount === 1 && options.showFiles) && totalSize > 0 && fileCount > 0 && options.showTotal) {
// 		log(chalk.green('all files'), totalSize);
// 	}

// 	callback();
// });