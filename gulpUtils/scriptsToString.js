const fs = require('fs')
const {promisify} = require("util")
const readFile = promisify(fs.readFile)

// var babel = require("@babel/core");
const transform = require("@babel/core").transform;
const babel = require("@babel/core");
var minify = require('html-minifier').minify;

function loadBody (cb) {
	let content = ""
	//We use the load body script to append to all pages, 
	// in order to make them Ajax compliant and accessible directly
 	content = fs.readFileSync(__dirname + '/jsScripts/loadBody.js')
	//Let's babelify this girl
	// console.log(content) 
	content =  babel.transform(content.toString(),{
  		"presets": ["@babel/preset-env", ["minify",{
		  builtIns: false,
		  evaluate: false,
		  mangle: false,}]
	]
	})
	//Removing next line or white space
	 return  content.code.replace(/\"/g,"\'")
	}
	
module.exports = {
	loadBody: loadBody,

}