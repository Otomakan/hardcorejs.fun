// onmessage = function(e) {
// 	console.log('Message received from main script')
// 	console.log(e.data)
//   var workerResult = 'Result: ' + (e.data[0] * e.data[1])
//   console.log('Posting message back to main script')
// 	postMessage(workerResult)
// }

onmessage = function (event) {
	importScripts('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/highlight.min.js')
	self.hljs.configure({tabReplace: 2})
	var result = self.hljs.highlightAuto(event.data)

	const highlightedCode = result.value.replace(/=&amp;gt;/g, "=>")
	
	postMessage(highlightedCode)
	close();
}