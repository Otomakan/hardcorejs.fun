const sass = require('node-sass')
const path = require('path')
const fs = require('fs')
//Finds the relevant css for every web page

const mycss = sass.renderSync({
  file:  path.join(__dirname,'..' ,'src/styles/index.scss')
}).css.toString('utf-8')
// .toString('utf-8')
module.exports =  (htmlFile, sassFile) => {
  
    // console.log(mycss)
  
    
    let classes = htmlFile.match(/class=(\'|\")(.*?)(\'|\")/g)
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
     let ids = htmlFile.match(/id=(\'|\")(.*?)(\'|\")/g)
     if(ids)
       ids = ids.map((tag)=> tag.substring(4,tag.length-1))

     var dummyarray;
    //  mycss = mycss.css.toString('utf-8')
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
    //  console.log(finalCSS)
    // console.log(mycss)
     return finalCSS+"</style>"

}