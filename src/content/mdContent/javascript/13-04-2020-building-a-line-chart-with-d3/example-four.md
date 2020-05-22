---
	template: example
	title: undefined
	meta_description: undefined
	author: undefined
	subtitle: undefined
	categories:
---

<style>
.svg-container {
	width: 100vw;
	height: 100vh;
}
.line {
    stroke-width: 3px;
    fill: none;
}
body {
	margin: 0;
}

</style>
<div class='svg-container'>
<!--Our target svg inside of which we will build the graph -->
<svg>
<g class="axis x-axis">
</g>
<g class="axis y-axis" >
</g>
</svg>
</div>
<!--Loading d3-->
<script src="https://d3js.org/d3.v5.min.js"></script>
<script>
const getHappinessData = () => {
	return fetch('/assets/data/share-of-people-who-say-they-are-happy.json').then(res => res.json())
}
getHappinessData().then( rawData => {
	const graphWidth = window.innerWidth
	const graphHeight = 400
	const filteredData = rawData.data.filter(data=> data.id.match(/Russia|Brazil/))
	rawData.data = filteredData
	const lineColors = ['#DC136C',
	'#FDD483',
	'#8ED1B7',
	'#E7A8C6',
	'#606EFE',
	'#ED6550',
	'#DDD5D0',
	'#818AA3']
	const chartStyle = {
		margin : {top: 10, right: 30, bottom: 30, left: 60},
 		padding : { top: 20, right: 0, bottom: 20, left: 25 },
		lineColors
	}
	buildLineGraph(rawData, graphWidth, graphHeight, chartStyle)
})

const buildLineGraph = (rawData, graphWidth, graphHeight, chartStyle) => {
	const lineColors = chartStyle.lineColors || [red, blue, purple]
	const margin = chartStyle.margin || {top:0, right: 0, bottom: 0, left: 0}
	const padding = chartStyle.padding || {top:0, right: 0, bottom: 0, left: 0}

	const properties = rawData.properties
	const entries = rawData.data

	const {xExtent, yExtent} = getExtents(entries)
	console.log(getExtents(entries))
	// xExtent === {min: "1984", max: "2014"}
	// yExtend === {min: "29.678267", max: "98.113213"}
	
	const xScale = d3.scaleLinear()
								.domain([xExtent.min,  xExtent.max])
								.range([padding.left, graphWidth])
	const yScale = d3.scaleLinear()
							.domain([yExtent.min,  yExtent.max])
							.range([ graphHeight - padding.bottom, padding.top ])

	// This is the function which we will use to draw our lines
	const drawLine = d3.line()
			.x( d => { return xScale(Number(d[0])) })
			.y( d => { return yScale(Number(d[1])) })

	const numberOfLines = entries.length
  // Grabbing our svg element to add out line paths to
	const svg = document.getElementsByTagName('svg')[0]
 
	// We are looping through each line
	// remember in our data set each entry is a country
	for(let i=0; i < numberOfLines; i++) {
		const entry = entries[i]
		const g = document.createElement('g')
		// createElementNS is a weird requirement to create an svg path dynamically
		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
		const lineColor = lineColors[i % lineColors.length]
		path.setAttribute('stroke',lineColor)

		// The d attribute is key, that's were we tell our path what shape it should take
		path.setAttribute('d', drawLine(entry.data))
		path.setAttribute('class', 'line')
		svg.setAttribute('height', graphHeight)
		svg.setAttribute('width', graphWidth)

		svg.appendChild(path)
	}
	// New Stuff
	const buildXAxis = (xData) => {
		const xAxis = document.getElementsByClassName('x-axis')[0]
		xScale.ticks().forEach(tickValue=> {
			const tickEl =  document.createElementNS('http://www.w3.org/2000/svg', 'g')
			const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')

			text.innerHTML = tickValue
			text.setAttribute('x', '0')
			text.setAttribute('y', '-4')

			const translate = `translate(${xScale(tickValue)},${graphHeight})`
			tickEl.setAttribute('class', 'tick')
			tickEl.setAttribute('transform', translate)
			tickEl.appendChild(text)
			xAxis.appendChild(tickEl)
		})
	}

	buildYAxis = () => {
		const yAxis = document.getElementsByClassName('y-axis')[0]
		const yAxisTranslate = `translate(0, ${padding.top})`
		yAxis.setAttribute('transform',yAxisTranslate)
		yScale.ticks().forEach( tickValue => {
			const tickEl =  document.createElementNS('http://www.w3.org/2000/svg', 'g')
			const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')

			text.innerHTML = tickValue
			text.setAttribute('x', '0')
			text.setAttribute('y', '-4')

			const translate = `translate(0, ${yScale(tickValue) - padding.bottom})`
			tickEl.setAttribute('class', 'tick')
			tickEl.setAttribute('transform', translate)
			tickEl.appendChild(text)
			yAxis.appendChild(tickEl)
		})
	}
	buildXAxis()
	buildYAxis()
}



// A little helper function to get min and max value for the x and y of our dataset
const getExtents = (data) => {
	let yExtent  = {max:0, min:null}
	let xExtent = {max:0, min:null}
	data.forEach((line)=> {
		line.data.forEach(entry=>{
		const [x, y] = entry
		if(x > xExtent.max) 
			xExtent.max = x
		if(x < xExtent.min || !xExtent.min ) 
			xExtent.min = x
		if(y > yExtent.max) 
			yExtent.max = y
		if(y < yExtent.min || !yExtent.min ) 
			yExtent.min = y

		})
	})
	return {xExtent, yExtent}
}

</script>


