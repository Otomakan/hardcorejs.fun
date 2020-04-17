var Transform = require('stream').Transform;

var through = require('through2');    // npm install --save through2
const loadBodyPrefixer = require('./scriptsToString.js').loadBody
const log  = require('fancy-log')
const faParse = require('./faParser')
const path = require('path')
const findCSS = require('./findCSS')
const populateHTMLPage = require('./populateHTMLPage')
// Thanks https://codereview.stackexchange.com/questions/179471/find-the-corresponding-closing-parenthesis

module.exports =  ()=> {
   return through.obj(function(file, encoding, cb) {
    try{
			
		 const jsonData = faParse(file.contents.toString('utf-8'))
     //We get the location of the file from there we access the templates
     let targetHTMLFile=''
     if(jsonData.template)
        targetHTMLFile = file.cwd+'/src/content/templates/'+jsonData.template+'.html'
     else {
			 console.log(file)
      throw "We need a template target"
		 }
		
		//  To embed examples we want don't want any nav bar or footer
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
  });
};
