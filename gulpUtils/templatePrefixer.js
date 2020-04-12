var Transform = require('stream').Transform;

var through = require('through2');    // npm install --save through2

const loadBodyPrefixer = require('./scriptsToString.js').loadBody
module.exports =  ()=> {
   return through.obj(function(file, encoding, cb) {

     // const data = file.toString();
     // for (let key in file){
     //  console.log(key)
     //  console.log(file[key])
     // }     console.log('end')
     console.log(file.contents.length)
     //We check if the first seven characters are "headme"
     if(file.contents.slice(0,7).toString('utf8')=="#headme"){
      const pageContent = file.contents.slice(7,file.contents.length).toString('utf8').replace(/\s+/g, '').replace(/\"/g,"\'")
      const script = loadBodyPrefixer().replace(/\s+/g, '')
      const fetchPolyfill = "@if (Request.Browser.Browser=='IE' || Request.Browser.Browser=='InternetExplorer'){<script src='https://cdn.polyfill.io/v2/polyfill.min.js'></script> <script src='https://npmcdn.com/es6-promise@3.2.1'></script>}"
      const header = fetchPolyfill+"<script>var content=\""+ pageContent+ "\";"+  script+"</script>"      
      header = header.replace(/\s+/g, '')
      // file.contents = Buffer.concat([Buffer.from(header,'utf8'), pageContent]);
      file.contents = Buffer.from(header,'utf8')
      // console.log(loadBodyPrefixer().replace(/\'/g,"\""))

     }
     // console.log(file.contents.toString())
    // console.log( util.inspect(file))
  // console.log(data)
  // console.log(util.inspect(data,false, null, true /* enable colors */))
    cb(null,file)
  });
};