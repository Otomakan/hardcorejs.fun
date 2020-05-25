---
	template: example
	title: undefined
	meta_description: undefined
	author: undefined
	subtitle: undefined
	categories:
---


<pre>
	<code  id='code-container' >
<script type="text/template" src='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/highlight.min.js'></script>

<script type="text/template" class='language-javascript'>
	const options = {
		tabReplace: '  ', //tabs are equivalent to two spaces
	}

	hljs.configure(options)
	hljs.initHighlighting()
</script>

<!-- This part is just styling -->
<style class='language-css'>

.hljs {
	display: block;
	overflow-x: auto;
	padding: .5em;
	background: lemonchiffon;
	background: papayawhip;
	background: snow;
}

.hljs,
.hljs-subst {
	color: #444
}

.hljs-comment {
	color: #888888
}
.keyword {
	color:red;
}

.hljs-keyword,
.hljs-attribute,
.hljs-selector-tag,
.hljs-meta-keyword,
.hljs-doctag,
.hljs-name {
	font-weight: bold;
	color: red;

}

.hljs-type,
.hljs-string,
.hljs-number,
.hljs-selector-id,
.hljs-selector-class,
.hljs-quote,
.hljs-template-tag,
.hljs-deletion {
	color: green;
}

.hljs-title,
.hljs-section {
	color: red;
}

.hljs-regexp,
.hljs-symbol,
.hljs-variable,
.hljs-template-variable,
.hljs-link,
.hljs-selector-attr,
.hljs-selector-pseudo {
	color: orange;
}

.hljs-literal {
	color: green;
}

.hljs-built_in,
.hljs-bullet,
.hljs-code,
.hljs-addition {
	color: purple;
}

.hljs-meta {
	color: pink;
}

.hljs-meta-string {
	color: var(--yellow);
}

.hljs-emphasis {
	font-style: italic
}

.hljs-strong {
	font-weight: bold
}
body {
	margin: 0;
	padding:0;
}
pre {
	padding: 0;
	margin: 0;
}
code {
	position: absolute;
	top: 0;
}
</style>
</pre>
</code>
<script>

var codeContainer = document.getElementById('code-container')

var scripts = codeContainer.getElementsByTagName('script')
var css = codeContainer.getElementsByTagName('style')
scripts =  Array.prototype.slice.call(scripts)
css =  Array.prototype.slice.call(css)
const scriptsAndCss = css.concat(scripts)
console.log(scriptsAndCss)
const scriptFetchFunctions  = []

for (let i =0 ; i < scriptsAndCss.length; i ++ ) {

	scriptFetchFunctions.push (function(cb) {
		var code = ''
			var script = scriptsAndCss[i]
	console.log(script)
		if (script.src) {
			const req = new XMLHttpRequest()
			// when the request is a success we call the callback
			req.addEventListener("load", function() {
				const scriptContent = this.responseText
				const remoteScript = document.createElement('script')
				remoteScript.innerHTML = scriptContent
				document.body.appendChild(remoteScript)

				cb()
			})

			req.open("GET", script.src)
			req.send()
		} else {
				cb()
				const scriptContent = script.innerHTML
				
				const localScript = document.createElement(script.localName)
				console.log(scriptContent)
				localScript.innerHTML = scriptContent
				document.body.appendChild(localScript)
				//cloneNode(true)
				//console.log(scriptCopy)
				//scriptCopy.removeAttribute('type')
				document.body.appendChild(script)

		}
	
	})
}

	let content = codeContainer.innerHTML
	content = content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
	var parser = new DOMParser()
	var parsedContent = parser.parseFromString(content, 'text/html')
	codeContainer.innerHTML = ''
	codeContainer.appendChild(parsedContent.body)
promiseAllBlocking(scriptFetchFunctions,function() {

})

function promiseAllBlocking (arrayOfFunctions, callBack) {
	if (arrayOfFunctions.length === 0)
		return callBack()
	arrayOfFunctions[0](function(){
		promiseAllBlocking(arrayOfFunctions.slice(1, arrayOfFunctions.length), callBack)
	})
}
function promiseAll (arrayOfFunctions, callBack) {
	function PromiseCounter (l, cb) {
		this.l = l
		this.cb = cb
		// We need that in order to have properly scoped `this` when we get into our increaseOrReturn function
		var that = this
	
		this.increaseOrReturn = function(){
			that.l -= 1
			if (that.l == 0) {
				console.log('returning final cb')
				return that.cb()
			}
		}
	
	}
	console.log('in promise all')
	const counter = new PromiseCounter(arrayOfFunctions.length, callBack)
	for (let i = 0; i < arrayOfFunctions.length; i ++) {
		arrayOfFunctions[i](counter.increaseOrReturn)
	}
}


</script>
