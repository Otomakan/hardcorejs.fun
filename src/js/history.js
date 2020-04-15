
let customHistoryFIFO = [window.location.href]
import {ready} from './helpers'
import {pageTransitionAnimation} from './transitions'
ready(()=>{
	populateLinks()
})

export function populateLinks (target)  {
	target = target || document
	let links = target.getElementsByTagName('a')
	for(let i=0;i< links.length;i++){
		let link = links[i]
		let nextPage
		const attributes = link.attributes
		if(attributes.href){
			let target = link.getAttribute('target')
			if(target != "_blank"){
				const href = attributes.href.value
				if(attributes.href.nodeValue == "#"){
					link.onclick = (e) =>{
						e.preventDefault()
						const targetY = document.getElementById(target).getBoundingClientRect().y
						let additionalOffset
						if(window.innerWidth < 750)
							additionalOffset = 90
						else
							additionalOffset = 150
						window.scrollBy(0, targetY -additionalOffset)
					}
					continue
				}
				else if(attributes.href.nodeValue.includes("#")){
					// this is for same page anchor tags
					continue
				}
				else{
					nextPage  = href
				}
			}else 
				continue
		}
		
		link.onclick = (e)=>{
			e.preventDefault()
			e.stopImmediatePropagation()
			const t = e.target

			// Infering the next page titl from its url
			nextPageTitle
			let nextPageTitle  = nextPage.split('/')

			nextPageTitle = nextPageTitle[nextPageTitle.length-1].split('-')
			nextPageTitle = nextPageTitle.map((word)=>word.charAt(0).toUpperCase()+word.slice(1))
			nextPageTitle = nextPageTitle.join(' ')
			nextPageTitle = nextPageTitle.substr(0, nextPageTitle.length-5)
			//Visual component, make sure to close the navigation menu if any link is clicked
			// closeNavBar()
			//Push the new state and call the appropriate function
			history.pushState({title: nextPageTitle}, nextPageTitle, nextPage)
			if(nextPage != '/')
				document.title = nextPageTitle + " - Hardcore JS"
			pageTransitionAnimation(nextPage)
		}
	}
}


// var pushUrl = function pushUrl(href) {// history.pushState({}, '', href);
//   // window.dispatchEvent(new Event('popstate'));
// };
// history.pushState(null, null, location.href)
// Th onpopstate event is used to detect the back and forward button events
window.onpopstate = ()=>{
	// this allows to use the backbutton
	pageTransitionAnimation(location.href)
	populateLinks()

}
// For some hash naviagation detection
// window.onhashchange  = ()=>{
// 	pageTransitionAnimation(location.href)
// }

