var Transform = require('stream').Transform;

var through = require('through2');    // npm install --save through2
const fs = require('fs')
const loadBodyPrefixer = require('./scriptsToString.js').loadBody
const sass = require('node-sass')
const htmlminify = require('html-minifier').minify;
const path = require('path')
// Thanks https://codereview.stackexchange.com/questions/179471/find-the-corresponding-closing-parenthesis

const populateHTMLPage = require('./populateHTMLPage')
// const 
module.exports =  ()=> {
   return through.obj(function(file, encoding, cb) {
    // let htmlContent = file.contents.toString('utf-8')
    // const head = headContent
    // const header = headerContent
    // const footer = footerContent
    
    // htmlContent = head + header + htmlContent.toString('utf-8') + footer

    // let regex = new RegExp("##"+key+"##",'g')
    // let keyContent = jsonData[key].replace( /\r|\n/g,'')
    
    // htmlContent = htmlContent.replace(regex,keyContent)
    // let mysass = fs.readFileSync(file.cwd+'/src/styles/main.scss')
    // mysass = mysass.toString('utf-8')
    
      file.contents = populateHTMLPage(path.resolve('', 'src/content/index.html'), {'metadescription':'You come to us with energy projects or ideas,and we will engineer it into a reality.'})
    

    // console.log(file)
    cb(null,file)
  });
};

