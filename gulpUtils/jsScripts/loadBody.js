if(!document.body){
	document.open();
	document.body = document.createElement("body");
	function loadBody(){
		 fetch('/utils/headernav.html').then(resHead=>{
		 	fetch('/utils/footer.html').then(footHead=>{
		 		resHead.arrayBuffer().then((abHead)=>{
		 			footHead.arrayBuffer().then((abFoot)=>{
			 			let headString =  String.fromCharCode.apply(null, new Uint8Array(abHead))
			 			let footString = String.fromCharCode.apply(null, new Uint8Array(abFoot))  
						document.write(headString + content + footString)
						document.close();
		 			})
        		})
		 	})
		
		}).catch(e=>{
			console.log(e);
		})
	}
	loadBody()
}
else{
	let scriptTag = document.getElementsByTagName('script');
	scriptTag = scriptTag[scriptTag.length - 1];
	const parentTag = scriptTag.parentNode
	console.log(parentTag)
	const childEl = document.create('div')
	childEl.innerHTML = content
	parentTag.appendChild(childEl)
}