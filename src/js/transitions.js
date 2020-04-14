import {populateLinks} from './history'
export const pageTransitionAnimation = (targetUrl)=>{

	let pageContent = document.getElementsByClassName('page-wrapper')[0]
	pageContent.style.transition = "0.3s"
	pageContent.style.transform = "scale(0.8)"
	pageContent.style.transition = "0.5s"
	pageContent.style.opacity = "0"
	window.setTimeout(()=>{
		window.scrollTo(0,0)
		loadTemplate(pageContent,targetUrl)
		pageContent.style.opacity = "1"
		pageContent.style.transform =  "scale(1)"
		populateLinks()
	},500)
  	// bodt.innerHTML = ""
   //  fetch(targetUrl).then(res=>{
   //    res.arrayBuffer().then((ab)=>{
   //      // for(let i =0; i<ab.length; i++){

   //        let myString =  String.fromCharCode.apply(null, new Uint8Array(ab)).replace(/<div class="page-wrapper">/,"")  // }
   //        console.log( myString)
   //        //Eleminating all the scripts and useless data
   //        targetDiv.innerHTML += myString.match(/(content=\")([^]+)\"/)[0].replace(/(content=\")/,"").slice(0, -1)
   //      })
   //    })

}

//This function is used to load some HTML from targetUrl, 
// and replace the content of targetDiv with it.
const loadTemplate = (targetDiv, targetUrl,targetContent) => {
	
	targetDiv.innerHTML = ""
	  fetch(targetUrl).then(async res=>{
		const responseString =await  res.text()
			 //Parse the response to html
			const parser = new DOMParser()
			const newHTML = parser.parseFromString(responseString,'text/html')
			
			//Identify what we want the new body to be like and replace the existing one with it
			const newBody = newHTML.getElementsByClassName('page-wrapper')[0]
			populateLinks(newBody)
			targetDiv.innerHTML = newBody.innerHTML

		
			// We populate the existing link on the new page
			// Can maybe be optimzed by doing it one step before only on the new links
			// To do that pass a "target" by default it will be documetn
			
			populateLinks()
			// Make sure that google Analytics gets the message
			if ( typeof ga === "function" && newHTML.length !== 0 ) {
                ga('set', {
                    page: window.location.pathname,
                    title: history.state.title
                })
                ga('send', 'pageview')
        	}
		  })
		// })
	.catch(e=>{console.log("There was an error" + console.log(e))})
	// Maybe use blobs by creating a reader then read as texthttp://qnimate.com/an-introduction-to-javascript-blobs-and-file-interface/ but creating blob just uses up client memory
  
  }