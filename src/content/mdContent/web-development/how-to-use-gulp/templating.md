---
	template: example
	title: Templating
	meta_description: 
	author: Jack Misteli
	subtitle: 
	categories:
---

<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>
<script >
function highlight_code()
{
		if (typeof (Worker) === undefined)
				return false

		// var workerFunction = new Blob(['(' + highlight_worker_function.toString() + ')()'], {type: "text/javascript"});

		const codes = document.querySelectorAll('code')
		for (let i= 0; i < codes.length; i++) {
			const code = codes[i]
			var worker = new Worker('/js/workers/hljs.js')
				worker.onmessage = function () {
						code.innerHTML = (event.data)
						code.classList.add('hljs')
				}
				worker.postMessage(code.innerHTML); // start worker
		}
}
function connectElements(svg, path, startElem, endElem) {
    var svgContainer= $("#svg-container");

    // if first element is lower than the second, swap!
    if(startElem.offset().top > endElem.offset().top){
        var temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container   
    var svgTop  = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    // get (top, left) coordinates for the two elements
    var startCoord = startElem.offset();
    var endCoord   = endElem.offset();

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + 0.5*startElem.outerWidth() - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top  + startElem.outerHeight() - svgTop;        // y = top offset + height - svg's top offset

        // calculate path's end (x,y) coords
    var endX = endCoord.left + 0.5*endElem.outerWidth() - svgLeft;
    var endY = endCoord.top  - svgTop;

    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);

}
//helper functions, it turned out chrome doesn't support Math.sgn() 
function signum(x) {
    return (x < 0) ? -1 : 1;
}
function absolute(x) {
    return (x < 0) ? -x : x;
}

function drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke =  parseFloat(path.attr("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") <  endY)                 svg.attr("height", endY);
    if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke));
    if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke));
    
    var deltaX = (endX - startX) * 0.15;
    var deltaY = (endY - startY) * 0.15;
    // for further calculations which ever is the shortest distance
    var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0; var arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
    path.attr("d",  "M"  + startX + " " + startY +
                    " V" + (startY + delta) +
                    " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*signum(deltaX)) + " " + (startY + 2*delta) +
                    " H" + (endX - delta*signum(deltaX)) + 
                    " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
                    " V" + endY );
}

function connectElements(svg, path, startElem, endElem) {
    var svgContainer= $("#svg-container");

    // if first element is lower than the second, swap!
    if(startElem.offset().top > endElem.offset().top){
        var temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container   
    var svgTop  = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    // get (top, left) coordinates for the two elements
    var startCoord = startElem.offset();
    var endCoord   = endElem.offset();

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + 0.5*startElem.outerWidth() - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top  + startElem.outerHeight() - svgTop;        // y = top offset + height - svg's top offset

        // calculate path's end (x,y) coords
    var endX = endCoord.left + 0.5*endElem.outerWidth() - svgLeft;
    var endY = endCoord.top  - svgTop;
		console.log("END Y is ", endY)
		console.log({'endcooord': endCoord ,svgTop})
    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);

}
function connectAll() {
    connectElements($("#svg1"), $("#path1"), $("#t-1"),   $("#t-4"));
    connectElements($("#svg1"), $("#path2"), $("#t-2"),   $("#t-3"));
    connectElements($("#svg1"), $("#path2"), $("#t-2"),   $("#gulp-container"));

}

window.addEventListener('load', () => {
	highlight_code()

})
$(document).ready(function() {
    // reset svg each time 
    $("#svg1").attr("height", "0");
    $("#svg1").attr("width", "0");
    connectAll();
});
</script>
<link rel="stylesheet" type="text/css" href="/index.css">

<div id='svg-container'>
	<svg id="svg1" width="0" height="0" >
			<path
					id="path1"
					d="M0 0"         
					stroke="#000" 
					fill="none" 
					stroke-width="12px";/>
				<path
					id="path2"
					d="M0 0"             
					stroke="#000" 
					fill="none" 
					stroke-width="12px";/>
				<path
					id="path3"
					d="M0 0"      
					stroke-width="8px"
					style="stroke:#000; fill:none;"/>
				<path
					id="path4"
					d="M0 0"    
					stroke-width="12px"         
					style="stroke:#000; fill:none;  stroke-width: 12px;" />
				<path
					id="path5"
					d="M0 0"    
					stroke-width="10px"         
					style="stroke:#000; fill:none;"/>
				<path
					id="path6"
					d="M0 0"    
					stroke-width="10px"         
					style="stroke:#000; fill:none;"/>
	</svg>
</div>
<div class='t-container'>
<div class='first-row'>
	<div id='t-1' class='template'>
		<h2>header.html</h2>
		<pre><code class='template-content'>
<header>
<!-- Header Content -->
</header>
		</code>
		</pre>
	</div>

<div id='t-2' class='template'>

		<h2>blog-template.html</h2>
		<pre><code class='template-content'>
<h1> {{title}} </h1>
<div id='blog-content'>
{{blog-content}}
</div>
		</code>
		</pre>
	</div>

	<div id='t-3' class='template'>
		<h2>great-blog-title.fa</h2>
		<pre><code class='template-content'>
title: {{ My Awesome Blog Post }}
content: {{ Today we are gonna talk about some awesome stuff ... }}
		</code>
		</pre>
	</div>

<div id='t-4' class='template'>
		<h2>footer.html</h2>
		<pre><code class='template-content'>
<footer>
<!–– footer content -->
</footer>
		</code>

		</pre>
	</div>
	
</div>

<div class='second-row'>
	<div id='gulp-container'> Hey</div>
</div>
</div>

<style>
.second-row {
	width: 100%;
	display: flex;
	justify-content: center;
}
.gulp-container {
	height: 100px;
	width: 100px;
	background: red;
	display:flex;
	justify-content: center;
}
.t-container {
	width: 100%;
}
.first-row {
	display: flex;
	width: 100%;
	justify-content: space-evenly;
}
.first-row > .template {
	width: 20%;
}

.first-row > .template > h2 {
	margin-bottom: 10px;
	font-size: 20px
}
.template-content {
	padding: 3px;
	border-radius: 20px;
	border: 2px solid black;
	background: white;
}
.template-content::-webkit-scrollbar {
	display: none;
}
body {
	padding: 0;
}
</style>

<style>

#svg-container { 
	z-index: -10;
	position:absolute;
	background-color:silver;
	opacity: 0.5;
}

div{ opacity: 0.6; }


#outer{
	margin:0 auto;
	width: 80%;
}

#teal{
 	width: 6em;
 	height: 6em;
 	background-color:teal;
 	margin-left: 10%;
}
#orange{
	height: 4em;
	width: 35%;
	padding: 2em 8em;
	margin-left: 8em;
	margin-top: 6em;
	background-color: orange; 
}

#red{
	width:6em;
	height: 4em;
	margin-left: 30%; 
	padding:4em 3em;
	background-color:red;
}
#aqua{
	width: 5em;
	height: 5em;
	margin-left:15%; 
	background-color:aqua;
}
#purple{
	width: 15em;
	height: 5em;
	background-color:purple;
}
#green{
	width: 5em;
	height: 7em;
	margin-top: 2em;
	margin-left: 50%;
	background-color: green;
}
</style>

