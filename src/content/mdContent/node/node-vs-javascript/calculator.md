---
	layout: example
	title: undefined
	meta_description: undefined
	author: undefined
	subtitle: undefined
	categories:
---

<style> 
body {
	background: aliceblue;
	font-family: monospace;
}
#calculate-button {
	background: white;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;
    width: 100px;
    width: fit-content;
    margin: 10px;
}
#calculate-button:hover {
background: rgba(255,255,255, 0.5);
}
input {
	background: white;
	border-radius: 5px;
	padding: 10px;
	width: 100px;
	width: fit-content;
	margin: 10px;
	border: 0px;
}
input:hover {
	border: 1px solid orange;
}
</style>
<h2>Addition</h2>
<input type='text' id='number-a'/>
<input type='text' id='number-b'/>
<div id='calculate-button'> Calculate</div>

<h2>Result</h2>
<div id='result'></div>
<script>
document.getElementById('calculate-button').onclick = function () {
	var valA = document.getElementById('number-a').value
	var valB = document.getElementById('number-b').value
	document.getElementById('result').innerHTML = Number(valA) + Number(valB)
}
</script>

