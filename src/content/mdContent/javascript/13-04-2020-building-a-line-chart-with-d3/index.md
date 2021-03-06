---
	template: blog-page
	title: Building a Line Chart with D3
	meta_description: undefined
	author: Jack Misteli
	subtitle: undefined
	categories:
---


<p class='prelude'>This article is a bit long if you want to go straight to the code it <a href="https://github.com/Otomakan/hardcorejs.fun/tree/master/docs/javascript/13-04-2020-building-a-line-chart-with-d3">is available in this Github Repository</a></p>

<p>If you are using the D3 API for the first time, you are probably a little bit intimidating. A line chart is great project to get your feet in the water 😃 💧. Before we get started make sure you read <a href="/javascript/setting-up-d3">our article about setting up d3 in your project</a>.
</p>


<h1>Choosing our data</h1>
<p><a href="#writing-lines"> I already know how data works: Skip ↓</a><p>
<p>Choosing the right data set is important. We have to make sure that we'll have something that plots well with no crazy edge cases. </p>

<p>I wanted to choose something a bit uplifting in these hard times so I chose some of the happiness data available at <a href="https://ourworldindata.org/happiness-and-life-satisfaction#all-charts-preview" target="_blank">Our World in Data</a>.
 </p>

<p>
Usually when you find data it will be <a href="/programming/what-is-csv.html"> in a CSV format</a>. Here our data looks like this:

<pre>
Entity,Code,Year, (%)
Albania,ALB,1998,33.433434
Albania,ALB,2004,58.799999
Algeria,DZA,2004,80.733231
Algeria,DZA,2014,79.89418
Andorra,AND,2009,92.878632
Argentina,ARG,1984,78.571426
...
</pre>

<p>You can find <a href='/assets/data/share-of-people-who-say-they-are-happy.csv'>the full data set here</a></p>, and then load it into google a google spreadsheet.

<h1>Setting up our data</h1>

<p>
We have four columns with country names and codes, years, and percentages. The first thing I want to do is think about what data format I want to play with. All I'm interested in is the year, country name and happiness percentage.</p>

<p> I want to use that data in Javascript so we have to think in terms of Javascript friendly format. To do so, I want to turn the CSV data into a JSON Object.</p> 

<p>There is a multitude of services you can use</p>

<p>An array of objects very similar to the csv format.</p>
<pre>
<code class="javascript">
const data = [
	{country: 'Albania', year:'1998', happinessPercentage:33.433434},
	...
]
</code>
</pre>

<div class='pros-cons'>
	<ul class='pros'>
		<li>Not a lot of work needed to convert the data.</li>
		<li>An array if you are using arrays your chart component doesn't need to know much about your data's context.</li>
	</ul>
	<ul class='cons'>
	<li>We are using objects in the array, so the chart will need to know some context about the data it is consuming.</li>
	<li>The data is not easy to read, we can't access specific data points easily. For example, if I want to know about what the happiness score was in the United States in 1992 I have to build a specific function to do so.</li>
	</ul>
</div>
<p>An object with country names as keys.</p>
<pre>
<code class='code-rotate'>
const data = {
	Albania: [{
		year:'1998', 
		happinessPercentage:33.433434},
		{
			year: '2004'
			happinessPercentage: 58.799999
		}
		// More years
		]
	Argentina: [
		//...
	]
	//...
}
</code>
</pre>
<div class='pros-cons'>
<ul class='pros'>
	<li>The data is relatively easy to access.</li>
	<li>Each data keys is equivalent to on line</li>
</ul>
<ul>
	<li>Same problem as above with the keys in the array of entries. The chart needs to know about the `.year` and `.happinessPercentage` to draw the chart. We also need a way to tell the chart that each key is a country name. But we will see that there are some ways around it.</li>
</ul>
</div>
<p>A very explicit object.</p>
<pre>
<code>
const data = {
	'1998': ['Albania', 33.433434],
		{
			country: 'France'
			happinessPercentage: 86.799999
		}
		// ...More countries
	]
	'1999': [
		//...
	]
	//...More years
}
</code>
</pre>
<div class='pros-cons'>
<ul class='pros'>
<li>Same as above</li>
</ul>
<ul class='cons'>
<li>Similar to above. We need to somehow pass even more context to the chart because now we don't have a way to tell that the keys are years, first element of the array is a country and second a percentage.</li>
</ul>
<ul>Not as readable as the country names as keys in my opinion, this would work better if we were interested in building a map</ul>

<p>
	You can also imagine a multitude of combination of all these approaches. Here we will choose to go with this:
</p>
<pre>
<code>
const data = {
	properties: {
		lineLabel: 'Country',
		xAxisLabel: 'Year',
		yAxisLabel: 'Happiness Percentage'
	},
	data: [
		{
			id: 'Albania',
			data: [
				['1998', '86.799999'],
				['2004','58.799999']
			]
		},
		{
			id: 'Algeria',
			data: //...
		}]
	]
}
</code>
</pre>

<p>
This might seem a bit impractical at first. But the
</p>

