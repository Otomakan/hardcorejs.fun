const changePageAClick = (targetUrl)=>{

	let body = document.getElementsByClassName('body-wrapper')[0]
	body.style.transition = "0.3s"
	body.style.transform = "scale(0.8)"
	body.style.transition = "0.5s"
	body.style.opacity = "0"
	window.setTimeout(()=>{

		loadTemplate(body,targetUrl)
		body.style.opacity = "1"
		body.style.transform =  "scale(1)"
	},800)
  	// bodt.innerHTML = ""
   //  fetch(targetUrl).then(res=>{
   //    res.arrayBuffer().then((ab)=>{
   //      // for(let i =0; i<ab.length; i++){

   //        let myString =  String.fromCharCode.apply(null, new Uint8Array(ab)).replace(/<div class="body-wrapper">/,"")  // }
   //        console.log( myString)
   //        //Eleminating all the scripts and useless data
   //        targetDiv.innerHTML += myString.match(/(content=\")([^]+)\"/)[0].replace(/(content=\")/,"").slice(0, -1)
   //      })
   //    })

}