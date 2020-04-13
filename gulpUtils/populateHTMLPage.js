

const htmlminify = require('html-minifier').minify;
const fs = require('fs')
const path = require('path')
const headContent = fs.readFileSync( path.join(__dirname, '..','src/content/utils/head.html'))
const headerContent = fs.readFileSync( path.join(__dirname, '..','src/content/utils/nav.html'))
const footerContent = fs.readFileSync( path.join(__dirname, '..', 'src/content/utils/footer.html'))
const findCSS = require('./findCSS')
module.exports  = (targetHTMLFile, data) => {
    let head = headContent
    let header = headerContent
    let footer = footerContent
    
     let body = fs.readFileSync(targetHTMLFile).toString('ascii')

    //  htmlContent = htmlminify(htmlContent)
      // Implement page per page sass
    // let mysass = fs.readFileSync(path.resolve('','src/styles/main.scss')).toString('ascii')
    // let relevantCSS = findCSS(header+body+footer, mysass )
    // head += relevantCSS + '</head>'


    // Join all html before populating 
    let htmlContent = head + header + body + footer

      for(let key in data){
        if(key==='template')
          continue
        else{
          let regex = new RegExp("##"+key+"##",'g')
          htmlContent = htmlContent.replace(regex,data[key])
        }
        }

        // Check for head tags accross the site which we can easily replace
        if (!data.extraHeadTags) {
            htmlContent = htmlContent.replace(/##extraHeadTags##/,"\n")
        }
        if(!data.pageTitle){
            let regex = new RegExp("##pageTitle##",'g')

            if(data.title)
                htmlContent = htmlContent.replace(regex,data.title +" - Autonomy Power")
            else
                htmlContent = htmlContent.replace(regex,"Autonomy Power")
        }

        if(!data.metadescription){
            let regex = new RegExp("##metadescription##",'g')

            if(data.title)
                htmlContent = htmlContent.replace(regex, `A page about ${data.title} by Autonomy Power`)
            else
                htmlContent = htmlContent.replace(regex,"Autonomy Power")
        }

        
        // const pageBody = htmlContent
        // const head = headContent
        // const header = headerContent
        // const footer = footerContent
        return Buffer.from(htmlContent,'utf8')
}