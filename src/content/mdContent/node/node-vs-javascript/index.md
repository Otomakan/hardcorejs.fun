---
	template: blog-page
	title: Node vs Javascript
	meta_description: What is the difference between Node and Javascript?
	author: Jack Misteli
	subtitle: What is the difference between Node and Javascript?
	categories:
---
 
<p class='prelude'>When you're first dipping your feet in the web development pool, you might be confused by Node and Javascript. These days, you often see the two words written interchangeably. </p>

<h1>Quick overview of Javascript</h1>
<p>We might dedicate a full article to Javascript and its history later. For now, all we need to know is that Javascript is a language for <a href="/web-development/what-is-a-browser/index.html"> browsers</a>. It is used inside of Firefox, Chrome, Internet Explorer, Opera, Safari... Javascript was created so we could directly interact with the HTML content. The problem with HTML and CSS is that it doesn't move. You can't store variables, make calculations, create new strings, or even make API calls with just HTML. </p>

<p>Javascript allows us to make all these dynamic changes inside of our users' computer. For example, if I want to create a calculator that works only in the user's browser. </p>

<p class='module-name'>calculator.html</p>
<pre><code>
<h2>Addition</h2>
<input type='text' id='number-a'/>
<input type='text' id='number-b'/>
<div id='calculate-button'> Calculate</div>

<h2>Result</h2>
<div id='result'></div>
<!-- This script contains the javascript-->
<script>
document.getElementById('calculate-button').onclick = function () {
	// valA stores the value in the first input box
	// valB stores the value in the second input box
	var valA = document.getElementById('number-a').value
	var valB = document.getElementById('number-b').value
	document.getElementById('result').innerHTML = Number(valA) + Number(valB)
}
</script>
</code></pre>

<iframe class='example-container' src="./calculator.html" style="height: 250px"></iframe>

<p>If we put numbers inside of the two boxes we should get the sum of the two numbers under "Calculate". With Javascript, we are directly manipulating the HTML to display dynamic value. We are are not submitting a form or accessing a new page. We cannot do that with pure HTML.</p>

<h1>Then what is Node?</h1>

<p>Node looks like our previous Javascript but it is not used inside of a browser. We can install Node directly on our computers, our servers ( Where Javascript only exits in browsers, Node can exist anywhere. We call it a cross-platform language because it can run on different operating systems (Windows, Linux, Mac...) You can write almost any computer program in Node.</p>

<p>Node was a big innovation because it allowed us to write our backends and frontends using the same grammar. If you write some code in Node, copy paste it into your browser it should work. That's because Node is Javascript, it runs simply runs in a different runtime environment. </p> 

<p class='tip'>If it helps you can think of Node as a version of Javascript with different APIs. With node you can consume packages with <code>require('package-name')</code>. And Browser Javascript can access the window object.</p>

<p>Even if Node's language is Javascript, I prefer referring to Node as a separate language (even if I know it's not true). If you google 'How to read a file in Javascript', you'll find result on StackOverflow such as this https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file</p>

<pre>
<code>
//answered Jan 21 '13 at 20:20 by Majid Laissi
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}
</code>
</pre>
<p>This is not how you read in a file in Node! Of course in browser Javascript you can't access local files (otherwise you could sneakily steal the private information of the people going on your site). </p>

<img class='my-art' src='/assets/images/my-art/world_where_browsers_can_read_files.jpg'/>

<h1> IMage of how to steal</h1>

<p>To read a file in Node JS you can simply do: </p>

<pre><code>
const fs = require('fs')
const fileContent  = fs.readFileSync(filename)
//or 
fs.readFile(filename, (err, fileContent) => {
	// do something with fileContent
})
//or 

const fsPromise = require('fs').promises
const readFile = async (fileName) => {
	const fileContent = await fsPromise.readFile(fileName)
}
</code></pre>

<h1>What are some difference between Node and Javascript</h1>

<p>Node and Javascript have different purposes. Node usually doesn't run in a browser, so you don't have access to the window object. For example, you can't store values in the local storage. You also can't manipulate the DOM because there is no DOM to manipulate. That being said you can use libraries like <a href="https://github.com/jsdom/jsdom">jsdom</a> to convert strings into  a DOM representation.</p>

<p>On the other hand there, is not much you can do to get Node specific functionalities into your browser. The main Node.js feature we want to keep out of browsers is I/O. We don't want people to be able to read or write a user's document on her computer.</p> 

<p class='information'>Something super handy with <a href="node/node-packages/index.html">Node is that you can use packages</a>. It is especially easy to consume third party packages with npm packages. Nowadays, in some browsers we can use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules">Javascript modules which behave similarly</a> (but the browser support is still pretty weak). </p>

<p class='parting-thoughts'></p>
<requirements>
History of Javascript
What is Javascript
History of Node
What is node
What is the DOM
Javascript modules
browser support
</requirements>

