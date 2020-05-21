---
	layout: example
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
	stroke: orange;
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
	buildLineGraph(rawData, graphWidth, graphHeight)
} )

const buildLineGraph = (rawData, graphWidth, graphHeight) => {

	const properties = rawData.properties
	const entries = rawData.data

	const {xExtent, yExtent} = getExtents(entries)
	// xExtent === {min: "1984", max: "2014"}
	// yExtend === {min: "29.678267", max: "98.113213"}
	
	const xScale = d3.scaleLinear()
								.domain([xExtent.min,  xExtent.max])
								.range([0, graphWidth])
							

	const yScale = d3.scaleLinear()
							.domain([yExtent.min,  yExtent.max])
							// Notice that the range is reversed here
							.range([ graphHeight, 0 ])

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

		// The d attribute is key, that's were we tell our path what shape it should take
		path.setAttribute('d', drawLine(entry.data))
		path.setAttribute('class', 'line')
		svg.setAttribute('height', graphHeight)
		svg.setAttribute('width', graphWidth)
		svg.appendChild(path)
	}

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


