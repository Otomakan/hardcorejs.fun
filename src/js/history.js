import {ready} from './helpers'
let customHistoryFIFO = [window.location.href]

var listener = function listener(e) {
  // console.log(e);
  console.log('poping state')

  var newLocation = window.location;
  console.log(window.location);
  customHistoryFIFO.push(window.location.href)
   // loadTemplate(document.body,window.location.href)
    
  console.log(customHistoryFIFO)
};
ready(()=>{
	let links = document.getElementsByTagName('a')
	
	for(let i=0;i< links.length;i++){
		let link = links[i]
		let nextPage
		if(link.attributes.href)
			nextPage  = link.attributes.href.value
		else
			continue
		console.log(nextPage)
		link.onclick = (e)=>{
			e.preventDefault()

			//Visual component, make sure to close the navigation menu if any link is clicked
			// let contentNav = document.getElementById('navbarNavAltMarkup')
		    let navBarNav = document.getElementById('navbar-nav')
   
			// contentNav.classList.remove('show')
        	navBarNav.classList.toggle('visible')
        	// navBarShow = false
			
			//Push the new state and call the appropriate function
			history.pushState({page: nextPage}, null, nextPage);
			changePageAClick(nextPage)
		}
	}
})

// var pushUrl = function pushUrl(href) {// history.pushState({}, '', href);
//   // window.dispatchEvent(new Event('popstate'));
// };
history.pushState(null, null, location.href);
// Th onpopstate event is used to detect the back and forward button events
window.onpopstate = ()=>{
	changePageAClick(location.href)
}
// For some hash naviagation detection
// window.onhashchange  = ()=>{
// 	changePageAClick(location.href)
// }



// window.addEventListener('popstate', listener);