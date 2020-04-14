var Transform = require('stream').Transform;

var through = require('through2');    // npm install --save through2
const fs = require('fs')
const loadBodyPrefixer = require('./scriptsToString.js').loadBody
const sass = require('node-sass')
const htmlminify = require('html-minifier').minify;

// Thanks https://codereview.stackexchange.com/questions/179471/find-the-corresponding-closing-parenthesis

module.exports =  ()=> {
   return through.obj(function(file, encoding, cb) {
    console.log(file)
     const jsonData = JSON.parse(file.contents.toString('utf-8'))
     //We get the location of the file from there we access the templates
     
     let targetHTMLFile=''
     if(jsonData.template)
        targetHTMLFile = file.cwd+'/src/content/templates/'+jsonData.template+'.html'
     else 
      throw "We need a template target"
    
    
     let htmlContent = fs.readFileSync(targetHTMLFile)

     htmlContent = htmlContent.toString('utf-8')
     htmlContent = htmlminify(htmlContent).replace(/\"/g,"\'").replace(/\r?\n|\r/g,"")
     // console.log(htmlContent)
     let mysass = fs.readFileSync(file.cwd+'/src/styles/index.scss')
      mysass = mysass.toString('utf-8')
     let relevantCSS = findCSS(htmlContent, mysass )

      for(let key in jsonData){
        if(key==='template')
          continue
        else{
          // console.log(key + ":" + jsonData[key])
          let regex = new RegExp("##"+key+"##",'g')
          htmlContent = htmlContent.replace(regex,jsonData[key])
        }
     }
     // console.log(typeof htmlContent)
     // if(htmlContent)
     //    htmlContent = Buffer.from(htmlContent,'utf8')
     //We check if the first seven characters are "headme"
    //Maybe to this check in a header Loader function and depending on the head, change the header to load
    //Eg if you need custom scripts, maybe have in the template.html the name of the header to load
    // Actaully maybe not useful having those scripts because we have the custom scripts parsed with our js attacher
     if(htmlContent.slice(0,7).toString('utf-8')=="#headme"){
        const pageContent = htmlContent.slice(7,htmlContent.length)
        const script = loadBodyPrefixer()
        // .replace(/\s+/g, '')
        //  add this to get the css before
        const header = "<script>var content=\"" + relevantCSS.replace(/\""/g,"\'").replace(/\r?\n|\r/g,"") + pageContent.toString().replace(/\"/g,"\'")+ "\";"+  script+ "</script>"  
        
        file.contents = Buffer.from(header,'utf8')
      }

      // console.log(file)
     cb(null,file)
  });
};

//Finds the relevant css for every web page
function findCSS(htmlFile, sassFile){
   
    var mycss = sass.renderSync({
      data: sassFile
    })
    
    let classes = htmlFile.match(/class=\'(.*?)\'/g)
     if(classes)
      classes = classes.map((tag)=> {
      let result  =   tag.substring(7,tag.length-1).split(" ").map((sub)=>
            "."+sub
          )
        if(tag.split(" ").length===1){
          return result
        }
        else{
           result.push(result.reduce((tot,val)=>tot+val))
           return result
        }
        
      });
     let ids = htmlFile.match(/id=\'(.*?)\'/g)
     if(ids)
       ids = ids.map((tag)=> tag.substring(4,tag.length-1))

     var dummyarray;
     mycss = mycss.css.toString('utf-8')
     // console.log(mycss)
    //  while ((dummyarray = re.exec(mycss)) !== null) {
    //    console.log(`Found ${dummyarray[0]}. Next starts at ${re.lastIndex}.`);
    //   // expected output: "Found foo. Next starts at 9."
    //   // expected output: "Found foo. Next starts at 19."
    // }
     let finalCSS = "<style>"
     let recontainer = ""
     if(classes)
      classes.forEach(group=> {
        group.forEach( cssClass=> {
            let re = new RegExp(cssClass+" {(\n|.)*?}",'g')
            let matches= mycss.match(re)
            if(matches)
              matches.forEach((matchedCSS) =>{
                finalCSS += matchedCSS
            });
         });
     });
     // console.log(classes)
     // console.log(ids)
     // console.log(finalCSS)
     return finalCSS+"</style>"

}