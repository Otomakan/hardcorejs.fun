var Transform = require('stream').Transform;

var through = require('through2');    // npm install --save through2
const loadBodyPrefixer = require('./scriptsToString.js').loadBody
const log  = require('fancy-log')
const faParse = require('./faParser')
const path = require('path')
const ampify = require('./ampify');
module.exports =  ()=> {
   return through.obj(async function(file, encoding, cb) {
    try{
		const fileContent = file.contents.toString('utf-8')
			const canonicalHref = '/' + path.relative(file.base, file.path).replace(/\\/g, '/')
			const amp = await ampify(fileContent, {
				cheerioOptions: {
				},
				cssPath : path.join(__dirname, '..', 'docs'),
				distRoot : path.join(__dirname, '..', 'docs'),
				analyticsCode: '',
				canonicalHref });
			file.contents = Buffer.from(amp,'utf-8')
      // console.log(file)
     cb(null,file)
    }
    catch(e){
		 log.error(file.path)
		 console.log('Error in file ', file.path)
     cb(e, null)
    }
	})
};

