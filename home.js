docReady(()=> {
	const body = document.getElementsByTagName('body')[0]
	drawRectangles(body)
})
window.addEventListener('scroll',function(e){
	const body = document.getElementsByTagName('body')[0]
	const bottomScrollPos = window.pageYOffset + window.innerHeight
	// const scrollPos = body.scrollTop + window.innerHeight
	// console.log(scrollPos)

})
const drawRectangles = (div) => {
	// Number of squares per row minus one
	const sqNum = 5 + Math.floor(Math.random()*Math.floor(window.innerWidth/70))
	const squareSizes = window.innerWidth / sqNum
	const margin = window.innerWidth/sqNum/sqNum
	const rows = Math.round(getDocHeight()/squareSizes)

	console.log(rows)
	// Calculate columns
	for (let y = 0; y < rows - 1; y++) {
		// Generate rows
		for (let x = 0; x < sqNum - 1; x++) {
			const xPos = x*(squareSizes+margin)
			const yPos = y*(squareSizes+margin)

			const square = createSquare(margin + xPos,margin + yPos, squareSizes)
			div.appendChild(square)
			window.setTimeout(()=>{
			if (!isTouchScreen? Math.random()>0.9: Math.random()>0.05 ) {
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