<h2>Converting our data to JSON. </h2>
<p>
There are a lot of tools you can use to transform csv to json. If you want to stick to Node/Javascript you can use the npm package <mark>csvtojson</mark>. Here is the script I used:
</p>

<pre><code>
const path = require('path')
const fs = require('fs')
const csv=require('csvtojson')
csv().fromFile(path.resolve(__dirname, './share-of-people-who-say-they-are-happy.csv'))
.then(jsonObj => {
		// console.log(jsonObj);
		// jsonObj is an array of objects which looks like this:
		// { Entity: 'Hungary', Code: 'HUN', Year: '1984', '(%)': '78.451881' },
		const finalArray = []
		jsonObj.forEach(entry=>{
			finalArray.push([entry.Entity, entry.Year, entry['(%)']])
		})
		fs.writeFileSync(
			path.resolve(__dirname, './share-of-people-who-say-they-are-happy.json'), 
			JSON.stringify(finalArray)
		)
})
</code></pre>

<h1 >Calling our data </h1>


Alright so now we can access our data by running:
<pre><code>
const getHappinessData = () => {
	return fetch('/assets/data/share-of-people-who-say-they-are-happy.json').then(res => res.text())
}

</code></pre>

<p>You can run in your developer console: <code>getHappinessData().then(data=> console.log(data) )</code> to see the data.
</p>


<h1 ><a id='writing-lines'></a>Writing the lines </h1>



Finally some code ! The only thing you need to know is that I don't use all the d3 builtin functions here. We only use d3 functions to draw our lines paths and map our values. 

Finally some code ! The only thing you need to know is that I don't use all the d3 builtin functions here. We only use d3 functions to draw our lines paths and map our values. 

<pre><code>
const years = [1999, 2000, 2002, 2003]
const graphWidth = 100
xScale = d3.scaleLinear()
								.domain([1999, 2003])
								.range([0, graphWidth])
// xScale(2000) === 25
// xScale(2003) === 100
const scaledYearsValues = years.map(year => xScale(year) )
// Now we can use these values in our graph! 
// scaledYearsValues === [0, 25, 75, 100]
</code></pre>


<pre><code>

<div class='svg-container'>
<!--Our target svg inside of which we will build the graph-->
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

</code></pre>

<p>And this gives us.... This!</p>
<iframe class='example-container' src="./example-one.html" style='height: 500px'></iframe>

<p>Ok this is super ugly, I just wanted to show the most basic line chart you can make without any noise. Let's change <mark>buildData</mark>'s input a bit.</p>

<pre><code>
	// we are only going to look at Russia and Brazil for now
	const filteredData = rawData.data.filter(data=> data.id.match(/Russia|Brazil/))
	rawData.data = filteredData
	buildLineGraph(rawData, graphWidth, graphHeight)
</code></pre>



<iframe class='example-container' style='height: 500px' src="./example-two.html"></iframe>

<h1>Bringing context to our D3 Chart</h1>

<h2>Coloring D3 Lines</h2>

<p>In the previous line is Brazil and one is Russia to add some differenciation we can add some color:</p>

<pre><code>
//... skipping
const filteredData = rawData.data.filter(data=> data.id.match(/Russia|Brazil/))
rawData.data = filteredData
buildLineGraph(rawData, graphWidth, graphHeight)
//...
const buildLineGraph = (rawData, graphWidth, graphHeight, lineColors) => {
...
	for(let i=0; i < numberOfLines; i++) {
		...
		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
		const lineColor = lineColors[i % lineColors.length]
		path.setAttribute('stroke', lineColor)
		...
	}
...

</code></pre>

<iframe class='example-container' style='height: 500px' src="./example-three.html"></iframe>

<p>Super easy! You can imagine different ways to introduce custom line styles to your lines.</p>

<h2>Building axis</h2>

<p>In d3, everything is an svg element. To me it feels a bit somehow <code>wrong|uncomfortable|countreintuitive</code> to use svg for text. But it's just because I'm not used to it. 
</p>
<p>d3 gives us really hand tools to build our axis. We are going to use our <code>xScale</code> and <code>yScale</code> objects. They have a <code>.tick</code> property which generates a regular array of ticks.</p>

<p> For the chart to look good we add a little bit of padding</p>

<pre><code>
// Skip	...
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
	// ... Skipy skip

	// Adjusting our scales to include the paddings
	const xScale = d3.scaleLinear()
								.domain([xExtent.min,  xExtent.max])
								.range([padding.left, graphWidth])
	const yScale = d3.scaleLinear()
							.domain([yExtent.min,  yExtent.max])
							.range([ graphHeight - padding.bottom, padding.top ])
</code></pre>

<p> Now to drawing our ticks</p>
<pre><code>
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
		yScale.ticks().forEach(tickValue=> {
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
</code></pre>

<iframe class='example-container' style='height: 500px' src="./example-four.html"></iframe>

<p class='parting-thoughts'>📯 Wow this has been a journey. I still have a few more things I want to explore but we'll write another article about that another day.</p>


