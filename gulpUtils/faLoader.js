var Transform = require('stream').Transform;

var through = require('through2');    // npm install --save through2
const loadBodyPrefixer = require('./scriptsToString.js').loadBody
const log  = require('fancy-log')
const faParse = require('./faParser')
const path = require('path')
const findCSS = require('./findCSS')
const populateHTMLPage = require('./populateHTMLPage')

// const cheerio = require('cheerio')
// Thanks https://codereview.stackexchange.com/questions/179471/find-the-corresponding-closing-parenthesis
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
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
		let rawContent = jsonData.content
		 let parsedContent
		if(rawContent) {
		// 	let parsedContent = new JSDOM(rawContent)
		// 	let codes = parsedContent.window.document.getElementsByTagName('code')
		// 	// console.log(parsedContent.getElementsByTagName('head')[0])

		// 	for (let i = 0; i < codes.length; i++) {

		// 		const code  = codes[i]
		// 		console.log(code.outerHTML)
		// 		console.log(code.getElementsByTagName('head')[0])
		// 	// jsonData.content =  parsedContent.html()
	 
	
		// 	// console.log(parsedContent.html())
		// 	}
			jsonData.content = rawContent
			.replace(/<!DOCTYPE html>/g, '&lt;!DOCTYPE html&gt;')
			.replace(/<head>/g, '&lt;head&gt;').replace(/<\/head>/g, '&lt;/head&gt;')
		}
		//  replacing in code snippets all the < and > by lt and gt so the html doesn't get executed
		//  let parsedContent
		// if(rawContent) {
		// 	// rawContent.match(/<!DOCTYPE/g)
		// 	// rawContent = jsonData.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
		// 	let parsedContent = cheerio.load(rawContent)
		// 	let codes = parsedContent('code')
		// 	codes.each(function(index){
		// 		const code  = parsedContent(this)
		// 		const text  =code.text()
		// 		if(text) {
		// 			// console.log(text)
		// 			code.text(text.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
	
		// 			// console.log(text.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
		// 			// jsonData.content = text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
		// 		// codes.forEach(code=>{
		// 			console.log(code.get([0]).children[0].data)
		// 		// })
		// 		//  To embed examples we want don't want any nav bar or footer
		// 		// jsonD
		// 		}
		// 	})
			// jsonData.content =  parsedContent.html()
	 
	
			// console.log(parsedContent.html())
		// }

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
