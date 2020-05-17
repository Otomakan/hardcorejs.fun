
// Usually you would read the content of templates from files
// This is just for clarity
const head = `<!DOCTYPE html>
<html>
<head>
	<title>{{name}}</title>
	<link rel='stylesheet' type='text/css' media='screen' href='/style.css'>
	<script src='/main.js'></script>
</head>`

const body  = `
	<body>
		<h1>This is the product page for {{name}} </h1>
		<div>This product will cost you {{price}} dollars </h1>
	</body>
`
const template =  head + body
module.exports =  () => template