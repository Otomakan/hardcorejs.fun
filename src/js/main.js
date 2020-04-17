// const {ready, } = require('./helpers')
import {ready, getDocHeight, isTouchScreen} from './helpers'
import colors from './colors'
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';

function highlight_code()
{
		if (typeof (Worker) === undefined)
				return false

		// var workerFunction = new Blob(['(' + highlight_worker_function.toString() + ')()'], {type: "text/javascript"});

		const codes = document.querySelectorAll('code')
		for (let i= 0; i < codes.length; i++) {
			const code = codes[i]
			var worker = new Worker('/js/worker.js');
				worker.onmessage = function () {
						code.innerHTML = (event.data)
						code.classList.add('hljs')
				}
				worker.postMessage(code.innerHTML); // start worker
		}
}
self.addEventListener('load', () => {
	highlight_code()
	document.querySelectorAll("code").forEach(function(element) {
    element.innerHTML = element.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
})
})
ready(()=> {
	const body = document.getElementsByTagName('body')[0]
	drawRectangles(body)
	// Registering our Service worker
	// console.log(process.env)
	// if(process.env==='production'){
	// if('serviceWorker' in navigator) {
	// 	navigator.serviceWorker.register('/sw.js', { scope: '/' })

	// }
// }


	const localStorage = window.localStorage
	const visited = localStorage.setItem('visited', 'y')
})
window.addEventListener('scroll',function(e){
	const body = document.getElementsByTagName('body')[0]
	const bottomScrollPos = window.pageYOffset + window.innerHeight
	// const scrollPos = body.scrollTop + window.innerHeight
	// console.log(scrollPos)

})
const drawRectangles = (div) => {
	// Number of squares per row minus one
	const sqNum = 4 + Math.floor(Math.random()*Math.floor(window.innerWidth/70))
	const squareSizes = window.innerWidth / sqNum
	const margin = window.innerWidth/sqNum/sqNum
	const rows = Math.round(getDocHeight()/squareSizes)

	
	// Calculate columns
	for (var y = 0; y < rows - 1; y++) {
		// Generate rows
		for (var x = 0; x < sqNum - 1; x++) {
			const xPos = x*(squareSizes+margin)
			const yPos = y*(squareSizes+margin)

			const square = createSquare(margin + xPos,margin + yPos, squareSizes)
			div.appendChild(square)
			const localStorage = window.localStorage
			const visited = localStorage.getItem('visited')
			window.setTimeout(()=>{
			if ((visited || isTouchScreen() || window.innerWidth <= 780) ? Math.random()>0.25: Math.random()>0.9 ) {
				changeSquareColor(square)
			}
			square.style.transform = '';

			},10*((y+1)*(x+1)))
		}
	}
}

const createSquare = (x, y, height) => {
	const square = document.createElement('div');
	square.style.position = 'absolute'
	square.style.width = height + 'px'

	square.style.height = height + 'px'
	square.style.left = x + 'px'
	square.style.top = y + 'px'
	square.className = 'pretty-square'
	square.style.transform = 'scale(0)';
	square.addEventListener('mouseenter', ()=>{
		changeSquareColor(square)

		
	})
	return square
}


const changeSquareColor = (square) => {
	square.style.background = colors[Math.floor(Math.random()*colors.length)]
	square.style.borderWidth = '0px'
	square.style.transform = 'scale(0.98)'
}